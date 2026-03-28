<?php

namespace App\Services;

use App\Models\Payment;
use App\Services\AuditService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MpesaService
{
    private string $baseUrl;
    private string $consumerKey;
    private string $consumerSecret;
    private string $shortcode;
    private string $passkey;
    private string $callbackUrl;

    public function __construct()
    {
        $this->baseUrl = config('mpesa.base_url', 'https://sandbox.safaricom.co.ke');
        $this->consumerKey = config('mpesa.consumer_key', '');
        $this->consumerSecret = config('mpesa.consumer_secret', '');
        $this->shortcode = config('mpesa.shortcode', '');
        $this->passkey = config('mpesa.passkey', '');
        $this->callbackUrl = config('mpesa.callback_url', '');
    }

    /**
     * Demo/local mode: no HTTP to Safaricom — uses ENDODE_PAYMENTS_MODE=mock in .env.
     */
    public function isMockMode(): bool
    {
        return config('endode.payments.mode', 'mock') === 'mock';
    }

    /**
     * Apply escrow completion for mock STK (mirrors successful Daraja callback).
     */
    public function applyMockEscrow(Payment $payment): void
    {
        if (! $this->isMockMode()) {
            return;
        }

        $id = (string) ($payment->mpesa_transaction_id ?? '');
        if ($id === '' || ! str_starts_with($id, 'MOCK-')) {
            return;
        }

        $receipt = 'MOCK-'.strtoupper(Str::random(10));

        $payment->update([
            'status' => 'escrowed',
            'mpesa_receipt_number' => $receipt,
            'paid_at' => now(),
        ]);

        $payment->order->update(['status' => 'confirmed']);

        AuditService::log('payment_escrowed', $payment, [
            'simulated' => true,
            'product' => config('endode.product.title'),
        ]);
    }

    public function getAccessToken(): ?string
    {
        try {
            $response = Http::withBasicAuth($this->consumerKey, $this->consumerSecret)
                ->get("{$this->baseUrl}/oauth/v1/generate?grant_type=client_credentials");

            return $response->json('access_token');
        } catch (\Exception $e) {
            Log::error('M-Pesa token error: ' . $e->getMessage());
            return null;
        }
    }

    public function initiateStkPush(string $phone, float $amount, string $reference, string $description = 'Payment'): array
    {
        if ($this->isMockMode()) {
            return [
                'success' => true,
                'checkout_request_id' => 'MOCK-'.Str::uuid()->toString(),
                'merchant_request_id' => 'MOCK-MR-'.strtoupper(Str::random(12)),
            ];
        }

        $token = $this->getAccessToken();
        if (!$token) {
            return ['success' => false, 'message' => 'Failed to get access token'];
        }

        $timestamp = now()->format('YmdHis');
        $password = base64_encode($this->shortcode . $this->passkey . $timestamp);

        try {
            $response = Http::withToken($token)->post("{$this->baseUrl}/mpesa/stkpush/v1/processrequest", [
                'BusinessShortCode' => $this->shortcode,
                'Password' => $password,
                'Timestamp' => $timestamp,
                'TransactionType' => 'CustomerPayBillOnline',
                'Amount' => (int) $amount,
                'PartyA' => $phone,
                'PartyB' => $this->shortcode,
                'PhoneNumber' => $phone,
                'CallBackURL' => $this->callbackUrl,
                'AccountReference' => $reference,
                'TransactionDesc' => $description,
            ]);

            $data = $response->json();

            if (($data['ResponseCode'] ?? '') === '0') {
                return [
                    'success' => true,
                    'checkout_request_id' => $data['CheckoutRequestID'],
                    'merchant_request_id' => $data['MerchantRequestID'],
                ];
            }

            return ['success' => false, 'message' => $data['ResponseDescription'] ?? 'Unknown error'];
        } catch (\Exception $e) {
            Log::error('M-Pesa STK push error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'Network error'];
        }
    }

    public function checkTransactionStatus(string $checkoutRequestId): array
    {
        if ($this->isMockMode() && str_starts_with($checkoutRequestId, 'MOCK-')) {
            return [
                'ResultCode' => 0,
                'ResultDesc' => 'The service request is processed successfully.',
                'success' => true,
            ];
        }

        $token = $this->getAccessToken();
        if (!$token) {
            return ['success' => false, 'message' => 'Failed to get access token'];
        }

        $timestamp = now()->format('YmdHis');
        $password = base64_encode($this->shortcode . $this->passkey . $timestamp);

        try {
            $response = Http::withToken($token)->post("{$this->baseUrl}/mpesa/stkpushquery/v1/query", [
                'BusinessShortCode' => $this->shortcode,
                'Password' => $password,
                'Timestamp' => $timestamp,
                'CheckoutRequestID' => $checkoutRequestId,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('M-Pesa query error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'Network error'];
        }
    }
}

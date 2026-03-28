<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

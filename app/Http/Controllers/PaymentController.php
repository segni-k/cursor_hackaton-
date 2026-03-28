<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Services\AuditService;
use App\Services\MpesaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(private MpesaService $mpesaService) {}

    public function index(Request $request)
    {
        $payments = Payment::where('user_id', $request->user()->id)
            ->with('order:id,pharmacy_id,status,total_amount')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Patient/Payments/Index', ['payments' => $payments]);
    }

    public function initiate(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'phone' => 'required|string',
        ]);

        $order = Order::where('patient_id', $request->user()->id)->findOrFail($validated['order_id']);

        $result = $this->mpesaService->initiateStkPush(
            $validated['phone'],
            (float) $order->total_amount,
            'ORDER-' . $order->id,
            'Payment for order #' . $order->id,
        );

        if ($result['success']) {
            Payment::create([
                'order_id' => $order->id,
                'user_id' => $request->user()->id,
                'amount' => $order->total_amount,
                'mpesa_transaction_id' => $result['checkout_request_id'],
                'status' => 'pending',
            ]);

            AuditService::log('payment_initiated', $order, ['amount' => $order->total_amount]);

            return back()->with('success', __('messages.payment_initiated'));
        }

        return back()->with('error', $result['message'] ?? __('messages.payment_failed'));
    }

    public function callback(Request $request)
    {
        $data = $request->json()->all();
        $callback = $data['Body']['stkCallback'] ?? [];

        $checkoutRequestId = $callback['CheckoutRequestID'] ?? null;
        if (!$checkoutRequestId) return response()->json(['status' => 'error']);

        $payment = Payment::where('mpesa_transaction_id', $checkoutRequestId)->first();
        if (!$payment) return response()->json(['status' => 'not_found']);

        if (($callback['ResultCode'] ?? -1) === 0) {
            $metadata = collect($callback['CallbackMetadata']['Item'] ?? [])
                ->pluck('Value', 'Name');

            $payment->update([
                'status' => 'escrowed',
                'mpesa_receipt_number' => $metadata->get('MpesaReceiptNumber'),
                'paid_at' => now(),
            ]);

            $payment->order->update(['status' => 'confirmed']);
            AuditService::log('payment_escrowed', $payment, ['receipt' => $metadata->get('MpesaReceiptNumber')]);
        } else {
            $payment->update(['status' => 'failed']);
            AuditService::log('payment_failed', $payment, ['result_code' => $callback['ResultCode']]);
        }

        return response()->json(['status' => 'ok']);
    }
}

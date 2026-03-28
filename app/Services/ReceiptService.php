<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Receipt;
use Illuminate\Support\Str;

class ReceiptService
{
    public function generateForOrder(Order $order): Receipt
    {
        $order->load(['patient:id,name,email', 'pharmacy:id,name,address,phone', 'items.medicine:id,name,price', 'payment']);

        $data = [
            'receipt_number' => 'RCP-' . strtoupper(Str::random(8)),
            'order_id' => $order->id,
            'date' => now()->toDateTimeString(),
            'patient' => [
                'name' => $order->patient->name,
                'email' => $order->patient->email,
            ],
            'pharmacy' => [
                'name' => $order->pharmacy->name,
                'address' => $order->pharmacy->address,
                'phone' => $order->pharmacy->phone,
            ],
            'items' => $order->items->map(fn($item) => [
                'medicine' => $item->medicine->name,
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'subtotal' => $item->subtotal,
            ])->toArray(),
            'total' => $order->total_amount,
            'payment' => [
                'method' => 'M-Pesa',
                'transaction_id' => $order->payment?->mpesa_transaction_id,
                'status' => $order->payment?->status,
            ],
        ];

        return Receipt::create([
            'order_id' => $order->id,
            'receipt_number' => $data['receipt_number'],
            'data' => $data,
        ]);
    }
}

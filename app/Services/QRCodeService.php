<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Str;

class QRCodeService
{
    public function generateForOrder(Order $order): string
    {
        if (!$order->qr_code) {
            $order->update(['qr_code' => Str::uuid()->toString()]);
        }

        return $order->qr_code;
    }

    public function verify(string $qrCode): ?Order
    {
        return Order::where('qr_code', $qrCode)
            ->whereNull('qr_verified_at')
            ->whereIn('status', ['confirmed', 'ready'])
            ->with(['patient:id,name,email', 'pharmacy', 'items.medicine', 'payment'])
            ->first();
    }

    public function markVerified(Order $order): Order
    {
        $order->update([
            'qr_verified_at' => now(),
            'status' => 'completed',
        ]);

        AuditService::log('qr_verified', $order);

        return $order;
    }
}

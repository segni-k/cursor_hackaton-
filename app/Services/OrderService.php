<?php

namespace App\Services;

use App\Models\Medicine;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderService
{
    public function createOrder(int $patientId, int $pharmacyId, array $items, ?string $notes = null, ?int $prescriptionId = null): Order
    {
        return DB::transaction(function () use ($patientId, $pharmacyId, $items, $notes, $prescriptionId) {
            $totalAmount = 0;
            $orderItems = [];

            foreach ($items as $item) {
                $medicine = Medicine::where('id', $item['medicine_id'])
                    ->where('pharmacy_id', $pharmacyId)
                    ->where('is_active', true)
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($medicine->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for {$medicine->name}");
                }

                $subtotal = $medicine->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'medicine_id' => $medicine->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $medicine->price,
                    'subtotal' => $subtotal,
                ];

                $medicine->decrement('stock_quantity', $item['quantity']);
            }

            $order = Order::create([
                'patient_id' => $patientId,
                'pharmacy_id' => $pharmacyId,
                'prescription_id' => $prescriptionId,
                'status' => 'pending',
                'total_amount' => $totalAmount,
                'qr_code' => Str::uuid()->toString(),
                'notes' => $notes,
            ]);

            foreach ($orderItems as $itemData) {
                $order->items()->create($itemData);
            }

            AuditService::log('order_created', $order, ['total' => $totalAmount]);

            return $order->load('items.medicine', 'pharmacy');
        });
    }

    public function updateStatus(Order $order, string $status): Order
    {
        $validTransitions = [
            'pending' => ['confirmed', 'cancelled'],
            'confirmed' => ['ready', 'cancelled'],
            'ready' => ['completed'],
        ];

        $allowed = $validTransitions[$order->status] ?? [];
        if (!in_array($status, $allowed)) {
            throw new \Exception("Cannot transition from {$order->status} to {$status}");
        }

        if ($status === 'cancelled') {
            DB::transaction(function () use ($order) {
                foreach ($order->items as $item) {
                    $item->medicine->increment('stock_quantity', $item->quantity);
                }
            });
        }

        $order->update(['status' => $status]);
        AuditService::log('order_status_changed', $order, ['new_status' => $status]);

        return $order->fresh();
    }
}

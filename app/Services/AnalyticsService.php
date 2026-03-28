<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Pharmacy;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function getPharmacyStats(Pharmacy $pharmacy): array
    {
        $cacheKey = "pharmacy:{$pharmacy->id}:analytics";

        return Cache::remember($cacheKey, 600, function () use ($pharmacy) {
            $orders = Order::where('pharmacy_id', $pharmacy->id);
            $completedOrders = (clone $orders)->where('status', 'completed');

            return [
                'total_orders' => $orders->count(),
                'completed_orders' => $completedOrders->count(),
                'total_revenue' => $completedOrders->sum('total_amount'),
                'pending_orders' => (clone $orders)->where('status', 'pending')->count(),
                'fulfillment_rate' => $orders->count() > 0
                    ? round(($completedOrders->count() / $orders->count()) * 100, 1)
                    : 0,
                'top_medicines' => DB::table('order_items')
                    ->join('orders', 'orders.id', '=', 'order_items.order_id')
                    ->join('medicines', 'medicines.id', '=', 'order_items.medicine_id')
                    ->where('orders.pharmacy_id', $pharmacy->id)
                    ->where('orders.status', 'completed')
                    ->select('medicines.name', DB::raw('SUM(order_items.quantity) as total_sold'), DB::raw('SUM(order_items.subtotal) as total_revenue'))
                    ->groupBy('medicines.id', 'medicines.name')
                    ->orderByDesc('total_sold')
                    ->limit(10)
                    ->get()
                    ->toArray(),
                'monthly_revenue' => DB::table('orders')
                    ->where('pharmacy_id', $pharmacy->id)
                    ->where('status', 'completed')
                    ->where('created_at', '>=', now()->subMonths(6))
                    ->select(DB::raw("strftime('%Y-%m', created_at) as month"), DB::raw('SUM(total_amount) as revenue'), DB::raw('COUNT(*) as orders'))
                    ->groupBy('month')
                    ->orderBy('month')
                    ->get()
                    ->toArray(),
            ];
        });
    }

    public function getPatientStats(int $userId): array
    {
        $cacheKey = "patient:{$userId}:analytics";

        return Cache::remember($cacheKey, 600, function () use ($userId) {
            $orders = Order::where('patient_id', $userId);

            return [
                'total_orders' => $orders->count(),
                'total_spent' => (clone $orders)->where('status', 'completed')->sum('total_amount'),
                'active_orders' => (clone $orders)->whereIn('status', ['pending', 'confirmed', 'ready'])->count(),
                'recent_orders' => (clone $orders)->with(['pharmacy:id,name', 'items'])
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->toArray(),
            ];
        });
    }
}

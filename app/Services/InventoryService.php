<?php

namespace App\Services;

use App\Models\Medicine;
use App\Models\Pharmacy;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class InventoryService
{
    public function listForPharmacy(Pharmacy $pharmacy, array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $pharmacy->medicines()
            ->with('category:id,name,name_am');

        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['stock_status'])) {
            match ($filters['stock_status']) {
                'low' => $query->whereColumn('stock_quantity', '<=', 'low_stock_threshold')->where('stock_quantity', '>', 0),
                'out' => $query->where('stock_quantity', 0),
                'in' => $query->where('stock_quantity', '>', 0),
                default => null,
            };
        }

        return $query->orderBy('name')->paginate($perPage)->withQueryString();
    }

    public function getStats(Pharmacy $pharmacy): array
    {
        $cacheKey = "pharmacy:{$pharmacy->id}:inventory_stats";

        return Cache::remember($cacheKey, 300, function () use ($pharmacy) {
            $medicines = $pharmacy->medicines();

            return [
                'total' => $medicines->count(),
                'in_stock' => (clone $medicines)->where('stock_quantity', '>', 0)->count(),
                'low_stock' => (clone $medicines)->whereColumn('stock_quantity', '<=', 'low_stock_threshold')->where('stock_quantity', '>', 0)->count(),
                'out_of_stock' => (clone $medicines)->where('stock_quantity', 0)->count(),
            ];
        });
    }
}

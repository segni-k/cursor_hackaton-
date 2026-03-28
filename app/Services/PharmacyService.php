<?php

namespace App\Services;

use App\Models\Pharmacy;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class PharmacyService
{
    public function list(array $filters = [], int $perPage = 12): LengthAwarePaginator
    {
        $cacheKey = 'pharmacies:list:' . md5(json_encode($filters) . $perPage . request('page', 1));

        return Cache::remember($cacheKey, 300, function () use ($filters, $perPage) {
            $query = Pharmacy::query()
                ->active()
                ->withCount(['medicines' => fn($q) => $q->where('is_active', true)->where('stock_quantity', '>', 0)]);

            if (!empty($filters['search'])) {
                $query->where(function ($q) use ($filters) {
                    $q->where('name', 'LIKE', "%{$filters['search']}%")
                      ->orWhere('name_am', 'LIKE', "%{$filters['search']}%")
                      ->orWhere('address', 'LIKE', "%{$filters['search']}%");
                });
            }

            return $query->orderBy('name')->paginate($perPage)->withQueryString();
        });
    }

    public function getWithMedicines(Pharmacy $pharmacy, int $perPage = 15): array
    {
        $medicines = $pharmacy->medicines()
            ->where('is_active', true)
            ->with('category:id,name,name_am')
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        return [
            'pharmacy' => $pharmacy,
            'medicines' => $medicines,
        ];
    }
}

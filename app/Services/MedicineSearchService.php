<?php

namespace App\Services;

use App\Models\Medicine;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class MedicineSearchService
{
    public function search(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $cacheKey = 'medicines:search:' . md5(json_encode($filters) . $perPage . request('page', 1));

        return Cache::remember($cacheKey, 300, function () use ($filters, $perPage) {
            $query = Medicine::query()
                ->with(['pharmacy:id,name,name_am,address', 'category:id,name,name_am'])
                ->where('is_active', true);

            if (!empty($filters['search'])) {
                $query->search($filters['search']);
            }

            if (!empty($filters['category_id'])) {
                $query->where('category_id', $filters['category_id']);
            }

            if (!empty($filters['pharmacy_id'])) {
                $query->where('pharmacy_id', $filters['pharmacy_id']);
            }

            if (isset($filters['in_stock']) && $filters['in_stock']) {
                $query->where('stock_quantity', '>', 0);
            }

            if (!empty($filters['min_price'])) {
                $query->where('price', '>=', $filters['min_price']);
            }

            if (!empty($filters['max_price'])) {
                $query->where('price', '<=', $filters['max_price']);
            }

            if (isset($filters['requires_prescription'])) {
                $query->where('requires_prescription', $filters['requires_prescription']);
            }

            $sortField = $filters['sort'] ?? 'name';
            $sortDir = $filters['direction'] ?? 'asc';
            $allowedSorts = ['name', 'price', 'stock_quantity', 'created_at'];
            if (in_array($sortField, $allowedSorts)) {
                $query->orderBy($sortField, $sortDir);
            }

            return $query->paginate($perPage)->withQueryString();
        });
    }

    public function autocomplete(string $term, int $limit = 10): array
    {
        $cacheKey = 'medicines:autocomplete:' . md5($term);

        return Cache::remember($cacheKey, 300, function () use ($term, $limit) {
            return Medicine::query()
                ->where('is_active', true)
                ->where('stock_quantity', '>', 0)
                ->where(function ($q) use ($term) {
                    $q->where('name', 'LIKE', "%{$term}%")
                      ->orWhere('name_am', 'LIKE', "%{$term}%");
                })
                ->select('id', 'name', 'name_am', 'price', 'pharmacy_id')
                ->with('pharmacy:id,name')
                ->limit($limit)
                ->get()
                ->toArray();
        });
    }
}

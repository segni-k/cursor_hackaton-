<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\MedicineCategory;
use App\Services\MedicineSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicineController extends Controller
{
    public function __construct(private MedicineSearchService $searchService) {}

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'category_id', 'pharmacy_id', 'in_stock', 'min_price', 'max_price', 'requires_prescription', 'sort', 'direction']);

        return Inertia::render('User/Patient/Medicines/Index', [
            'medicines' => $this->searchService->search($filters),
            'categories' => MedicineCategory::select('id', 'name', 'name_am', 'slug')->get(),
            'filters' => $filters,
        ]);
    }

    public function show(int $id)
    {
        $medicine = \App\Models\Medicine::with(['pharmacy:id,name,name_am,address,phone', 'category:id,name,name_am'])
            ->where('is_active', true)
            ->findOrFail($id);

        return Inertia::render('User/Patient/Medicines/Show', [
            'medicine' => $medicine,
        ]);
    }

    public function autocomplete(Request $request)
    {
        $term = $request->get('q', '');
        if (strlen($term) < 2) return response()->json([]);
        return response()->json($this->searchService->autocomplete($term));
    }
}

<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use App\Models\MedicineCategory;
use App\Services\AuditService;
use App\Services\InventoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function __construct(private InventoryService $inventoryService) {}

    public function index(Request $request)
    {
        $pharmacy = $request->user()->pharmacy;
        $filters = $request->only(['search', 'category_id', 'stock_status']);

        return Inertia::render('Pharmacy/Inventory/Index', [
            'medicines' => $this->inventoryService->listForPharmacy($pharmacy, $filters),
            'categories' => MedicineCategory::select('id', 'name', 'name_am')->get(),
            'stats' => $this->inventoryService->getStats($pharmacy),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pharmacy/Inventory/Create', [
            'categories' => MedicineCategory::select('id', 'name', 'name_am')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_am' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_am' => 'nullable|string',
            'category_id' => 'nullable|exists:medicine_categories,id',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'requires_prescription' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        $pharmacy = $request->user()->pharmacy;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('medicines', 'public');
        }

        $validated['pharmacy_id'] = $pharmacy->id;
        $medicine = Medicine::create($validated);

        Cache::forget("pharmacy:{$pharmacy->id}:inventory_stats");
        AuditService::log('medicine_added', $medicine);

        return redirect()->route('pharmacy.inventory.index')
            ->with('success', __('messages.medicine_added'));
    }

    public function edit(Medicine $medicine)
    {
        $this->authorize('update', $medicine);

        return Inertia::render('Pharmacy/Inventory/Edit', [
            'medicine' => $medicine,
            'categories' => MedicineCategory::select('id', 'name', 'name_am')->get(),
        ]);
    }

    public function update(Request $request, Medicine $medicine)
    {
        $this->authorize('update', $medicine);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_am' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_am' => 'nullable|string',
            'category_id' => 'nullable|exists:medicine_categories,id',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'requires_prescription' => 'boolean',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('medicines', 'public');
        }

        $medicine->update($validated);

        Cache::forget("pharmacy:{$medicine->pharmacy_id}:inventory_stats");
        AuditService::log('medicine_updated', $medicine);

        return redirect()->route('pharmacy.inventory.index')
            ->with('success', __('messages.medicine_updated'));
    }

    public function destroy(Medicine $medicine)
    {
        $this->authorize('delete', $medicine);

        Cache::forget("pharmacy:{$medicine->pharmacy_id}:inventory_stats");
        AuditService::log('medicine_deleted', $medicine);
        $medicine->delete();

        return redirect()->route('pharmacy.inventory.index')
            ->with('success', __('messages.medicine_deleted'));
    }
}

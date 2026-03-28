<?php

namespace App\Http\Controllers\User\Pharmacy;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use App\Services\InventoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function __invoke(Request $request, AnalyticsService $analytics, InventoryService $inventory)
    {
        $pharmacy = $request->user()->pharmacy;

        return Inertia::render('User/Pharmacy/Analytics/Index', [
            'stats' => $analytics->getPharmacyStats($pharmacy),
            'inventoryStats' => $inventory->getStats($pharmacy),
        ]);
    }
}

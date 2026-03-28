<?php

namespace App\Http\Controllers;

use App\Models\Pharmacy;
use App\Services\PharmacyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PharmacyController extends Controller
{
    public function __construct(private PharmacyService $pharmacyService) {}

    public function index(Request $request)
    {
        return Inertia::render('Patient/Pharmacies/Index', [
            'pharmacies' => $this->pharmacyService->list($request->only('search')),
            'filters' => $request->only('search'),
        ]);
    }

    public function show(Pharmacy $pharmacy)
    {
        $data = $this->pharmacyService->getWithMedicines($pharmacy);

        return Inertia::render('Patient/Pharmacies/Show', $data);
    }
}

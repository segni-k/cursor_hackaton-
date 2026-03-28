<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $pharmacy = $request->user()->pharmacy;

        $payments = Payment::whereHas('order', fn($q) => $q->where('pharmacy_id', $pharmacy->id))
            ->with('order:id,patient_id,total_amount,status')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $totalEarnings = Payment::whereHas('order', fn($q) => $q->where('pharmacy_id', $pharmacy->id))
            ->where('status', 'released')
            ->sum('amount');

        return Inertia::render('Pharmacy/Payments/Index', [
            'payments' => $payments,
            'totalEarnings' => $totalEarnings,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function show(Receipt $receipt)
    {
        $receipt->load('order.patient', 'order.pharmacy', 'order.items.medicine');

        return Inertia::render('Patient/Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }
}

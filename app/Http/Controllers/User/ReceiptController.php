<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function show(Receipt $receipt)
    {
        $receipt->load('order.patient', 'order.pharmacy', 'order.items.medicine');

        return Inertia::render('User/Patient/Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }
}

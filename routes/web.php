<?php

use App\Http\Controllers\LocaleController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\Patient\DashboardController as PatientDashboard;
use App\Http\Controllers\Pharmacy\AnalyticsController;
use App\Http\Controllers\Pharmacy\DashboardController as PharmacyDashboard;
use App\Http\Controllers\Pharmacy\InventoryController;
use App\Http\Controllers\Pharmacy\OrderController as PharmacyOrderController;
use App\Http\Controllers\Pharmacy\PaymentController as PharmacyPaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::post('/locale', [LocaleController::class, 'update'])->name('locale.update');

// Legacy dashboard redirect
Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user?->isPharmacyOwner()) {
        return redirect('/pharmacy/dashboard');
    }
    return redirect('/patient/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ---------- Patient Routes ----------
Route::middleware(['auth', 'role:patient'])->prefix('patient')->name('patient.')->group(function () {
    Route::get('/dashboard', PatientDashboard::class)->name('dashboard');

    Route::get('/medicines', [MedicineController::class, 'index'])->name('medicines.index');
    Route::get('/medicines/autocomplete', [MedicineController::class, 'autocomplete'])->name('medicines.autocomplete');
    Route::get('/medicines/{id}', [MedicineController::class, 'show'])->name('medicines.show');

    Route::get('/pharmacies', [PharmacyController::class, 'index'])->name('pharmacies.index');
    Route::get('/pharmacies/{pharmacy}', [PharmacyController::class, 'show'])->name('pharmacies.show');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

    Route::get('/prescriptions', [PrescriptionController::class, 'index'])->name('prescriptions.index');
    Route::get('/prescriptions/upload', function () {
        return Inertia::render('Patient/Prescriptions/Upload');
    })->name('prescriptions.upload');
    Route::post('/prescriptions', [PrescriptionController::class, 'store'])->name('prescriptions.store');
    Route::get('/prescriptions/{prescription}', [PrescriptionController::class, 'show'])->name('prescriptions.show');

    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
    Route::post('/payments/initiate', [PaymentController::class, 'initiate'])->name('payments.initiate');

    Route::get('/receipts/{receipt}', [ReceiptController::class, 'show'])->name('receipts.show');
});

// ---------- Pharmacy Routes ----------
Route::middleware(['auth', 'role:pharmacy_owner'])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    Route::get('/dashboard', PharmacyDashboard::class)->name('dashboard');

    Route::post('/setup', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_am' => 'nullable|string|max:255',
            'address' => 'required|string',
            'address_am' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ]);
        $validated['user_id'] = $request->user()->id;
        \App\Models\Pharmacy::create($validated);
        return redirect()->route('pharmacy.dashboard')->with('success', 'Pharmacy created!');
    })->name('setup');

    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::get('/inventory/create', [InventoryController::class, 'create'])->name('inventory.create');
    Route::post('/inventory', [InventoryController::class, 'store'])->name('inventory.store');
    Route::get('/inventory/{medicine}/edit', [InventoryController::class, 'edit'])->name('inventory.edit');
    Route::put('/inventory/{medicine}', [InventoryController::class, 'update'])->name('inventory.update');
    Route::delete('/inventory/{medicine}', [InventoryController::class, 'destroy'])->name('inventory.destroy');

    Route::get('/orders', [PharmacyOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/scanner', [PharmacyOrderController::class, 'scanner'])->name('orders.scanner');
    Route::post('/orders/verify-qr', [PharmacyOrderController::class, 'verifyQR'])->name('orders.verify-qr');
    Route::get('/orders/{order}', [PharmacyOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [PharmacyOrderController::class, 'updateStatus'])->name('orders.status');

    Route::get('/payments', [PharmacyPaymentController::class, 'index'])->name('payments.index');

    Route::get('/analytics', AnalyticsController::class)->name('analytics');
});

// M-Pesa Callback (no auth)
Route::post('/api/mpesa/callback', [PaymentController::class, 'callback'])->name('mpesa.callback');

require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use App\Services\QRCodeService;
use App\Services\ReceiptService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService,
        private QRCodeService $qrCodeService,
        private ReceiptService $receiptService,
    ) {}

    public function index(Request $request)
    {
        $pharmacy = $request->user()->pharmacy;
        $status = $request->get('status');

        $query = Order::forPharmacy($pharmacy->id)
            ->with(['patient:id,name,email', 'items'])
            ->latest();

        if ($status) {
            $query->where('status', $status);
        }

        return Inertia::render('Pharmacy/Orders/Index', [
            'orders' => $query->paginate(10)->withQueryString(),
            'currentStatus' => $status,
        ]);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load(['patient:id,name,email,phone', 'items.medicine', 'payment', 'receipt']);

        return Inertia::render('Pharmacy/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'status' => 'required|in:confirmed,ready,completed,cancelled',
        ]);

        $order = $this->orderService->updateStatus($order, $validated['status']);

        if ($validated['status'] === 'completed') {
            $this->receiptService->generateForOrder($order);
        }

        return back()->with('success', __("messages.order_{$validated['status']}"));
    }

    public function scanner()
    {
        return Inertia::render('Pharmacy/Orders/QRScanner');
    }

    public function verifyQR(Request $request)
    {
        $validated = $request->validate(['qr_code' => 'required|string']);

        $order = $this->qrCodeService->verify($validated['qr_code']);

        if (!$order) {
            return back()->with('error', 'Invalid or already used QR code.');
        }

        $this->qrCodeService->markVerified($order);
        $this->receiptService->generateForOrder($order);

        if ($order->payment) {
            $order->payment->update([
                'status' => 'released',
                'released_at' => now(),
            ]);
        }

        return back()->with('success', __('messages.qr_verified'));
    }
}

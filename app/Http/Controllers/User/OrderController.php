<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(private OrderService $orderService) {}

    public function index(Request $request)
    {
        $orders = Order::forPatient($request->user()->id)
            ->with(['pharmacy:id,name,name_am', 'items'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('User/Patient/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load(['pharmacy:id,name,name_am,address,phone', 'items.medicine:id,name,name_am,price,image', 'payment', 'receipt']);

        return Inertia::render('User/Patient/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pharmacy_id' => 'required|exists:pharmacies,id',
            'items' => 'required|array|min:1',
            'items.*.medicine_id' => 'required|exists:medicines,id',
            'items.*.quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
            'prescription_id' => 'nullable|exists:prescriptions,id',
        ]);

        $order = $this->orderService->createOrder(
            $request->user()->id,
            $validated['pharmacy_id'],
            $validated['items'],
            $validated['notes'] ?? null,
            $validated['prescription_id'] ?? null,
        );

        return redirect()->route('patient.orders.show', $order)
            ->with('success', __('messages.order_created'));
    }
}

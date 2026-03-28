<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->patient_id
            || ($user->pharmacy && $user->pharmacy->id === $order->pharmacy_id);
    }

    public function update(User $user, Order $order): bool
    {
        return $user->pharmacy && $user->pharmacy->id === $order->pharmacy_id;
    }
}

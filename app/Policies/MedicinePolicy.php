<?php

namespace App\Policies;

use App\Models\Medicine;
use App\Models\User;

class MedicinePolicy
{
    public function update(User $user, Medicine $medicine): bool
    {
        return $user->pharmacy && $user->pharmacy->id === $medicine->pharmacy_id;
    }

    public function delete(User $user, Medicine $medicine): bool
    {
        return $this->update($user, $medicine);
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PharmacyFactory extends Factory
{
    public function definition(): array
    {
        $names = [
            'Beza Pharmacy', 'Selam Pharmacy', 'Genet Pharmacy', 'Abebe Pharmacy',
            'Addis Pharmacy', 'Tigist Pharmacy', 'Hiwot Pharmacy', 'Bethel Pharmacy',
        ];

        return [
            'user_id' => User::factory(),
            'name' => $this->faker->randomElement($names),
            'name_am' => 'ፋርማሲ ' . $this->faker->firstName(),
            'address' => $this->faker->address(),
            'address_am' => 'አዲስ አበባ, ' . $this->faker->streetName(),
            'phone' => '+2519' . $this->faker->numerify('########'),
            'latitude' => $this->faker->latitude(8.9, 9.1),
            'longitude' => $this->faker->longitude(38.6, 38.9),
            'is_active' => true,
            'opening_hours' => [
                'monday' => '08:00-20:00',
                'tuesday' => '08:00-20:00',
                'wednesday' => '08:00-20:00',
                'thursday' => '08:00-20:00',
                'friday' => '08:00-20:00',
                'saturday' => '09:00-18:00',
                'sunday' => '10:00-16:00',
            ],
        ];
    }
}

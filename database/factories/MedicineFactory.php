<?php

namespace Database\Factories;

use App\Models\MedicineCategory;
use App\Models\Pharmacy;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicineFactory extends Factory
{
    public function definition(): array
    {
        $medicines = [
            'Amoxicillin', 'Paracetamol', 'Ibuprofen', 'Ciprofloxacin', 'Metformin',
            'Omeprazole', 'Amlodipine', 'Atorvastatin', 'Salbutamol', 'Doxycycline',
            'Azithromycin', 'Diclofenac', 'Cetirizine', 'Loratadine', 'Metronidazole',
            'Aspirin', 'Vitamin C', 'Vitamin D3', 'Iron Supplement', 'Zinc Tablets',
            'Chloroquine', 'Artemether', 'Erythromycin', 'Fluconazole', 'Prednisolone',
        ];

        $units = ['tablet', 'capsule', 'bottle', 'tube', 'box', 'piece'];

        return [
            'pharmacy_id' => Pharmacy::factory(),
            'category_id' => MedicineCategory::inRandomOrder()->first()?->id ?? 1,
            'name' => $this->faker->randomElement($medicines) . ' ' . $this->faker->randomElement(['250mg', '500mg', '100mg', '50mg', '10ml']),
            'name_am' => null,
            'description' => $this->faker->sentence(10),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'stock_quantity' => $this->faker->numberBetween(0, 200),
            'low_stock_threshold' => 10,
            'unit' => $this->faker->randomElement($units),
            'requires_prescription' => $this->faker->boolean(30),
            'is_active' => true,
        ];
    }
}

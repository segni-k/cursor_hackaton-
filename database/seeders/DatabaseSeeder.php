<?php

namespace Database\Seeders;

use App\Models\Medicine;
use App\Models\Pharmacy;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            MedicineCategorySeeder::class,
        ]);

        $patientRole = Role::where('slug', 'patient')->first();
        $pharmacyRole = Role::where('slug', 'pharmacy_owner')->first();

        // Demo patient
        $patient = User::factory()->create([
            'name' => 'Demo Patient',
            'email' => 'patient@endode.com',
            'role_id' => $patientRole->id,
        ]);

        // Demo pharmacy owners with pharmacies and medicines
        $pharmacyOwner1 = User::factory()->create([
            'name' => 'Demo Pharmacist',
            'email' => 'pharmacy@endode.com',
            'role_id' => $pharmacyRole->id,
        ]);

        $pharmacy1 = Pharmacy::factory()->create([
            'user_id' => $pharmacyOwner1->id,
            'name' => 'Beza Pharmacy',
            'name_am' => 'በዛ ፋርማሲ',
            'address' => 'Bole Road, Addis Ababa',
            'address_am' => 'ቦሌ መንገድ, አዲስ አበባ',
        ]);

        Medicine::factory(15)->create(['pharmacy_id' => $pharmacy1->id]);

        // Additional pharmacies
        for ($i = 0; $i < 4; $i++) {
            $owner = User::factory()->create(['role_id' => $pharmacyRole->id]);
            $pharmacy = Pharmacy::factory()->create(['user_id' => $owner->id]);
            Medicine::factory(rand(8, 20))->create(['pharmacy_id' => $pharmacy->id]);
        }

        // Additional patients
        User::factory(5)->create(['role_id' => $patientRole->id]);
    }
}

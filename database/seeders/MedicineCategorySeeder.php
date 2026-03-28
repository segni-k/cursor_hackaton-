<?php

namespace Database\Seeders;

use App\Models\MedicineCategory;
use Illuminate\Database\Seeder;

class MedicineCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Antibiotics', 'name_am' => 'አንቲባዮቲክስ', 'slug' => 'antibiotics'],
            ['name' => 'Pain Relief', 'name_am' => 'ህመም ማስታገሻ', 'slug' => 'pain-relief'],
            ['name' => 'Vitamins & Supplements', 'name_am' => 'ቫይታሚን እና ተጨማሪ', 'slug' => 'vitamins-supplements'],
            ['name' => 'Cardiovascular', 'name_am' => 'የልብ መድሃኒት', 'slug' => 'cardiovascular'],
            ['name' => 'Respiratory', 'name_am' => 'የመተንፈሻ', 'slug' => 'respiratory'],
            ['name' => 'Digestive', 'name_am' => 'የምግብ መፍጫ', 'slug' => 'digestive'],
            ['name' => 'Dermatological', 'name_am' => 'የቆዳ', 'slug' => 'dermatological'],
            ['name' => 'Diabetes', 'name_am' => 'የስኳር', 'slug' => 'diabetes'],
            ['name' => 'Eye & Ear', 'name_am' => 'ዓይን እና ጆሮ', 'slug' => 'eye-ear'],
            ['name' => 'First Aid', 'name_am' => 'የመጀመሪያ እርዳታ', 'slug' => 'first-aid'],
            ['name' => 'Pediatric', 'name_am' => 'የህፃናት', 'slug' => 'pediatric'],
            ['name' => 'Allergy', 'name_am' => 'አለርጂ', 'slug' => 'allergy'],
        ];

        foreach ($categories as $cat) {
            MedicineCategory::firstOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pharmacy_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('medicine_categories')->nullOnDelete();
            $table->string('name');
            $table->string('name_am')->nullable();
            $table->text('description')->nullable();
            $table->text('description_am')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock_quantity')->default(0);
            $table->integer('low_stock_threshold')->default(10);
            $table->string('unit', 50)->default('piece');
            $table->boolean('requires_prescription')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('image')->nullable();
            $table->timestamps();

            $table->index('pharmacy_id');
            $table->index('category_id');
            $table->index('name');
            $table->index('is_active');
            $table->index('stock_quantity');
            $table->index('price');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};

<?php

namespace App\Console\Commands;

use App\Models\Medicine;
use App\Notifications\LowStockNotification;
use Illuminate\Console\Command;

class CheckLowStock extends Command
{
    protected $signature = 'stock:check-low';
    protected $description = 'Check for low stock medicines and notify pharmacy owners';

    public function handle(): int
    {
        $lowStockMedicines = Medicine::whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->where('stock_quantity', '>', 0)
            ->where('is_active', true)
            ->with('pharmacy.owner')
            ->get();

        $count = 0;
        foreach ($lowStockMedicines as $medicine) {
            $owner = $medicine->pharmacy?->owner;
            if ($owner) {
                $owner->notify(new LowStockNotification($medicine));
                $count++;
            }
        }

        $this->info("Sent {$count} low stock notifications.");
        return Command::SUCCESS;
    }
}

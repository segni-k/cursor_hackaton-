<?php

namespace App\Jobs;

use App\Models\Payment;
use App\Services\AuditService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ReleaseMpesaEscrow implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 120;

    public function __construct(private Payment $payment) {}

    public function handle(): void
    {
        if ($this->payment->status !== 'escrowed') return;

        try {
            // In production: call M-Pesa B2C API to transfer funds to pharmacy
            // For now, mark as released
            $this->payment->update([
                'status' => 'released',
                'released_at' => now(),
            ]);

            AuditService::log('escrow_released', $this->payment, [
                'amount' => $this->payment->amount,
                'order_id' => $this->payment->order_id,
            ]);

            Log::info("Escrow released for payment #{$this->payment->id}");
        } catch (\Exception $e) {
            Log::error("Failed to release escrow: " . $e->getMessage());
            throw $e;
        }
    }
}

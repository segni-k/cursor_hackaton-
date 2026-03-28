<?php

namespace App\Jobs;

use App\Models\Payment;
use App\Services\AuditService;
use App\Services\MpesaService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMpesaPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 5;
    public array $backoff = [30, 60, 120, 300, 600];

    public function __construct(private Payment $payment) {}

    public function handle(MpesaService $mpesa): void
    {
        if (!$this->payment->mpesa_transaction_id) return;

        $result = $mpesa->checkTransactionStatus($this->payment->mpesa_transaction_id);

        $resultCode = $result['ResultCode'] ?? -1;

        if ($resultCode === 0) {
            $this->payment->update([
                'status' => 'escrowed',
                'paid_at' => now(),
            ]);
            $this->payment->order->update(['status' => 'confirmed']);
            AuditService::log('payment_confirmed', $this->payment);
        } elseif ($resultCode !== 1032) {
            // 1032 = "Request cancelled by user" - still pending
            $this->payment->update(['status' => 'failed']);
            AuditService::log('payment_failed', $this->payment, ['result_code' => $resultCode]);
        } else {
            $this->release(60);
        }
    }
}

<?php

namespace App\Notifications;

use App\Models\Medicine;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LowStockNotification extends Notification
{
    use Queueable;

    public function __construct(private Medicine $medicine) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => __('messages.low_stock_alert', [
                'medicine' => $this->medicine->name,
                'count' => $this->medicine->stock_quantity,
            ]),
            'medicine_id' => $this->medicine->id,
            'stock_quantity' => $this->medicine->stock_quantity,
        ];
    }
}

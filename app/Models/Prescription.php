<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id', 'image_path', 'ocr_raw_text',
        'parsed_medicines', 'status',
    ];

    protected function casts(): array
    {
        return [
            'parsed_medicines' => 'array',
        ];
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}

<?php

namespace App\Jobs;

use App\Models\Prescription;
use App\Services\AuditService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessPrescription implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(private Prescription $prescription) {}

    public function handle(): void
    {
        try {
            $this->prescription->update(['status' => 'processing']);

            $imagePath = Storage::disk('public')->path($this->prescription->image_path);

            // OCR placeholder - integrate Tesseract or Google Vision here
            $ocrText = $this->performOCR($imagePath);
            $parsedMedicines = $this->parseMedicines($ocrText);

            $this->prescription->update([
                'ocr_raw_text' => $ocrText,
                'parsed_medicines' => $parsedMedicines,
                'status' => 'processed',
            ]);

            AuditService::log('prescription_processed', $this->prescription);
        } catch (\Exception $e) {
            Log::error('Prescription processing failed: ' . $e->getMessage());
            $this->prescription->update(['status' => 'failed']);
            throw $e;
        }
    }

    private function performOCR(string $imagePath): string
    {
        // Placeholder: integrate with thiagoalessio/tesseract_ocr or Google Vision
        // Example with Tesseract:
        // return (new \thiagoalessio\TesseractOCR\TesseractOCR($imagePath))->run();
        return 'OCR processing placeholder - configure Tesseract or Google Vision API';
    }

    private function parseMedicines(string $ocrText): array
    {
        // NLP placeholder - parse medicine names, dosages, quantities from OCR text
        // In production, use regex patterns or an NLP service
        return [
            ['name' => 'Extracted Medicine', 'dosage' => '500mg', 'quantity' => '1 box'],
        ];
    }
}

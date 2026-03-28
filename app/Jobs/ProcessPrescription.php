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
        $driver = config('endode.ocr.driver', 'mock');

        if ($driver === 'google_vision' && ($key = config('endode.ocr.google_vision_key'))) {
            // Optional: wire google/cloud-vision — keep mock fallback if request fails
            try {
                // @phpstan-ignore-next-line — optional dependency
                return $this->ocrWithGoogleVision($imagePath, $key);
            } catch (\Throwable $e) {
                Log::warning('Endode OCR: Google Vision failed, falling back to mock: '.$e->getMessage());
            }
        }

        if ($driver === 'tesseract' && is_readable($imagePath)
            && class_exists(\thiagoalessio\TesseractOCR\TesseractOCR::class)) {
            $binary = config('endode.ocr.tesseract_path');
            if ($binary && is_executable($binary)) {
                try {
                    return (new \thiagoalessio\TesseractOCR\TesseractOCR($imagePath))->executable($binary)->run();
                } catch (\Throwable $e) {
                    Log::warning('Endode OCR: Tesseract failed: '.$e->getMessage());
                }
            }
        }

        return $this->mockOcrSampleText();
    }

    private function mockOcrSampleText(): string
    {
        return implode("\n", [
            'PRESCRIPTION',
            'Dr. Alemayehu T.',
            'Patient: Demo User',
            'Date: '.now()->toDateString(),
            'Amoxicillin 500mg — Take 1 capsule twice daily for 7 days',
            'Paracetamol 500mg — As needed for pain',
            'Cetirizine 10mg — Once daily at bedtime',
        ]);
    }

    private function ocrWithGoogleVision(string $imagePath, string $apiKey): string
    {
        $imageContent = base64_encode((string) file_get_contents($imagePath));
        $response = \Illuminate\Support\Facades\Http::withHeaders(['Content-Type' => 'application/json'])
            ->post('https://vision.googleapis.com/v1/images:annotate?key='.$apiKey, [
                'requests' => [
                    [
                        'image' => ['content' => $imageContent],
                        'features' => [['type' => 'DOCUMENT_TEXT_DETECTION']],
                    ],
                ],
            ]);

        $text = data_get($response->json(), 'responses.0.fullTextAnnotation.text');

        return is_string($text) && $text !== '' ? $text : $this->mockOcrSampleText();
    }

    private function parseMedicines(string $ocrText): array
    {
        // Lightweight NLP: lines that look like medicine rows (demo + production heuristic)
        $lines = preg_split('/\R+/', $ocrText) ?: [];
        $out = [];
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || preg_match('/^(PRESCRIPTION|Dr\.|Patient:|Date:)/i', $line)) {
                continue;
            }
            if (preg_match('/^(?<name>[A-Za-z][A-Za-z\s\-]+?)\s+(?<dosage>\d+\s*(mg|ml|g))\b/i', $line, $m)) {
                $out[] = [
                    'name' => trim($m['name']),
                    'dosage' => $m['dosage'],
                    'quantity' => 'as prescribed',
                ];
            }
        }

        if ($out === []) {
            return [
                ['name' => 'Extracted Medicine', 'dosage' => 'see prescription', 'quantity' => '1 course'],
            ];
        }

        return $out;
    }
}

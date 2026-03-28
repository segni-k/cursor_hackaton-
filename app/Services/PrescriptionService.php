<?php

namespace App\Services;

use App\Jobs\ProcessPrescription;
use App\Models\Prescription;
use Illuminate\Http\UploadedFile;

class PrescriptionService
{
    public function upload(int $patientId, UploadedFile $image): Prescription
    {
        $path = $image->store('prescriptions', 'public');

        $prescription = Prescription::create([
            'patient_id' => $patientId,
            'image_path' => $path,
            'status' => 'pending',
        ]);

        ProcessPrescription::dispatch($prescription);

        return $prescription;
    }
}

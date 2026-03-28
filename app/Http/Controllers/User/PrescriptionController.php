<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PrescriptionController extends Controller
{
    public function index(Request $request)
    {
        $prescriptions = Prescription::where('patient_id', $request->user()->id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('User/Patient/Prescriptions/Index', [
            'prescriptions' => $prescriptions,
        ]);
    }

    public function show(Prescription $prescription)
    {
        $this->authorize('view', $prescription);

        return Inertia::render('User/Patient/Prescriptions/Show', [
            'prescription' => $prescription,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $path = $request->file('image')->store('prescriptions', 'public');

        $prescription = Prescription::create([
            'patient_id' => $request->user()->id,
            'image_path' => $path,
            'status' => 'pending',
        ]);

        // TODO: Dispatch ProcessPrescription job when OCR is configured

        return redirect()->route('patient.prescriptions.show', $prescription)
            ->with('success', __('messages.prescription_uploaded'));
    }
}

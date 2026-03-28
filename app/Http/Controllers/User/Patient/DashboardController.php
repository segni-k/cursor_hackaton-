<?php

namespace App\Http\Controllers\User\Patient;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request, AnalyticsService $analytics)
    {
        return Inertia::render('User/Patient/Dashboard', [
            'stats' => $analytics->getPatientStats($request->user()->id),
        ]);
    }
}

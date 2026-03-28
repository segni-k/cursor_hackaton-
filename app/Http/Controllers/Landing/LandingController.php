<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Public marketing / landing page only — separate from patient, pharmacy, and admin apps.
 */
class LandingController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Landing/Welcome');
    }
}

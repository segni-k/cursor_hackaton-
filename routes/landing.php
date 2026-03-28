<?php

use App\Http\Controllers\Landing\LandingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Landing (marketing) — public homepage & future marketing pages
|--------------------------------------------------------------------------
| Keep patient/pharmacy/auth routes in web.php. Admin routes: routes/admin.php.
*/

Route::get('/', LandingController::class)->name('landing.home');

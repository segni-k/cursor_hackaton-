<?php

/*
|--------------------------------------------------------------------------
| Web routes — composition only
|--------------------------------------------------------------------------
| landing.php  — public marketing
| user.php     — patients, pharmacy owners, profile, locale, M-Pesa callback
| auth.php     — login, register, password (User\Auth controllers)
| admin.php    — admin dashboard (team)
*/

require __DIR__.'/landing.php';

require __DIR__.'/user.php';

require __DIR__.'/auth.php';

require __DIR__.'/admin.php';

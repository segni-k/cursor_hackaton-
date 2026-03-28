<?php

return [
    'base_url' => env('MPESA_BASE_URL', 'https://sandbox.safaricom.co.ke'),
    'consumer_key' => env('MPESA_CONSUMER_KEY', ''),
    'consumer_secret' => env('MPESA_CONSUMER_SECRET', ''),
    'shortcode' => env('MPESA_SHORTCODE', ''),
    'passkey' => env('MPESA_PASSKEY', ''),
    'callback_url' => env('MPESA_CALLBACK_URL', ''),
    'b2c_shortcode' => env('MPESA_B2C_SHORTCODE', ''),
    'b2c_initiator' => env('MPESA_B2C_INITIATOR', ''),
    'b2c_password' => env('MPESA_B2C_PASSWORD', ''),
];

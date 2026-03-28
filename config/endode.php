<?php

/**
 * Endode MVP — product configuration (driven by .env ENDODE_*).
 * Payment integration uses Safaricom Daraja (M-Pesa STK) via config/mpesa.php, not third-party “aggregator” APIs.
 */

return [
    'product' => [
        'title' => env('ENDODE_PRODUCT_TITLE', 'Endode'),
        'subtitle' => env('ENDODE_PRODUCT_SUBTITLE', 'እንዶድ — Ethiopia\'s Smart Pharmacy Platform'),
        'tagline' => env('ENDODE_PRODUCT_TAGLINE', 'MVP — Core health-commerce features for patients and pharmacies.'),
    ],

    'locales' => [
        'default' => env('ENDODE_LOCALE_DEFAULT', env('APP_LOCALE', 'en')),
        'supported' => array_values(array_filter(array_map('trim', explode(',', env('ENDODE_LOCALES', 'en,am'))))),
    ],

    /**
     * Feature toggles — disable modules in constrained environments.
     */
    'features' => [
        'prescription_scanner' => env('ENDODE_FEATURE_PRESCRIPTION_SCANNER', true),
        'mpesa_escrow' => env('ENDODE_FEATURE_MPESA_ESCROW', true),
        'qr_verification' => env('ENDODE_FEATURE_QR_VERIFICATION', true),
        'dual_language' => env('ENDODE_FEATURE_DUAL_LANGUAGE', true),
        'digital_receipts' => env('ENDODE_FEATURE_DIGITAL_RECEIPTS', true),
        'multi_pharmacy' => env('ENDODE_FEATURE_MULTI_PHARMACY', true),
        'medicine_search' => env('ENDODE_FEATURE_MEDICINE_SEARCH', true),
        'inventory' => env('ENDODE_FEATURE_INVENTORY', true),
        'orders' => env('ENDODE_FEATURE_ORDERS', true),
        'payment_audit' => env('ENDODE_FEATURE_PAYMENT_AUDIT', true),
        'role_dashboards' => env('ENDODE_FEATURE_ROLE_DASHBOARDS', true),
        'analytics' => env('ENDODE_FEATURE_ANALYTICS', true),
        'prescription_history' => env('ENDODE_FEATURE_PRESCRIPTION_HISTORY', true),
    ],

    /**
     * AI Prescription Scanner — OCR + NLP (no external “Dereja” API; plug Tesseract or Vision here).
     */
    'ocr' => [
        'driver' => env('ENDODE_OCR_DRIVER', 'mock'), // mock | tesseract | google_vision
        'google_vision_key' => env('ENDODE_GOOGLE_VISION_API_KEY', ''),
        'tesseract_path' => env('ENDODE_TESSERACT_PATH', ''),
    ],

    /**
     * M-Pesa escrow — mock = no HTTP to Safaricom (local/demo); sandbox | live = Daraja STK + callback.
     */
    'payments' => [
        'mode' => env('ENDODE_PAYMENTS_MODE', 'mock'), // mock | sandbox | live
    ],

    /**
     * Marketing copy for Welcome / docs (single source for MVP list).
     */
    'mvp_core_features' => [
        [
            'icon' => 'document-text',
            'title' => 'AI Prescription Scanner (OCR + NLP)',
            'description' => 'Upload prescription images; extract text and structured medicine data for reordering.',
        ],
        [
            'icon' => 'currency-dollar',
            'title' => 'M-Pesa Secure-Lock Escrow Payment',
            'description' => 'STK push via Safaricom Daraja; funds held in escrow until QR handoff at the pharmacy.',
        ],
        [
            'icon' => 'qr-code',
            'title' => 'QR Code Verification & Fund Release',
            'description' => 'Pharmacy scans order QR to verify pickup and complete the payment lifecycle.',
        ],
        [
            'icon' => 'globe-alt',
            'title' => 'Dual-Language Support (Amharic & English)',
            'description' => 'UI and content switch between English and አማርኛ for patients and staff.',
        ],
        [
            'icon' => 'document-duplicate',
            'title' => 'Digital Payment Receipt System',
            'description' => 'Downloadable digital receipts tied to orders and M-Pesa references.',
        ],
        [
            'icon' => 'building-storefront',
            'title' => 'Multi-Pharmacy Ecosystem',
            'description' => 'Browse pharmacies, stock levels, and pricing across the network.',
        ],
        [
            'icon' => 'magnifying-glass',
            'title' => 'Advanced Medicine Search Engine',
            'description' => 'Search and filter medicines with availability-aware results.',
        ],
        [
            'icon' => 'cube',
            'title' => 'Intelligent Inventory Management System',
            'description' => 'Pharmacy owners manage stock, pricing, and low-stock signals.',
        ],
        [
            'icon' => 'clipboard-document-list',
            'title' => 'Smart Order Management System',
            'description' => 'Patients place orders; pharmacies fulfill with clear status workflow.',
        ],
        [
            'icon' => 'shield-check',
            'title' => 'Payment Tracking & Audit System',
            'description' => 'Payments, escrow state, and audit trails for compliance and support.',
        ],
        [
            'icon' => 'user-group',
            'title' => 'Role-Based Dashboard System',
            'description' => 'Separate patient and pharmacy dashboards with appropriate tools.',
        ],
        [
            'icon' => 'chart-bar',
            'title' => 'Analytics & Reporting Dashboard',
            'description' => 'Sales, stock, and usage insights for pharmacy operations.',
        ],
        [
            'icon' => 'clock',
            'title' => 'Prescription History Management System',
            'description' => 'Past uploads and parsed prescriptions for quick reorder.',
        ],
    ],
];

import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    QrCodeIcon,
    BuildingStorefrontIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    DocumentDuplicateIcon,
    CubeIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
    ChartBarIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export const iconMap = {
    'document-text': DocumentTextIcon,
    'currency-dollar': CurrencyDollarIcon,
    'qr-code': QrCodeIcon,
    'globe-alt': GlobeAltIcon,
    'document-duplicate': DocumentDuplicateIcon,
    'building-storefront': BuildingStorefrontIcon,
    'magnifying-glass': MagnifyingGlassIcon,
    cube: CubeIcon,
    'clipboard-document-list': ClipboardDocumentListIcon,
    'shield-check': ShieldCheckIcon,
    'user-group': UserGroupIcon,
    'chart-bar': ChartBarIcon,
    clock: ClockIcon,
};

export const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#for-you', label: 'Who it’s for' },
    { href: '#security', label: 'Security' },
    { href: '#faq', label: 'FAQ' },
];

export const stats = [
    { value: '13+', label: 'Platform modules', sub: 'One connected MVP' },
    { value: 'EN · AM', label: 'Dual language', sub: 'Amharic & English' },
    { value: 'M-Pesa', label: 'Escrow flow', sub: 'Secure-lock payments' },
    { value: 'QR', label: 'Pickup proof', sub: 'Verify & release' },
];

export const steps = [
    {
        n: '01',
        title: 'Search & discover',
        desc: 'Find medicines across pharmacies with smart filters, stock signals, and pricing context.',
        Icon: MagnifyingGlassIcon,
    },
    {
        n: '02',
        title: 'Order & upload',
        desc: 'Place orders and optionally scan prescriptions — OCR + NLP extracts medicine details.',
        Icon: ClipboardDocumentListIcon,
    },
    {
        n: '03',
        title: 'Pay with M-Pesa',
        desc: 'STK push with escrow: funds stay protected until your order is verified at pickup.',
        Icon: CurrencyDollarIcon,
    },
    {
        n: '04',
        title: 'Verify with QR',
        desc: 'Show your QR at the pharmacy — staff scans, funds release, digital receipt generated.',
        Icon: QrCodeIcon,
    },
];

export const patientPoints = [
    'Advanced medicine search with multi-pharmacy availability',
    'Prescription history & re-order friendly workflows',
    'Payment tracking, receipts, and audit-friendly records',
    'Role-based patient dashboard — clear, fast, mobile-ready',
];

export const pharmacyPoints = [
    'Inventory intelligence with low-stock awareness',
    'Order queue, QR scanner, and status workflow',
    'Analytics & reporting for sales and stock',
    'Pharmacy dashboard tailored to owners and staff roles',
];

export const testimonials = [
    {
        quote:
            'Finally one place to compare stock and pay safely. The QR handoff at pickup feels seamless.',
        name: 'Meron T.',
        role: 'Patient, Addis Ababa',
    },
    {
        quote:
            'We reduced checkout disputes — escrow + QR verification keeps both sides aligned.',
        name: 'Dr. Samuel B.',
        role: 'Pharmacy owner',
    },
    {
        quote:
            'Having English and Amharic in the same flow helps our whole team and customers.',
        name: 'Hanna K.',
        role: 'Pharmacy operations',
    },
];

export const faqItems = [
    {
        q: 'What is Endode (እንዶድ)?',
        a: 'Endode is a smart pharmacy platform for Ethiopia: search medicines across pharmacies, manage orders, pay with M-Pesa escrow, verify pickup with QR, and keep digital receipts — with Amharic and English support.',
    },
    {
        q: 'How does M-Pesa escrow work?',
        a: 'Payments can be held in escrow until the pharmacy verifies your pickup via QR scan. That aligns payment release with real-world fulfillment — see your environment notes for demo vs live Safaricom Daraja settings.',
    },
    {
        q: 'Does the AI prescription scanner replace my doctor?',
        a: 'No. OCR and NLP help digitize what is on a prescription image for convenience and re-ordering. Always follow your clinician’s advice.',
    },
    {
        q: 'Who is the platform for?',
        a: 'Patients ordering medicines and pharmacies managing inventory, orders, analytics, and in-store verification — with role-based dashboards.',
    },
    {
        q: 'Is my data audited?',
        a: 'The MVP includes payment tracking and audit-oriented events for accountability. Use production-grade hosting and policies for compliance needs.',
    },
    {
        q: 'How do I register as a pharmacy?',
        a: 'Choose “Register as Pharmacy” or use the registration flow with the pharmacy owner role, then complete your pharmacy profile and inventory setup.',
    },
];

import { Head, usePage } from '@inertiajs/react';
import StitchNav from '@/Components/Landing/StitchNav';
import StitchHero from '@/Components/Landing/StitchHero';
import StitchStats from '@/Components/Landing/StitchStats';
import ProcessSteps from '@/Components/Landing/ProcessSteps';
import DualAudience from '@/Components/Landing/DualAudience';
import FeatureBento from '@/Components/Landing/FeatureBento';
import SecurityShowcase from '@/Components/Landing/SecurityShowcase';
import VoicesGrid from '@/Components/Landing/VoicesGrid';
import FaqAccordion from '@/Components/Landing/FaqAccordion';
import FinalCta from '@/Components/Landing/FinalCta';
import SiteFooter from '@/Components/Landing/SiteFooter';

/**
 * Public marketing — isolated from User/ (app) and Admin/.
 * Backend: App\Http\Controllers\Landing\LandingController · routes/landing.php
 */
export default function Welcome() {
    const { auth, endode } = usePage().props;
    const product = endode?.product ?? {};
    const mvpFeatures = endode?.mvp_features ?? [];
    const title = product.title || 'Endode';
    const subtitle = product.subtitle || "Ethiopia's Smart Pharmacy Platform";
    const tagline =
        product.tagline ||
        'Upload prescriptions, search medicines across pharmacies, pay securely with M-Pesa, and pick up with QR verification.';

    return (
        <>
            <Head title={`${title} — Smart Pharmacy Platform`} />

            <div className="min-h-screen scroll-smooth bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 antialiased">
                <StitchNav auth={auth} title={title} />
                <StitchHero subtitle={subtitle} tagline={tagline} />
                <StitchStats />
                <ProcessSteps />
                <DualAudience />
                <FeatureBento title={title} mvpFeatures={mvpFeatures} />
                <SecurityShowcase />
                <VoicesGrid />
                <FaqAccordion />
                <FinalCta title={title} paymentsMode={endode?.payments_mode} />
                <SiteFooter title={title} />
            </div>
        </>
    );
}

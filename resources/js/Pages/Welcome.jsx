import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    QrCodeIcon,
    BuildingStorefrontIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const features = [
    { icon: DocumentTextIcon, title: 'AI Prescription Scanner', desc: 'Upload prescriptions and let AI extract medicine details instantly.' },
    { icon: MagnifyingGlassIcon, title: 'Smart Medicine Search', desc: 'Find medicines across multiple pharmacies with real-time availability.' },
    { icon: CurrencyDollarIcon, title: 'Secure M-Pesa Payments', desc: 'Pay safely with escrow protection until you receive your medicines.' },
    { icon: QrCodeIcon, title: 'QR Verification', desc: 'Verify orders instantly with secure QR codes at the pharmacy.' },
    { icon: BuildingStorefrontIcon, title: 'Multi-Pharmacy Network', desc: 'Access a network of pharmacies with inventory and pricing info.' },
    { icon: ShieldCheckIcon, title: 'Digital Receipts', desc: 'Get digital receipts for every transaction, downloadable anytime.' },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome to Endode" />

            <div className="min-h-screen bg-gradient-to-b from-white via-endode-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Nav */}
                <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-endode-400 to-endode-600 rounded-xl flex items-center justify-center">
                                <span className="text-sm font-bold text-white">እ</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-endode-600 to-endode-800 dark:from-endode-400 dark:to-endode-600 bg-clip-text text-transparent">
                                Endode
                            </span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <ThemeToggle />
                            {auth.user ? (
                                <Link href="/dashboard" className="btn-primary text-sm">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-endode-600 transition-colors">Sign in</Link>
                                    <Link href="/register" className="btn-primary text-sm">Get Started</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-endode-100 dark:bg-endode-900/30 text-endode-700 dark:text-endode-400 mb-6">
                                Ethiopia's Smart Pharmacy Platform
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                Your Health, <br />
                                <span className="bg-gradient-to-r from-endode-500 to-teal-500 bg-clip-text text-transparent">
                                    Simplified
                                </span>
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                Upload prescriptions, search medicines across pharmacies, pay securely with M-Pesa, and pick up with QR verification. All in one platform.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/register" className="btn-primary px-8 py-3 text-base shadow-lg shadow-endode-500/25 hover:shadow-xl hover:shadow-endode-500/30 transition-all">
                                Get Started Free
                            </Link>
                            <Link href="/register?role=pharmacy_owner" className="btn-secondary px-8 py-3 text-base">
                                Register as Pharmacy
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything You Need</h2>
                            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                                Endode connects patients and pharmacies with modern, secure, and intelligent features.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="card p-6 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-endode-100 dark:bg-endode-900/30 flex items-center justify-center mb-4 group-hover:bg-endode-200 dark:group-hover:bg-endode-900/50 transition-colors">
                                        <feat.icon className="h-6 w-6 text-endode-600 dark:text-endode-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feat.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-endode-600 to-teal-600 rounded-3xl p-10 sm:p-16 text-white shadow-2xl"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold">Ready to Get Started?</h2>
                            <p className="mt-4 text-endode-100 text-lg max-w-lg mx-auto">
                                Join thousands of patients and pharmacies already using Endode.
                            </p>
                            <Link href="/register" className="inline-flex mt-8 px-8 py-3 bg-white text-endode-700 font-semibold rounded-xl hover:bg-endode-50 transition-colors shadow-lg">
                                Create Your Account
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
                    <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Endode (እንዶድ). All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

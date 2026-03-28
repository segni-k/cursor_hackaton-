import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, HeartIcon, BoltIcon } from '@heroicons/react/24/outline';
import SectionHeading from '@/Components/Landing/SectionHeading';
import { patientPoints, pharmacyPoints } from '@/Components/Landing/landingData';

export default function DualAudience() {
    return (
        <section id="for-you" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Two sides, one OS"
                    title="Patients & pharmacies — clearly separated in the product"
                    description="Endode keeps patient flows and pharmacy operations in distinct apps. Your admin team can extend the Admin area without touching marketing or storefront routes."
                />
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950 p-8 sm:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-6">
                            <HeartIcon className="h-4 w-4" />
                            Patients
                        </div>
                        <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Care that keeps up</h3>
                        <ul className="space-y-4">
                            {patientPoints.map((p) => (
                                <li key={p} className="flex gap-3">
                                    <CheckCircleIcon className="h-6 w-6 text-endode-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-600 dark:text-slate-400">{p}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" className="inline-flex mt-8 btn-primary px-6 py-3 rounded-xl">
                            Create patient account
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/40 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-semibold mb-6">
                                <BoltIcon className="h-4 w-4 text-emerald-300" />
                                Pharmacies
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-6">Operations that scale</h3>
                            <ul className="space-y-4">
                                {pharmacyPoints.map((p) => (
                                    <li key={p} className="flex gap-3">
                                        <CheckCircleIcon className="h-6 w-6 text-emerald-300 shrink-0 mt-0.5" />
                                        <span className="text-emerald-50/95">{p}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/register?role=pharmacy_owner"
                                className="inline-flex mt-8 px-6 py-3 rounded-xl font-semibold bg-white text-slate-900 hover:bg-emerald-50 transition-colors shadow-lg"
                            >
                                Onboard pharmacy
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

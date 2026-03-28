import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function FinalCta({ title, paymentsMode }) {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[2rem] px-8 py-16 sm:px-14 sm:py-20 text-center border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/90 to-teal-950" />
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)`,
                            backgroundSize: '32px 32px',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-cyan-500/5" />
                    <h2 className="relative font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Ship health commerce on {title}
                    </h2>
                    <p className="relative mt-4 text-lg text-emerald-100/90 max-w-2xl mx-auto">
                        Patients, pharmacies, and (soon) admin — each in their own surface area of the codebase.
                    </p>
                    <div className="relative mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold bg-white text-slate-900 hover:bg-emerald-50 shadow-xl transition-colors"
                        >
                            Get started free
                            <ArrowRightIcon className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold border-2 border-white/25 text-white hover:bg-white/10 transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>
                    {paymentsMode === 'mock' && (
                        <p className="relative mt-8 text-sm text-emerald-200/80 max-w-lg mx-auto">
                            Demo mode: M-Pesa STK simulated. Use <code className="text-xs bg-white/10 px-1 rounded">ENDODE_PAYMENTS_MODE</code> and{' '}
                            <code className="text-xs bg-white/10 px-1 rounded">MPESA_*</code> for Daraja.
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    SparklesIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    BuildingStorefrontIcon,
    QrCodeIcon,
} from '@heroicons/react/24/outline';

export default function StitchHero({ subtitle, tagline }) {
    return (
        <section className="relative min-h-[min(90vh,860px)] flex items-center pt-20 pb-16 overflow-hidden bg-slate-950 text-white">
            {/* Stitch-style mesh + grid (design-tool landing aesthetic) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(16,185,129,0.45),transparent_55%)] animate-mesh" />
                <div className="absolute top-0 right-0 w-[min(100%,720px)] h-[min(100%,720px)] bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_65%)] blur-3xl opacity-90" />
                <div className="absolute bottom-0 left-0 w-[min(100%,560px)] h-[min(100%,560px)] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2),transparent_60%)] blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.07) 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <div className="lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 text-xs font-semibold text-emerald-300/95 backdrop-blur-sm">
                                <SparklesIcon className="h-3.5 w-3.5 text-emerald-400" />
                                {subtitle}
                            </div>
                            <h1 className="mt-6 font-display text-[2.65rem] sm:text-5xl lg:text-6xl xl:text-[3.75rem] font-bold tracking-tight leading-[1.05]">
                                The pharmacy layer{' '}
                                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                                    Ethiopia
                                </span>{' '}
                                deserves.
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
                                {tagline}
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/register"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold bg-white text-slate-900 hover:bg-emerald-50 transition-colors shadow-xl shadow-emerald-500/10 ring-1 ring-white/20"
                                >
                                    Start free
                                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link
                                    href="/register?role=pharmacy_owner"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-colors"
                                >
                                    <BuildingStorefrontIcon className="h-5 w-5 text-emerald-400" />
                                    Pharmacy signup
                                </Link>
                            </div>
                            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
                                {['OCR prescriptions', 'M-Pesa escrow', 'QR handoff'].map((t) => (
                                    <span key={t} className="inline-flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-500/90 shrink-0" />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="lg:col-span-6"
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-[2rem] blur-2xl" />
                            <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10 overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-900/80">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                                        <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono ml-2">app.endode.local</span>
                                </div>
                                <div className="p-6 sm:p-8 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-slate-500">Order pipeline</p>
                                            <p className="text-lg font-semibold text-white mt-0.5">Escrow · Ready · QR</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                            Live
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                        <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse-soft" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                                            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Network</p>
                                            <p className="text-white font-semibold mt-1">Multi-pharmacy</p>
                                        </div>
                                        <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                                            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Payments</p>
                                            <p className="text-white font-semibold mt-1">M-Pesa STK</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-400/20">
                                        <div className="p-2.5 rounded-xl bg-emerald-500/20">
                                            <QrCodeIcon className="h-8 w-8 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Verify at counter</p>
                                            <p className="text-sm text-slate-400">Scan QR → release escrow → receipt</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

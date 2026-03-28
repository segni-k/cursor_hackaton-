import { motion } from 'framer-motion';
import { LockClosedIcon, ShieldCheckIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

export default function SecurityShowcase() {
    return (
        <section id="security" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/50 scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-endode-600 dark:text-emerald-400 mb-3">
                            Trust
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Payments, QR, receipts & audit — one narrative
                        </h2>
                        <p className="mt-6 text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
                            M-Pesa escrow aligns money with pickup. QR verification gives pharmacies a crisp handoff. Digital
                            receipts and audit trails help you resolve issues with evidence.
                        </p>
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950 p-5 flex gap-3">
                                <LockClosedIcon className="h-8 w-8 text-endode-600 dark:text-emerald-400 shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Escrow-first</p>
                                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                        Structured release instead of blind prepay.
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950 p-5 flex gap-3">
                                <ShieldCheckIcon className="h-8 w-8 text-endode-600 dark:text-emerald-400 shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Role dashboards</p>
                                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                        Patients vs pharmacy tools stay separated.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border border-dashed border-endode-300/70 dark:border-emerald-500/30 bg-gradient-to-br from-endode-50/90 to-teal-50/50 dark:from-emerald-950/40 dark:to-slate-950 p-8 sm:p-10"
                    >
                        <div className="flex items-center gap-2 text-endode-800 dark:text-emerald-300 font-semibold mb-6">
                            <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                            Dual language
                        </div>
                        <p className="text-gray-800 dark:text-slate-300 text-lg mb-4">
                            <span className="font-semibold text-gray-900 dark:text-white">English:</span> crisp UI for mixed
                            teams.
                        </p>
                        <p className="text-gray-800 dark:text-slate-300 text-lg leading-relaxed">
                            <span className="font-semibold text-gray-900 dark:text-white">አማርኛ:</span> የጤና ቋንቋዎ በመድሃኒት
                            ፍለጋ፣ ትዕዛዝ እና ክፍያ — አንድ ልምድ።
                        </p>
                        <p className="mt-6 text-sm text-gray-600 dark:text-slate-500">
                            Toggle anytime — driven by <code className="text-xs px-1.5 py-0.5 rounded bg-white/80 dark:bg-white/10">ENDODE_LOCALES</code>.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

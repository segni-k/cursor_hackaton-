import { motion } from 'framer-motion';
import { stats } from '@/Components/Landing/landingData';

export default function StitchStats() {
    return (
        <section className="relative py-14 border-y border-gray-200/80 dark:border-white/5 bg-white dark:bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-r from-endode-50/0 via-endode-50/50 dark:from-slate-900/0 dark:via-emerald-950/20 to-endode-50/0 dark:to-slate-900/0 pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="text-center lg:text-left"
                        >
                            <p className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-br from-endode-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                {s.value}
                            </p>
                            <p className="mt-1 font-semibold text-gray-900 dark:text-white">{s.label}</p>
                            <p className="text-sm text-gray-500 dark:text-slate-400">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import SectionHeading from '@/Components/Landing/SectionHeading';
import { steps } from '@/Components/Landing/landingData';

export default function ProcessSteps() {
    return (
        <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900/40 scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Flow"
                    title="From search to verified pickup"
                    description="A patient journey that mirrors how pharmacies fulfill — orders, inventory, and analytics stay in sync."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.n}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group relative rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-slate-950/80 p-6 shadow-sm hover:shadow-xl hover:shadow-endode-500/5 dark:hover:shadow-emerald-500/5 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <span className="absolute top-4 right-4 font-display text-5xl font-black text-gray-100 dark:text-white/[0.04] select-none">
                                {step.n}
                            </span>
                            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-endode-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/10 flex items-center justify-center mb-5 ring-1 ring-black/5 dark:ring-white/10 group-hover:scale-105 transition-transform">
                                <step.Icon className="h-6 w-6 text-endode-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

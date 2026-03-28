import { motion } from 'framer-motion';
import SectionHeading from '@/Components/Landing/SectionHeading';
import { testimonials } from '@/Components/Landing/landingData';

export default function VoicesGrid() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-gray-200/80 dark:border-white/5 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Voices"
                    title="Designed to feel inevitable"
                    description="Demo quotes — swap for real customers as you launch."
                />
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.figure
                            key={t.name}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="relative rounded-2xl border border-gray-200/90 dark:border-white/10 bg-gray-50/80 dark:bg-slate-900/60 p-8 overflow-hidden"
                        >
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-endode-400/10 dark:bg-emerald-500/10 blur-2xl" />
                            <blockquote className="relative text-gray-700 dark:text-slate-300 leading-relaxed">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <figcaption className="relative mt-6 pt-6 border-t border-gray-200/80 dark:border-white/10">
                                <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                                <p className="text-sm text-gray-500 dark:text-slate-500">{t.role}</p>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

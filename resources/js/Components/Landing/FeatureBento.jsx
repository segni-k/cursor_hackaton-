import { motion } from 'framer-motion';
import SectionHeading from '@/Components/Landing/SectionHeading';
import { iconMap } from '@/Components/Landing/landingData';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function FeatureBento({ title, mvpFeatures }) {
    return (
        <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    eyebrow="Depth"
                    title="Everything in the Endode MVP"
                    description={`${title} ships with a full module set — configurable via your environment. This grid mirrors your product configuration.`}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {mvpFeatures.map((feat, i) => {
                        const Icon = iconMap[feat.icon] || DocumentTextIcon;
                        const isLead = i === 0;
                        return (
                            <motion.div
                                key={`${feat.title}-${i}`}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: Math.min(i * 0.03, 0.35) }}
                                className={`group relative rounded-2xl border border-gray-200/90 dark:border-white/10 bg-gradient-to-br from-white to-gray-50/80 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-7 overflow-hidden hover:shadow-2xl hover:shadow-endode-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300 ${
                                    isLead ? 'sm:col-span-2 min-h-[240px] lg:min-h-[280px]' : ''
                                }`}
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-endode-400/10 to-transparent dark:from-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div
                                    className={`inline-flex rounded-2xl bg-gradient-to-br from-endode-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/10 p-3 mb-4 ring-1 ring-black/5 dark:ring-white/10 ${
                                        isLead ? 'scale-110' : ''
                                    }`}
                                >
                                    <Icon className={`text-endode-600 dark:text-emerald-400 ${isLead ? 'h-8 w-8' : 'h-6 w-6'}`} />
                                </div>
                                <h3
                                    className={`font-bold text-gray-900 dark:text-white leading-snug ${
                                        isLead ? 'text-xl sm:text-2xl max-w-lg' : 'text-lg'
                                    }`}
                                >
                                    {feat.title}
                                </h3>
                                <p
                                    className={`mt-2 text-gray-600 dark:text-slate-400 leading-relaxed ${
                                        isLead ? 'text-base max-w-2xl' : 'text-sm'
                                    }`}
                                >
                                    {feat.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

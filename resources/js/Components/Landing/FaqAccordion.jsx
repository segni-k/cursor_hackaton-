import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import SectionHeading from '@/Components/Landing/SectionHeading';
import { faqItems } from '@/Components/Landing/landingData';

function FaqRow({ item, isOpen, onToggle }) {
    return (
        <div className="border-b border-gray-200 dark:border-white/10 last:border-0">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">{item.q}</span>
                <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-endode-600 dark:text-emerald-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && <p className="pb-5 text-gray-600 dark:text-slate-400 leading-relaxed">{item.a}</p>}
        </div>
    );
}

export default function FaqAccordion() {
    const [open, setOpen] = useState(0);

    return (
        <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-28">
            <div className="max-w-3xl mx-auto">
                <SectionHeading eyebrow="FAQ" title="Questions, answered" description="Straight answers — tune for your GTM." />
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/80 px-6 sm:px-8 shadow-xl shadow-gray-200/30 dark:shadow-none">
                    {faqItems.map((item, i) => (
                        <FaqRow key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
                    ))}
                </div>
            </div>
        </section>
    );
}

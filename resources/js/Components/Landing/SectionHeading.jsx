export default function SectionHeading({ eyebrow, title, description, id, align = 'center', dark = false }) {
    const alignCls = align === 'left' ? 'text-left mx-0' : 'text-center max-w-3xl mx-auto';

    return (
        <div id={id} className={`${alignCls} mb-12 sm:mb-16 scroll-mt-28`}>
            {eyebrow && (
                <p
                    className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${
                        dark ? 'text-emerald-300/90' : 'text-endode-600 dark:text-endode-400'
                    }`}
                >
                    {eyebrow}
                </p>
            )}
            <h2
                className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                    dark ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={`mt-4 text-lg max-w-2xl leading-relaxed ${
                        align === 'center' ? 'mx-auto' : ''
                    } ${dark ? 'text-slate-300' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

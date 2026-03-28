import { router, usePage } from '@inertiajs/react';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitcher() {
    const { locale } = usePage().props;
    const current = locale || 'en';

    const toggle = () => {
        const next = current === 'en' ? 'am' : 'en';
        router.post('/locale', { locale: next }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={current === 'en' ? 'Switch to Amharic' : 'Switch to English'}
        >
            <LanguageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{current === 'en' ? 'EN' : 'አማ'}</span>
        </button>
    );
}

import { usePage } from '@inertiajs/react';
import en from '@/i18n/en.json';
import am from '@/i18n/am.json';

const translations = { en, am };

export default function useTranslation() {
    const { locale } = usePage().props;
    const lang = locale || 'en';
    const dict = translations[lang] || translations.en;

    const t = (key) => {
        const keys = key.split('.');
        let value = dict;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return { t, locale: lang };
}

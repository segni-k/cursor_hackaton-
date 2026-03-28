import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-gray-50 via-white to-endode-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-endode-400 to-endode-600 rounded-2xl flex items-center justify-center shadow-lg shadow-endode-500/25">
                        <span className="text-2xl font-bold text-white">እ</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-endode-600 to-endode-800 dark:from-endode-400 dark:to-endode-600 bg-clip-text text-transparent">
                        Endode
                    </span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 sm:rounded-2xl border border-gray-100 dark:border-gray-700"
            >
                {children}
            </motion.div>
        </div>
    );
}

import { motion, AnimatePresence } from 'framer-motion';

export default function InputError({ message, className = '' }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`text-sm text-red-600 dark:text-red-400 mt-1 ${className}`}
                >
                    {message}
                </motion.p>
            )}
        </AnimatePresence>
    );
}

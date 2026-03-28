import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Toast({ flash }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (flash?.success) {
            setMessage({ type: 'success', text: flash.success });
            setVisible(true);
        } else if (flash?.error) {
            setMessage({ type: 'error', text: flash.error });
            setVisible(true);
        } else if (flash?.status) {
            setMessage({ type: 'info', text: flash.status });
            setVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const icons = {
        success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
        error: <XCircleIcon className="h-5 w-5 text-red-500" />,
        info: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
    };

    const bgColors = {
        success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
        error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
        info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className={`fixed top-4 left-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColors[message.type]}`}
                >
                    {icons[message.type]}
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{message.text}</p>
                    <button onClick={() => setVisible(false)} className="ml-2 text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 px-4"
        >
            {Icon && (
                <div className="mb-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
                    <Icon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </motion.div>
    );
}

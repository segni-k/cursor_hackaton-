import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'endode', delay = 0 }) {
    const colorClasses = {
        endode: 'bg-endode-50 dark:bg-endode-900/20 text-endode-600 dark:text-endode-400',
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
        red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1, duration: 0.4 }}
            className="card p-6 hover:shadow-md transition-shadow duration-300"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    {trend && (
                        <p className={`mt-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {trend === 'up' ? '↑' : '↓'} {trendValue}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

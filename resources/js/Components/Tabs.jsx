import { motion } from 'framer-motion';

export default function Tabs({ tabs, activeTab, onChange }) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`relative py-3 text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? 'text-endode-600 dark:text-endode-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            {tab.icon && <tab.icon className="h-4 w-4" />}
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                    {tab.count}
                                </span>
                            )}
                        </span>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-endode-600 dark:bg-endode-400 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
}

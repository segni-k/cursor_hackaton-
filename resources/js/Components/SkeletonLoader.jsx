export default function SkeletonLoader({ className = '', count = 1, type = 'line' }) {
    const skeletons = Array.from({ length: count });

    if (type === 'card') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skeletons.map((_, i) => (
                    <div key={i} className="card p-6 animate-pulse">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2 flex-1">
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            </div>
                            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'table') {
        return (
            <div className="card overflow-hidden animate-pulse">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                </div>
                {skeletons.map((_, i) => (
                    <div key={i} className="px-6 py-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-700/50">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`animate-pulse space-y-3 ${className}`}>
            {skeletons.map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
        </div>
    );
}

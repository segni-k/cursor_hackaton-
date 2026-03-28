import { Link } from '@inertiajs/react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function Breadcrumbs({ items = [] }) {
    return (
        <nav className="flex items-center gap-1.5 text-sm mb-4">
            <Link href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <HomeIcon className="h-4 w-4" />
            </Link>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <ChevronRightIcon className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
                    {item.href ? (
                        <Link href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}

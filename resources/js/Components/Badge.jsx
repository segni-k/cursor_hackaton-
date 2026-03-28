const variants = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    endode: 'bg-endode-100 text-endode-800 dark:bg-endode-900/30 dark:text-endode-400',
};

export default function Badge({ children, variant = 'default', className = '', dot = false }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${
                    variant === 'success' ? 'bg-green-500' :
                    variant === 'warning' ? 'bg-amber-500' :
                    variant === 'danger' ? 'bg-red-500' :
                    variant === 'info' ? 'bg-blue-500' :
                    variant === 'endode' ? 'bg-endode-500' :
                    'bg-gray-500'
                }`} />
            )}
            {children}
        </span>
    );
}

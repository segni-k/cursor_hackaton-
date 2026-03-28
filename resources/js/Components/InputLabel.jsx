export default function InputLabel({ value, className = '', children, required = false, ...props }) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ` + className}
        >
            {value || children}
            {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
    );
}

import { motion } from 'framer-motion';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            {...props}
            className={`btn-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}

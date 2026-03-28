import { forwardRef } from 'react';

const SelectInput = forwardRef(({ className = '', children, ...props }, ref) => {
    return (
        <select
            {...props}
            ref={ref}
            className={
                'input-field w-full px-4 py-2.5 text-sm transition-all duration-200 ' +
                className
            }
        >
            {children}
        </select>
    );
});

SelectInput.displayName = 'SelectInput';
export default SelectInput;

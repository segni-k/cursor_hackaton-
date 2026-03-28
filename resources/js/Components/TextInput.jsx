import { forwardRef, useRef, useEffect } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    const inputRef = ref || useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={inputRef}
            className={
                'input-field w-full px-4 py-2.5 text-sm transition-all duration-200 ' +
                className
            }
        />
    );
});

TextInput.displayName = 'TextInput';
export default TextInput;

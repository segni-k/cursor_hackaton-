import { useState, useRef } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUpload({ onFileSelect, accept = 'image/*', maxSize = 5, preview = true, className = '' }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef();

    const handleFile = (f) => {
        if (f.size > maxSize * 1024 * 1024) {
            alert(`File size must be under ${maxSize}MB`);
            return;
        }
        setFile(f);
        onFileSelect?.(f);
        if (preview && f.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(f));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const clear = () => {
        setFile(null);
        setPreviewUrl(null);
        onFileSelect?.(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className={className}>
            <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive
                        ? 'border-endode-500 bg-endode-50 dark:bg-endode-900/10'
                        : 'border-gray-300 dark:border-gray-600 hover:border-endode-400 dark:hover:border-endode-500'
                }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                <AnimatePresence mode="wait">
                    {previewUrl ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative inline-block"
                        >
                            <img src={previewUrl} alt="Preview" className="max-h-40 rounded-lg mx-auto" />
                            <button
                                onClick={(e) => { e.stopPropagation(); clear(); }}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <CloudArrowUpIcon className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold text-endode-600 dark:text-endode-400">Click to upload</span> or drag and drop
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                Max {maxSize}MB
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {file && !previewUrl && (
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                        <button onClick={(e) => { e.stopPropagation(); clear(); }} className="text-red-500 hover:text-red-600">
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

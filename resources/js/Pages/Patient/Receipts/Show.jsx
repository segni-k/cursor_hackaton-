import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';

export default function Show({ receipt }) {
    const data = receipt.data || {};

    return (
        <AuthenticatedLayout header={`Receipt ${data.receipt_number}`}>
            <Head title={`Receipt ${data.receipt_number}`} />

            <div className="max-w-2xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-endode-100 dark:bg-endode-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-lg font-bold text-endode-600">እ</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Endode Receipt</h2>
                        <p className="text-sm text-gray-500 mt-1">{data.receipt_number}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{data.date}</p>
                    </div>

                    <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 space-y-2">
                        {data.items?.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{item.medicine} x{item.quantity}</span>
                                <span className="text-gray-900 dark:text-white">ETB {item.subtotal}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 text-lg font-bold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-endode-600">ETB {data.total}</span>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-sm space-y-1">
                        <p><span className="text-gray-500">Pharmacy:</span> <span className="text-gray-900 dark:text-white">{data.pharmacy?.name}</span></p>
                        <p><span className="text-gray-500">Address:</span> <span className="text-gray-900 dark:text-white">{data.pharmacy?.address}</span></p>
                        <p><span className="text-gray-500">Payment:</span> <span className="text-gray-900 dark:text-white">{data.payment?.method} ({data.payment?.status})</span></p>
                    </div>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}

import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Badge from '@/Components/Badge';
import { motion } from 'framer-motion';

const statusVariant = {
    pending: 'warning', confirmed: 'info', ready: 'endode', completed: 'success', cancelled: 'danger',
};

export default function Show({ order }) {
    return (
        <AuthenticatedLayout header={`Order #${order.id}`}>
            <Head title={`Order #${order.id}`} />
            <Breadcrumbs items={[{ label: 'Orders', href: '/patient/orders' }, { label: `#${order.id}` }]} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Items</h2>
                            <Badge variant={statusVariant[order.status]} dot>{order.status}</Badge>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {order.items?.map(item => (
                                <div key={item.id} className="py-3 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.medicine?.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity} x ETB {item.unit_price}</p>
                                    </div>
                                    <span className="font-semibold text-gray-900 dark:text-white">ETB {item.subtotal}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                            <span className="text-xl font-bold text-endode-600">ETB {order.total_amount}</span>
                        </div>
                    </div>

                    {order.qr_code && ['confirmed', 'ready'].includes(order.status) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your QR Code</h3>
                            <p className="text-sm text-gray-500 mb-4">Show this to the pharmacy to pick up your order.</p>
                            <div className="inline-block p-4 bg-white rounded-xl shadow-inner">
                                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-mono break-all p-2 rounded">
                                    {order.qr_code}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="card p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Pharmacy</h3>
                        <p className="text-gray-600 dark:text-gray-400">{order.pharmacy?.name}</p>
                        {order.pharmacy?.address && <p className="text-sm text-gray-500 mt-1">{order.pharmacy.address}</p>}
                    </div>

                    {order.payment && (
                        <div className="card p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">Status</span><Badge variant={order.payment.status === 'released' ? 'success' : order.payment.status === 'failed' ? 'danger' : 'warning'}>{order.payment.status}</Badge></div>
                                <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-medium text-gray-900 dark:text-white">ETB {order.payment.amount}</span></div>
                                {order.payment.mpesa_receipt_number && <div className="flex justify-between"><span className="text-gray-500">Receipt</span><span className="font-mono text-xs">{order.payment.mpesa_receipt_number}</span></div>}
                            </div>
                        </div>
                    )}

                    {order.notes && (
                        <div className="card p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Notes</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import Tabs from '@/Components/Tabs';
import EmptyState from '@/Components/EmptyState';
import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, QrCodeIcon } from '@heroicons/react/24/outline';

const statusVariant = { pending: 'warning', confirmed: 'info', ready: 'endode', completed: 'success', cancelled: 'danger' };

const tabs = [
    { id: '', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'ready', label: 'Ready' },
    { id: 'completed', label: 'Completed' },
];

export default function Index({ orders, currentStatus }) {
    return (
        <AuthenticatedLayout header="Orders">
            <Head title="Orders" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Tabs tabs={tabs} activeTab={currentStatus || ''} onChange={(status) => router.get('/pharmacy/orders', status ? { status } : {}, { preserveState: true })} />
                    <Link href="/pharmacy/orders/scanner" className="btn-primary flex items-center gap-2">
                        <QrCodeIcon className="h-4 w-4" /> QR Scanner
                    </Link>
                </div>

                {orders?.data?.length === 0 ? (
                    <EmptyState icon={ClipboardDocumentListIcon} title="No orders" description="Orders from patients will appear here." />
                ) : (
                    <div className="space-y-3">
                        {orders?.data?.map((order, i) => (
                            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                                <Link href={`/pharmacy/orders/${order.id}`} className="card block p-5 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {order.patient?.name} &middot; {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white">ETB {order.total_amount}</p>
                                            <Badge variant={statusVariant[order.status]} dot className="mt-1">{order.status}</Badge>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{order.items?.length || 0} item(s)</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

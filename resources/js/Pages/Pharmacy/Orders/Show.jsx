import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Badge from '@/Components/Badge';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

const statusVariant = { pending: 'warning', confirmed: 'info', ready: 'endode', completed: 'success', cancelled: 'danger' };

export default function Show({ order }) {
    const updateStatus = (status) => {
        router.patch(`/pharmacy/orders/${order.id}/status`, { status }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout header={`Order #${order.id}`}>
            <Head title={`Order #${order.id}`} />
            <Breadcrumbs items={[{ label: 'Orders', href: '/pharmacy/orders' }, { label: `#${order.id}` }]} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Items</h2>
                            <Badge variant={statusVariant[order.status]} dot>{order.status}</Badge>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {order.items?.map(item => (
                                <div key={item.id} className="py-3 flex justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.medicine?.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity} x ETB {item.unit_price}</p>
                                    </div>
                                    <span className="font-semibold">ETB {item.subtotal}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="text-xl font-bold text-endode-600">ETB {order.total_amount}</span>
                        </div>
                    </div>

                    {['pending', 'confirmed', 'ready'].includes(order.status) && (
                        <div className="card p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>
                            <div className="flex gap-3 flex-wrap">
                                {order.status === 'pending' && (
                                    <>
                                        <PrimaryButton onClick={() => updateStatus('confirmed')}>Accept Order</PrimaryButton>
                                        <DangerButton onClick={() => updateStatus('cancelled')}>Reject</DangerButton>
                                    </>
                                )}
                                {order.status === 'confirmed' && (
                                    <PrimaryButton onClick={() => updateStatus('ready')}>Mark Ready</PrimaryButton>
                                )}
                                {order.status === 'ready' && (
                                    <PrimaryButton onClick={() => updateStatus('completed')}>Mark Completed</PrimaryButton>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="card p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Patient</h3>
                        <p className="text-gray-700 dark:text-gray-300">{order.patient?.name}</p>
                        <p className="text-sm text-gray-500">{order.patient?.email}</p>
                    </div>

                    {order.payment && (
                        <div className="card p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status</span>
                                    <Badge variant={order.payment.status === 'released' ? 'success' : order.payment.status === 'failed' ? 'danger' : 'warning'}>{order.payment.status}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount</span>
                                    <span>ETB {order.payment.amount}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {order.qr_code && (
                        <div className="card p-6 text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">QR Code</h3>
                            <div className="inline-block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-xs font-mono break-all text-gray-600 dark:text-gray-400">{order.qr_code}</p>
                            </div>
                            {order.qr_verified_at && (
                                <p className="text-sm text-green-600 mt-2">Verified: {new Date(order.qr_verified_at).toLocaleString()}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

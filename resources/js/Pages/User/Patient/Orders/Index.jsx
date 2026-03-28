import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const statusVariant = {
    pending: 'warning', confirmed: 'info', ready: 'endode', completed: 'success', cancelled: 'danger',
};

export default function Index({ orders }) {
    return (
        <AuthenticatedLayout header="My Orders">
            <Head title="Orders" />

            {orders?.data?.length === 0 ? (
                <EmptyState icon={ShoppingCartIcon} title="No orders yet" description="Search medicines and place your first order." action={<Link href="/patient/medicines" className="btn-primary">Browse Medicines</Link>} />
            ) : (
                <div className="space-y-3">
                    {orders?.data?.map((order, i) => (
                        <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                            <Link href={`/patient/orders/${order.id}`} className="card block p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{order.pharmacy?.name} &middot; {new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">ETB {order.total_amount}</p>
                                        <Badge variant={statusVariant[order.status]} dot className="mt-1">{order.status}</Badge>
                                    </div>
                                </div>
                                {order.items?.length > 0 && (
                                    <p className="mt-2 text-xs text-gray-400">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}

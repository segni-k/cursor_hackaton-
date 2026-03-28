import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import Badge from '@/Components/Badge';
import { motion } from 'framer-motion';
import {
    ShoppingCartIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-endode-500 to-endode-700 rounded-2xl p-6 text-white shadow-lg"
                >
                    <h2 className="text-2xl font-bold">Welcome back, {auth.user?.name}!</h2>
                    <p className="mt-1 text-endode-100">Manage your prescriptions, orders, and payments all in one place.</p>
                    <div className="mt-4 flex gap-3">
                        <Link href="/patient/medicines" className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                            Search Medicines
                        </Link>
                        <Link href="/patient/prescriptions" className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                            Upload Prescription
                        </Link>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Orders" value={stats?.total_orders || 0} icon={ShoppingCartIcon} color="endode" delay={0} />
                    <StatCard title="Total Spent" value={`ETB ${stats?.total_spent || '0.00'}`} icon={CurrencyDollarIcon} color="blue" delay={1} />
                    <StatCard title="Active Orders" value={stats?.active_orders || 0} icon={ClockIcon} color="amber" delay={2} />
                    <StatCard title="Prescriptions" value={stats?.recent_orders?.length || 0} icon={DocumentTextIcon} color="purple" delay={3} />
                </div>

                {stats?.recent_orders?.length > 0 && (
                    <div className="card">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                            <Link href="/patient/orders" className="text-sm text-endode-600 dark:text-endode-400 hover:text-endode-700 font-medium">
                                View all
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {stats.recent_orders.map((order, i) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Order #{order.id}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {order.pharmacy?.name}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            ETB {order.total_amount}
                                        </span>
                                        <Badge variant={
                                            order.status === 'completed' ? 'success' :
                                            order.status === 'cancelled' ? 'danger' :
                                            order.status === 'ready' ? 'info' :
                                            'warning'
                                        } dot>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

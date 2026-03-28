import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import { motion } from 'framer-motion';
import {
    CurrencyDollarIcon,
    ShoppingCartIcon,
    ArchiveBoxIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats, inventoryStats }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout header="Pharmacy Dashboard">
            <Head title="Pharmacy Dashboard" />

            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-endode-600 via-endode-700 to-teal-700 rounded-2xl p-6 text-white shadow-lg"
                >
                    <h2 className="text-2xl font-bold">Welcome, {auth.user?.name}</h2>
                    <p className="mt-1 text-endode-100">Here's an overview of your pharmacy performance.</p>
                    <div className="mt-4 flex gap-3 flex-wrap">
                        <Link href="/pharmacy/inventory" className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition backdrop-blur-sm">
                            Manage Inventory
                        </Link>
                        <Link href="/pharmacy/orders" className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition backdrop-blur-sm">
                            View Orders
                        </Link>
                        <Link href="/pharmacy/orders/scanner" className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition backdrop-blur-sm">
                            QR Scanner
                        </Link>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Revenue" value={`ETB ${stats?.total_revenue || '0.00'}`} icon={CurrencyDollarIcon} color="endode" delay={0} />
                    <StatCard title="Total Orders" value={stats?.total_orders || 0} icon={ShoppingCartIcon} color="blue" delay={1} />
                    <StatCard title="Pending Orders" value={stats?.pending_orders || 0} icon={ClockIcon} color="amber" delay={2} />
                    <StatCard title="Fulfillment Rate" value={`${stats?.fulfillment_rate || 0}%`} icon={CheckCircleIcon} color="purple" delay={3} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Medicines" value={inventoryStats?.total || 0} icon={ArchiveBoxIcon} color="blue" delay={4} />
                    <StatCard title="In Stock" value={inventoryStats?.in_stock || 0} icon={CheckCircleIcon} color="endode" delay={5} />
                    <StatCard title="Low Stock" value={inventoryStats?.low_stock || 0} icon={ExclamationTriangleIcon} color="amber" delay={6} />
                    <StatCard title="Out of Stock" value={inventoryStats?.out_of_stock || 0} icon={ExclamationTriangleIcon} color="red" delay={7} />
                </div>

                {stats?.top_medicines?.length > 0 && (
                    <div className="card">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Medicines</h3>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {stats.top_medicines.slice(0, 5).map((med, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-6 py-3 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-endode-100 dark:bg-endode-900/30 text-endode-600 dark:text-endode-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{med.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">ETB {med.total_revenue}</p>
                                        <p className="text-xs text-gray-500">{med.total_sold} sold</p>
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

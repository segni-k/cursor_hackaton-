import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import { motion } from 'framer-motion';
import {
    CurrencyDollarIcon,
    ShoppingCartIcon,
    CheckCircleIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export default function Index({ stats, inventoryStats }) {
    const pieData = [
        { name: 'In Stock', value: inventoryStats?.in_stock || 0 },
        { name: 'Low Stock', value: inventoryStats?.low_stock || 0 },
        { name: 'Out of Stock', value: inventoryStats?.out_of_stock || 0 },
    ].filter(d => d.value > 0);

    const monthlyData = (stats?.monthly_revenue || []).map(m => ({
        month: m.month,
        revenue: parseFloat(m.revenue),
        orders: m.orders,
    }));

    return (
        <AuthenticatedLayout header="Analytics">
            <Head title="Analytics" />

            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Revenue" value={`ETB ${stats?.total_revenue || '0.00'}`} icon={CurrencyDollarIcon} color="endode" delay={0} />
                    <StatCard title="Total Orders" value={stats?.total_orders || 0} icon={ShoppingCartIcon} color="blue" delay={1} />
                    <StatCard title="Completed" value={stats?.completed_orders || 0} icon={CheckCircleIcon} color="purple" delay={2} />
                    <StatCard title="Fulfillment" value={`${stats?.fulfillment_rate || 0}%`} icon={ArchiveBoxIcon} color="amber" delay={3} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {monthlyData.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value) => [`ETB ${value}`, 'Revenue']} />
                                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>
                    )}

                    {pieData.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stock Overview</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2">
                                {pieData.map((d, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                        {d.name}: {d.value}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {stats?.top_medicines?.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Medicines</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Medicine</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Sold</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                    {stats.top_medicines.map((med, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                            <td className="px-6 py-3 text-sm text-gray-500">{i + 1}</td>
                                            <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">{med.name}</td>
                                            <td className="px-6 py-3 text-sm text-right text-gray-900 dark:text-white">{med.total_sold}</td>
                                            <td className="px-6 py-3 text-sm text-right font-semibold text-endode-600">ETB {med.total_revenue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

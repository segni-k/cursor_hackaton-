import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';
import StatCard from '@/Components/StatCard';
import Badge from '@/Components/Badge';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const statusVariant = { pending: 'warning', escrowed: 'info', released: 'success', failed: 'danger', refunded: 'default' };

export default function Index({ payments, totalEarnings }) {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'amount', label: 'Amount', render: (v) => `ETB ${v}` },
        { key: 'status', label: 'Status', render: (v) => <Badge variant={statusVariant[v]} dot>{v}</Badge> },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v).toLocaleDateString() },
    ];

    return (
        <AuthenticatedLayout header="Earnings">
            <Head title="Payments" />

            <div className="space-y-6">
                <StatCard title="Total Earnings" value={`ETB ${totalEarnings || '0.00'}`} icon={CurrencyDollarIcon} color="endode" />
                <DataTable columns={columns} data={payments?.data || []} pagination={payments} emptyMessage="No payments yet." />
            </div>
        </AuthenticatedLayout>
    );
}

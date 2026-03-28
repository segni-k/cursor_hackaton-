import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const statusVariant = { pending: 'warning', escrowed: 'info', released: 'success', failed: 'danger', refunded: 'default' };

export default function Index({ payments }) {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'amount', label: 'Amount', render: (v) => `ETB ${v}` },
        { key: 'status', label: 'Status', render: (v) => <Badge variant={statusVariant[v]} dot>{v}</Badge> },
        { key: 'mpesa_receipt_number', label: 'M-Pesa Receipt', render: (v) => v || '-' },
        { key: 'created_at', label: 'Date', render: (v) => new Date(v).toLocaleDateString() },
    ];

    return (
        <AuthenticatedLayout header="Payments">
            <Head title="Payments" />
            {payments?.data?.length === 0 ? (
                <EmptyState icon={CreditCardIcon} title="No payments yet" description="Your payment history will appear here." />
            ) : (
                <DataTable columns={columns} data={payments?.data || []} pagination={payments} />
            )}
        </AuthenticatedLayout>
    );
}

import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';
import Badge from '@/Components/Badge';
import StatCard from '@/Components/StatCard';
import PrimaryButton from '@/Components/PrimaryButton';
import { ArchiveBoxIcon, PlusIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Index({ medicines, categories, stats, filters }) {
    const columns = [
        { key: 'name', label: 'Medicine', render: (v, row) => (
            <div>
                <p className="font-medium text-gray-900 dark:text-white">{v}</p>
                {row.category && <p className="text-xs text-gray-500">{row.category.name}</p>}
            </div>
        )},
        { key: 'price', label: 'Price', render: (v) => `ETB ${v}` },
        { key: 'stock_quantity', label: 'Stock', render: (v, row) => (
            <Badge variant={v === 0 ? 'danger' : v <= (row.low_stock_threshold || 10) ? 'warning' : 'success'} dot>
                {v}
            </Badge>
        )},
        { key: 'is_active', label: 'Status', render: (v) => (
            <Badge variant={v ? 'success' : 'default'}>{v ? 'Active' : 'Inactive'}</Badge>
        )},
        { key: 'id', label: '', sortable: false, render: (v) => (
            <Link href={`/pharmacy/inventory/${v}/edit`} className="text-endode-600 hover:text-endode-700 text-sm font-medium">Edit</Link>
        )},
    ];

    return (
        <AuthenticatedLayout header="Inventory">
            <Head title="Inventory" />

            <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total" value={stats?.total || 0} icon={ArchiveBoxIcon} color="blue" delay={0} />
                    <StatCard title="In Stock" value={stats?.in_stock || 0} icon={CheckCircleIcon} color="endode" delay={1} />
                    <StatCard title="Low Stock" value={stats?.low_stock || 0} icon={ExclamationTriangleIcon} color="amber" delay={2} />
                    <StatCard title="Out of Stock" value={stats?.out_of_stock || 0} icon={XCircleIcon} color="red" delay={3} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="flex gap-3 flex-1 w-full sm:w-auto">
                        <SearchInput
                            value={filters?.search || ''}
                            onSearch={(v) => router.get('/pharmacy/inventory', { ...filters, search: v || undefined }, { preserveState: true })}
                            placeholder="Search medicines..."
                            className="flex-1"
                        />
                        <SelectInput
                            value={filters?.stock_status || ''}
                            onChange={(e) => router.get('/pharmacy/inventory', { ...filters, stock_status: e.target.value || undefined }, { preserveState: true })}
                            className="w-40"
                        >
                            <option value="">All Stock</option>
                            <option value="in">In Stock</option>
                            <option value="low">Low Stock</option>
                            <option value="out">Out of Stock</option>
                        </SelectInput>
                    </div>
                    <Link href="/pharmacy/inventory/create">
                        <PrimaryButton className="flex items-center gap-2">
                            <PlusIcon className="h-4 w-4" /> Add Medicine
                        </PrimaryButton>
                    </Link>
                </div>

                <DataTable columns={columns} data={medicines?.data || []} pagination={medicines} />
            </div>
        </AuthenticatedLayout>
    );
}

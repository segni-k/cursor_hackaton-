import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function Index({ medicines, categories, filters }) {
    const [showFilters, setShowFilters] = useState(false);

    const applyFilter = (key, value) => {
        router.get('/patient/medicines', { ...filters, [key]: value || undefined }, {
            preserveState: true, preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout header="Search Medicines">
            <Head title="Medicines" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <SearchInput
                        value={filters?.search || ''}
                        onSearch={(v) => applyFilter('search', v)}
                        placeholder="Search medicines by name..."
                        className="flex-1"
                    />
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <FunnelIcon className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="card p-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <SelectInput value={filters?.category_id || ''} onChange={(e) => applyFilter('category_id', e.target.value)}>
                                <option value="">All Categories</option>
                                {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </SelectInput>
                            <SelectInput value={filters?.in_stock || ''} onChange={(e) => applyFilter('in_stock', e.target.value)}>
                                <option value="">All Availability</option>
                                <option value="1">In Stock Only</option>
                            </SelectInput>
                            <SelectInput value={filters?.sort || 'name'} onChange={(e) => applyFilter('sort', e.target.value)}>
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="created_at">Sort by Newest</option>
                            </SelectInput>
                        </div>
                    </motion.div>
                )}

                {medicines?.data?.length === 0 ? (
                    <EmptyState icon={MagnifyingGlassIcon} title="No medicines found" description="Try adjusting your search or filters." />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {medicines?.data?.map((med, i) => (
                            <motion.div
                                key={med.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/patient/medicines/${med.id}`} className="card block hover:shadow-lg transition-shadow duration-300 group">
                                    {med.image && (
                                        <div className="h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                            <img src={`/storage/${med.image}`} alt={med.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-endode-600 dark:group-hover:text-endode-400 transition-colors">{med.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{med.pharmacy?.name}</p>
                                            </div>
                                            <span className="text-lg font-bold text-endode-600 dark:text-endode-400">ETB {med.price}</span>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <Badge variant={med.stock_quantity > 0 ? (med.stock_quantity <= (med.low_stock_threshold || 10) ? 'warning' : 'success') : 'danger'} dot>
                                                {med.stock_quantity > 0 ? `${med.stock_quantity} in stock` : 'Out of stock'}
                                            </Badge>
                                            {med.requires_prescription && <Badge variant="info">Rx Required</Badge>}
                                        </div>
                                        {med.category && (
                                            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{med.category.name}</p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {medicines?.links && medicines.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {medicines.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} className={`px-3 py-1.5 text-sm rounded-lg ${link.active ? 'bg-endode-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-300 cursor-not-allowed'}`} preserveScroll dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/SearchInput';
import EmptyState from '@/Components/EmptyState';
import Badge from '@/Components/Badge';
import { motion } from 'framer-motion';
import { BuildingStorefrontIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Index({ pharmacies, filters }) {
    return (
        <AuthenticatedLayout header="Pharmacies">
            <Head title="Pharmacies" />

            <div className="space-y-6">
                <SearchInput
                    value={filters?.search || ''}
                    onSearch={(v) => router.get('/patient/pharmacies', { search: v || undefined }, { preserveState: true })}
                    placeholder="Search pharmacies..."
                />

                {pharmacies?.data?.length === 0 ? (
                    <EmptyState icon={BuildingStorefrontIcon} title="No pharmacies found" description="Try a different search term." />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pharmacies?.data?.map((pharmacy, i) => (
                            <motion.div key={pharmacy.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Link href={`/patient/pharmacies/${pharmacy.id}`} className="card block p-6 hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-endode-400 to-endode-600 flex items-center justify-center shrink-0 shadow-md">
                                            {pharmacy.logo ? (
                                                <img src={`/storage/${pharmacy.logo}`} alt={pharmacy.name} className="w-full h-full rounded-xl object-cover" />
                                            ) : (
                                                <BuildingStorefrontIcon className="h-7 w-7 text-white" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-endode-600 dark:group-hover:text-endode-400 truncate transition-colors">
                                                {pharmacy.name}
                                            </h3>
                                            {pharmacy.address && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                                                    <MapPinIcon className="h-3.5 w-3.5 shrink-0" /> {pharmacy.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <Badge variant={pharmacy.medicines_count > 0 ? 'success' : 'default'} dot>
                                            {pharmacy.medicines_count || 0} medicines available
                                        </Badge>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

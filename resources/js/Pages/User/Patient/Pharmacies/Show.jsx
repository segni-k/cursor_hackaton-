import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Badge from '@/Components/Badge';
import { motion } from 'framer-motion';
import { BuildingStorefrontIcon, MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Show({ pharmacy, medicines }) {
    return (
        <AuthenticatedLayout header={pharmacy.name}>
            <Head title={pharmacy.name} />
            <Breadcrumbs items={[{ label: 'Pharmacies', href: '/patient/pharmacies' }, { label: pharmacy.name }]} />

            <div className="space-y-6">
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-endode-400 to-endode-600 flex items-center justify-center shadow-md">
                            <BuildingStorefrontIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pharmacy.name}</h1>
                            {pharmacy.name_am && <p className="text-gray-500">{pharmacy.name_am}</p>}
                            <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                                {pharmacy.address && <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4" />{pharmacy.address}</span>}
                                {pharmacy.phone && <span className="flex items-center gap-1"><PhoneIcon className="h-4 w-4" />{pharmacy.phone}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Available Medicines</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {medicines?.data?.map((med, i) => (
                        <motion.div key={med.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                            <Link href={`/patient/medicines/${med.id}`} className="card block p-4 hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{med.name}</h3>
                                <p className="text-lg font-bold text-endode-600 mt-1">ETB {med.price}</p>
                                <div className="mt-2 flex gap-2">
                                    <Badge variant={med.stock_quantity > 0 ? 'success' : 'danger'} dot>
                                        {med.stock_quantity > 0 ? 'In Stock' : 'Out'}
                                    </Badge>
                                    {med.category && <Badge>{med.category.name}</Badge>}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

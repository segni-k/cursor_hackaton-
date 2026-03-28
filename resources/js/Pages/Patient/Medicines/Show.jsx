import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Badge from '@/Components/Badge';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BuildingStorefrontIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Show({ medicine }) {
    const [quantity, setQuantity] = useState(1);

    const { post, processing } = useForm({});

    const handleOrder = () => {
        post('/patient/orders', {
            data: {
                pharmacy_id: medicine.pharmacy_id,
                items: [{ medicine_id: medicine.id, quantity }],
            },
        });
    };

    return (
        <AuthenticatedLayout header={medicine.name}>
            <Head title={medicine.name} />

            <Breadcrumbs items={[
                { label: 'Medicines', href: '/patient/medicines' },
                { label: medicine.name },
            ]} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 card overflow-hidden">
                    {medicine.image && (
                        <div className="h-64 bg-gray-100 dark:bg-gray-700">
                            <img src={`/storage/${medicine.image}`} alt={medicine.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{medicine.name}</h1>
                                {medicine.name_am && <p className="text-gray-500 dark:text-gray-400">{medicine.name_am}</p>}
                            </div>
                            <span className="text-3xl font-bold text-endode-600 dark:text-endode-400">ETB {medicine.price}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant={medicine.stock_quantity > 0 ? 'success' : 'danger'} dot>
                                {medicine.stock_quantity > 0 ? `${medicine.stock_quantity} in stock` : 'Out of stock'}
                            </Badge>
                            {medicine.requires_prescription && <Badge variant="info">Prescription Required</Badge>}
                            {medicine.category && <Badge variant="default">{medicine.category.name}</Badge>}
                        </div>

                        {medicine.description && (
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Description</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{medicine.description}</p>
                            </div>
                        )}

                        <p className="text-sm text-gray-500">Unit: {medicine.unit}</p>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {medicine.stock_quantity > 0 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order This Medicine</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                                    <TextInput type="number" min="1" max={medicine.stock_quantity} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                                </div>
                                <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-500">Total</span>
                                    <span className="text-xl font-bold text-endode-600">ETB {(medicine.price * quantity).toFixed(2)}</span>
                                </div>
                                <PrimaryButton className="w-full justify-center" onClick={handleOrder} disabled={processing}>
                                    Add to Order
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {medicine.pharmacy && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Pharmacy Info</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <BuildingStorefrontIcon className="h-4 w-4 shrink-0" />
                                    <span>{medicine.pharmacy.name}</span>
                                </div>
                                {medicine.pharmacy.address && (
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <MapPinIcon className="h-4 w-4 shrink-0" />
                                        <span>{medicine.pharmacy.address}</span>
                                    </div>
                                )}
                                {medicine.pharmacy.phone && (
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <PhoneIcon className="h-4 w-4 shrink-0" />
                                        <span>{medicine.pharmacy.phone}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

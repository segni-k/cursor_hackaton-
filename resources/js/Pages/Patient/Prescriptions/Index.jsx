import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const statusVariant = { pending: 'warning', processing: 'info', processed: 'success', failed: 'danger' };

export default function Index({ prescriptions }) {
    return (
        <AuthenticatedLayout header="Prescriptions">
            <Head title="Prescriptions" />

            <div className="space-y-6">
                <div className="flex justify-end">
                    <Link href="/patient/prescriptions/upload">
                        <PrimaryButton>Upload Prescription</PrimaryButton>
                    </Link>
                </div>

                {prescriptions?.data?.length === 0 ? (
                    <EmptyState icon={DocumentTextIcon} title="No prescriptions" description="Upload a prescription to get started." />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {prescriptions?.data?.map((rx, i) => (
                            <motion.div key={rx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <Link href={`/patient/prescriptions/${rx.id}`} className="card block p-4 hover:shadow-md transition-shadow">
                                    <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                                        <img src={`/storage/${rx.image_path}`} alt="Prescription" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{new Date(rx.created_at).toLocaleDateString()}</span>
                                        <Badge variant={statusVariant[rx.status]} dot>{rx.status}</Badge>
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

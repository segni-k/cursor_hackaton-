import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import Badge from '@/Components/Badge';

const statusVariant = { pending: 'warning', processing: 'info', processed: 'success', failed: 'danger' };

export default function Show({ prescription }) {
    return (
        <AuthenticatedLayout header={`Prescription #${prescription.id}`}>
            <Head title={`Prescription #${prescription.id}`} />
            <Breadcrumbs items={[{ label: 'Prescriptions', href: '/patient/prescriptions' }, { label: `#${prescription.id}` }]} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card overflow-hidden">
                    <img src={`/storage/${prescription.image_path}`} alt="Prescription" className="w-full" />
                </div>
                <div className="space-y-4">
                    <div className="card p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">OCR Results</h2>
                            <Badge variant={statusVariant[prescription.status]} dot>{prescription.status}</Badge>
                        </div>
                        {prescription.status === 'pending' && <p className="text-sm text-gray-500">Your prescription is being processed...</p>}
                        {prescription.status === 'processed' && prescription.parsed_medicines && (
                            <div className="space-y-2">
                                {prescription.parsed_medicines.map((med, i) => (
                                    <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <p className="font-medium text-gray-900 dark:text-white">{med.name}</p>
                                        {med.dosage && <p className="text-sm text-gray-500">Dosage: {med.dosage}</p>}
                                        {med.quantity && <p className="text-sm text-gray-500">Quantity: {med.quantity}</p>}
                                    </div>
                                ))}
                                <Link href="/patient/medicines" className="btn-primary inline-block mt-4">
                                    Search & Order These Medicines
                                </Link>
                            </div>
                        )}
                        {prescription.ocr_raw_text && (
                            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Raw OCR Text:</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{prescription.ocr_raw_text}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

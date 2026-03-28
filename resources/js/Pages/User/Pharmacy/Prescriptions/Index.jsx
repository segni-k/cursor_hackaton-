import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmptyState from '@/Components/EmptyState';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Index({ prescriptions }) {
    return (
        <AuthenticatedLayout header="Prescriptions">
            <Head title="Prescriptions" />
            <EmptyState icon={DocumentTextIcon} title="Prescription viewing" description="Prescriptions linked to completed orders will appear here." />
        </AuthenticatedLayout>
    );
}

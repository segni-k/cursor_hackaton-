import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import FileUpload from '@/Components/FileUpload';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Upload() {
    const { data, setData, post, processing, errors } = useForm({ image: null });

    const submit = (e) => {
        e.preventDefault();
        post('/patient/prescriptions', { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header="Upload Prescription">
            <Head title="Upload Prescription" />
            <Breadcrumbs items={[{ label: 'Prescriptions', href: '/patient/prescriptions' }, { label: 'Upload' }]} />

            <div className="max-w-xl mx-auto card p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Your Prescription</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Take a clear photo of your prescription. Our AI will extract the medicine details.</p>

                <form onSubmit={submit} className="space-y-6">
                    <FileUpload onFileSelect={(file) => setData('image', file)} accept="image/jpeg,image/png,image/jpg" maxSize={5} />
                    <InputError message={errors.image} />
                    <PrimaryButton className="w-full justify-center" disabled={processing || !data.image}>
                        {processing ? 'Uploading...' : 'Upload & Process'}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

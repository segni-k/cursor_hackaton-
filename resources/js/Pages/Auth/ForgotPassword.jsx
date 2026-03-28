import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset password</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter your email and we'll send you a reset link.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} isFocused={true} />
                    <InputError message={errors.email} />
                </div>

                <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                    {processing ? 'Sending...' : 'Send reset link'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}

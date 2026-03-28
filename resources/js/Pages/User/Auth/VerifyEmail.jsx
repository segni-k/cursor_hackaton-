import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-endode-50 dark:bg-endode-900/20 rounded-2xl flex items-center justify-center mb-4">
                    <EnvelopeIcon className="h-8 w-8 text-endode-600 dark:text-endode-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify your email</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    We've sent a verification link to your email. Please check your inbox and click the link to verify.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg text-center">
                    A new verification link has been sent!
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                    {processing ? 'Sending...' : 'Resend verification email'}
                </PrimaryButton>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Log out
                </Link>
            </form>
        </GuestLayout>
    );
}

import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reset-password', { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set new password</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter your new password below.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete="username" />
                    <InputError message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} isFocused={true} autoComplete="new-password" />
                    <InputError message={errors.password} />
                </div>
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
                    <InputError message={errors.password_confirmation} />
                </div>

                <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                    {processing ? 'Resetting...' : 'Reset password'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}

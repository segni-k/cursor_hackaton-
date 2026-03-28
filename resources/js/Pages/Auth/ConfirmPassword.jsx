import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/confirm-password', { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm password</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    This is a secure area. Please confirm your password to continue.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} isFocused={true} autoComplete="current-password" />
                    <InputError message={errors.password} />
                </div>

                <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                    Confirm
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}

import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout header="Profile">
            <Head title="Profile" />

            <div className="max-w-3xl mx-auto space-y-6">
                <UpdateProfileInformation user={user} mustVerifyEmail={mustVerifyEmail} status={status} />
                <UpdatePassword />
                <DeleteAccount />
            </div>
        </AuthenticatedLayout>
    );
}

function UpdateProfileInformation({ user, mustVerifyEmail, status }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch('/profile');
    };

    return (
        <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your account name and email address.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="name" />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete="username" />
                    <InputError message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    {recentlySuccessful && <p className="text-sm text-green-600 dark:text-green-400">Saved.</p>}
                </div>
            </form>
        </div>
    );
}

function UpdatePassword() {
    const { data, setData, put, errors, processing, reset, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put('/password', { onSuccess: () => reset() });
    };

    return (
        <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Update Password</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Use a strong, unique password to keep your account secure.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" />
                    <TextInput id="current_password" type="password" value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} autoComplete="current-password" />
                    <InputError message={errors.current_password} />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} autoComplete="new-password" />
                    <InputError message={errors.password} />
                </div>
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update Password</PrimaryButton>
                    {recentlySuccessful && <p className="text-sm text-green-600 dark:text-green-400">Updated.</p>}
                </div>
            </form>
        </div>
    );
}

function DeleteAccount() {
    const [confirming, setConfirming] = useState(false);
    const { data, setData, delete: destroy, processing, errors, reset } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        destroy('/profile', { onSuccess: () => setConfirming(false), onFinish: () => reset() });
    };

    return (
        <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Account</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Once your account is deleted, all data will be permanently removed.
            </p>

            <DangerButton className="mt-4" onClick={() => setConfirming(true)}>Delete Account</DangerButton>

            <Modal show={confirming} onClose={() => setConfirming(false)} maxWidth="md">
                <form onSubmit={submit} className="p-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Are you sure?</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Enter your password to confirm account deletion. This action cannot be undone.
                    </p>
                    <div className="mt-4">
                        <TextInput
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            isFocused
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => setConfirming(false)} className="btn-secondary">Cancel</button>
                        <DangerButton disabled={processing}>Delete Account</DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg">
                    {status}
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to your Endode account</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        isFocused={true}
                        autoComplete="username"
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 dark:border-gray-600 text-endode-600 focus:ring-endode-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link href="/forgot-password" className="text-sm text-endode-600 dark:text-endode-400 hover:text-endode-700 dark:hover:text-endode-300">
                            Forgot password?
                        </Link>
                    )}
                </div>

                <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                    {processing ? 'Signing in...' : 'Sign in'}
                </PrimaryButton>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-endode-600 dark:text-endode-400 hover:text-endode-700 font-medium">
                        Sign up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}

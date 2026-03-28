import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion } from 'framer-motion';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

export default function Setup() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', name_am: '', address: '', address_am: '', phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/pharmacy/setup');
    };

    return (
        <AuthenticatedLayout header="Setup Your Pharmacy">
            <Head title="Pharmacy Setup" />

            <div className="max-w-xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-endode-100 dark:bg-endode-900/30 rounded-2xl flex items-center justify-center mb-4">
                        <BuildingStorefrontIcon className="h-8 w-8 text-endode-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set Up Your Pharmacy</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Complete your pharmacy profile to start receiving orders.</p>
                </motion.div>

                <div className="card p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Pharmacy Name (English)" required />
                            <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <InputLabel htmlFor="name_am" value="Pharmacy Name (Amharic)" />
                            <TextInput id="name_am" value={data.name_am} onChange={(e) => setData('name_am', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel htmlFor="address" value="Address (English)" required />
                            <TextInput id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            <InputError message={errors.address} />
                        </div>
                        <div>
                            <InputLabel htmlFor="address_am" value="Address (Amharic)" />
                            <TextInput id="address_am" value={data.address_am} onChange={(e) => setData('address_am', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="Phone" />
                            <TextInput id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        </div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Pharmacy'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

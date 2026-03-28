import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ pharmacy, medicines, prescriptionId }) {
    const { data, setData, post, processing, errors } = useForm({
        pharmacy_id: pharmacy?.id,
        items: medicines?.map(m => ({ medicine_id: m.id, quantity: 1 })) || [],
        notes: '',
        prescription_id: prescriptionId || null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/patient/orders');
    };

    return (
        <AuthenticatedLayout header="Place Order">
            <Head title="New Order" />
            <div className="max-w-2xl mx-auto card p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Your Order</h2>
                <form onSubmit={submit} className="space-y-4">
                    {data.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span className="flex-1 text-sm text-gray-900 dark:text-white">Medicine #{item.medicine_id}</span>
                            <TextInput type="number" min="1" value={item.quantity} className="w-20" onChange={(e) => {
                                const items = [...data.items];
                                items[idx].quantity = parseInt(e.target.value) || 1;
                                setData('items', items);
                            }} />
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (optional)</label>
                        <textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} className="input-field w-full" rows="3" />
                    </div>
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Placing Order...' : 'Place Order'}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { useState } from 'react';

export default function Edit({ medicine, categories }) {
    const [showDelete, setShowDelete] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: medicine.name || '', name_am: medicine.name_am || '',
        description: medicine.description || '', description_am: medicine.description_am || '',
        category_id: medicine.category_id || '', price: medicine.price || '',
        stock_quantity: medicine.stock_quantity || 0, low_stock_threshold: medicine.low_stock_threshold || 10,
        unit: medicine.unit || 'piece', requires_prescription: medicine.requires_prescription || false,
        is_active: medicine.is_active !== false, image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/pharmacy/inventory/${medicine.id}`, { forceFormData: true });
    };

    const handleDelete = () => {
        router.delete(`/pharmacy/inventory/${medicine.id}`, { onSuccess: () => setShowDelete(false) });
    };

    return (
        <AuthenticatedLayout header="Edit Medicine">
            <Head title="Edit Medicine" />
            <Breadcrumbs items={[{ label: 'Inventory', href: '/pharmacy/inventory' }, { label: medicine.name }]} />

            <div className="max-w-2xl mx-auto card p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel value="Name (English)" required />
                            <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <InputLabel value="Name (Amharic)" />
                            <TextInput value={data.name_am} onChange={(e) => setData('name_am', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <InputLabel value="Category" />
                        <SelectInput value={data.category_id} onChange={(e) => setData('category_id', e.target.value)}>
                            <option value="">Select category</option>
                            {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </SelectInput>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <InputLabel value="Price (ETB)" required />
                            <TextInput type="number" step="0.01" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            <InputError message={errors.price} />
                        </div>
                        <div>
                            <InputLabel value="Stock Quantity" required />
                            <TextInput type="number" min="0" value={data.stock_quantity} onChange={(e) => setData('stock_quantity', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Low Stock Threshold" />
                            <TextInput type="number" min="0" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel value="Unit" />
                            <SelectInput value={data.unit} onChange={(e) => setData('unit', e.target.value)}>
                                <option value="piece">Piece</option>
                                <option value="tablet">Tablet</option>
                                <option value="capsule">Capsule</option>
                                <option value="bottle">Bottle</option>
                                <option value="tube">Tube</option>
                                <option value="box">Box</option>
                            </SelectInput>
                        </div>
                        <div className="flex flex-col justify-end gap-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={data.requires_prescription} onChange={(e) => setData('requires_prescription', e.target.checked)} className="rounded border-gray-300 text-endode-600 focus:ring-endode-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Requires Prescription</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded border-gray-300 text-endode-600 focus:ring-endode-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <InputLabel value="Description" />
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input-field w-full" rows="3" />
                    </div>
                    <div className="flex gap-3">
                        <PrimaryButton className="flex-1 justify-center" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </PrimaryButton>
                        <DangerButton type="button" onClick={() => setShowDelete(true)}>Delete</DangerButton>
                    </div>
                </form>
            </div>

            <ConfirmDialog show={showDelete} title="Delete Medicine" message="This will permanently remove this medicine from your inventory." confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />
        </AuthenticatedLayout>
    );
}

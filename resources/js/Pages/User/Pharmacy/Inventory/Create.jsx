import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileUpload from '@/Components/FileUpload';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', name_am: '', description: '', description_am: '',
        category_id: '', price: '', stock_quantity: '', low_stock_threshold: '10',
        unit: 'piece', requires_prescription: false, image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/pharmacy/inventory', { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header="Add Medicine">
            <Head title="Add Medicine" />
            <Breadcrumbs items={[{ label: 'Inventory', href: '/pharmacy/inventory' }, { label: 'Add' }]} />

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
                            <InputError message={errors.stock_quantity} />
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
                                <option value="ml">ml</option>
                                <option value="mg">mg</option>
                            </SelectInput>
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 py-2.5">
                                <input type="checkbox" checked={data.requires_prescription} onChange={(e) => setData('requires_prescription', e.target.checked)} className="rounded border-gray-300 text-endode-600 focus:ring-endode-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Requires Prescription</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <InputLabel value="Description (English)" />
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input-field w-full" rows="3" />
                    </div>
                    <div>
                        <InputLabel value="Image" />
                        <FileUpload onFileSelect={(f) => setData('image', f)} accept="image/*" maxSize={2} />
                        <InputError message={errors.image} />
                    </div>
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Adding...' : 'Add Medicine'}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

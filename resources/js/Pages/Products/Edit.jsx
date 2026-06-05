import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Edit({ product, categories, units }) {
    const { props } = usePage();

    const [values, setValues] = useState({
        kode_barang: product.kode_barang || '',
        nama_barang: product.nama_barang || '',
        category_id: product.category_id || '',
        unit_id: product.unit_id || '',
        stok: product.stok || 0,
        stok_minimum: product.stok_minimum || 0,
        harga_beli: product.harga_beli || '',
        harga_jual: product.harga_jual || '',
        keterangan: product.keterangan || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('products.update', product.id), values, {
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Produk</h2>}
        >
            <Head title="Edit Produk" />

            <div className="p-6">
                <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-4 border-b border-gray-200 pb-4">
                        <Link href={route('products.index')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Kode Barang <span className="text-red-500">*</span></label>
                                <input type="text" name="kode_barang" value={values.kode_barang} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${props.errors?.kode_barang ? 'border-red-500' : 'border-gray-300'}`} placeholder="Contoh: KL001" />
                                {props.errors?.kode_barang && <p className="mt-1 text-sm text-red-500">{props.errors.kode_barang}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Nama Barang <span className="text-red-500">*</span></label>
                                <input type="text" name="nama_barang" value={values.nama_barang} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${props.errors?.nama_barang ? 'border-red-500' : 'border-gray-300'}`} placeholder="Contoh: Kalung Rantai Emas 18K" />
                                {props.errors?.nama_barang && <p className="mt-1 text-sm text-red-500">{props.errors.nama_barang}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Kategori <span className="text-red-500">*</span></label>
                                <select name="category_id" value={values.category_id} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${props.errors?.category_id ? 'border-red-500' : 'border-gray-300'}`}>
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => <option key={cat.id} value={cat.id} selected={cat.id === values.category_id}>{cat.nama_kategori} ({cat.kode_kategori})</option>)}
                                </select>
                                {props.errors?.category_id && <p className="mt-1 text-sm text-red-500">{props.errors.category_id}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Satuan <span className="text-red-500">*</span></label>
                                <select name="unit_id" value={values.unit_id} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${props.errors?.unit_id ? 'border-red-500' : 'border-gray-300'}`}>
                                    <option value="">Pilih Satuan</option>
                                    {units.map((unit) => <option key={unit.id} value={unit.id} selected={unit.id === values.unit_id}>{unit.nama_satuan} ({unit.kode_satuan})</option>)}
                                </select>
                                {props.errors?.unit_id && <p className="mt-1 text-sm text-red-500">{props.errors.unit_id}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Stok <span className="text-red-500">*</span></label>
                                <input type="number" name="stok" min="0" value={values.stok} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${props.errors?.stok ? 'border-red-500' : 'border-gray-300'}`} />
                                {props.errors?.stok && <p className="mt-1 text-sm text-red-500">{props.errors.stok}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Stok Minimum <span className="text-red-500">*</span></label>
                                <input type="number" name="stok_minimum" min="0" value={values.stok_minimum} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${props.errors?.stok_minimum ? 'border-red-500' : 'border-gray-300'}`} />
                                {props.errors?.stok_minimum && <p className="mt-1 text-sm text-red-500">{props.errors.stok_minimum}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Harga Beli</label>
                                <input type="number" name="harga_beli" min="0" step="100" value={values.harga_beli} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="0" />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Harga Jual</label>
                                <input type="number" name="harga_jual" min="0" step="100" value={values.harga_jual} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="0" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea name="keterangan" rows="3" value={values.keterangan} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Tambahkan keterangan produk (opsional)" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <Link href={route('products.index')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</Link>
                            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
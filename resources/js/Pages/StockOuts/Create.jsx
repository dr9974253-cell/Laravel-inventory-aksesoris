import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Create({ products }) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        product_id: '',
        jumlah: '',
        tanggal: new Date().toISOString().split('T')[0],
        no_referensi: '',
        keterangan: '',
    });

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const product = products.find(p => p.id === parseInt(values.product_id));
        setSelectedProduct(product);
    }, [values.product_id, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('stock-outs.store'), values);
    };

    const isOverStock = selectedProduct && values.jumlah && parseInt(values.jumlah) > selectedProduct.stok;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tambah Barang Keluar</h2>}>
            <Head title="Tambah Barang Keluar" />
            <div className="p-6">
                <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-4 border-b border-gray-200 pb-4">
                        <Link href={route('stock-outs.index')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-4 w-4" /> Kembali
                        </Link>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Produk <span className="text-red-500">*</span></label>
                                <select name="product_id" value={values.product_id} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${errors?.product_id ? 'border-red-500' : 'border-gray-300'}`}>
                                    <option value="">Pilih Produk</option>
                                    {products.map((p) => <option key={p.id} value={p.id}>{p.kode_barang} - {p.nama_barang} (Stok: {p.stok})</option>)}
                                </select>
                                {errors?.product_id && <p className="mt-1 text-sm text-red-500">{errors.product_id}</p>}

                                {/* Stock Info */}
                                {selectedProduct && (
                                    <div className={`mt-2 flex items-center gap-2 text-sm ${isOverStock ? 'text-red-600' : 'text-green-600'}`}>
                                        <span>Stok tersedia: <strong>{selectedProduct.stok}</strong></span>
                                        {isOverStock && <AlertTriangle className="h-4 w-4" />}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Jumlah <span className="text-red-500">*</span></label>
                                <input type="number" name="jumlah" min="1" value={values.jumlah} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${errors?.jumlah || isOverStock ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors?.jumlah && <p className="mt-1 text-sm text-red-500">{errors.jumlah}</p>}
                                {isOverStock && <p className="mt-1 text-sm text-red-500">Jumlah melebihi stok tersedia ({selectedProduct.stok})</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal <span className="text-red-500">*</span></label>
                                <input type="date" name="tanggal" value={values.tanggal} onChange={handleChange} className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 ${errors?.tanggal ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors?.tanggal && <p className="mt-1 text-sm text-red-500">{errors.tanggal}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">No Referensi</label>
                                <input type="text" name="no_referensi" value={values.no_referensi} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: SO-001" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea name="keterangan" rows="3" value={values.keterangan} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Tambahkan keterangan (opsional)" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                            <Link href={route('stock-outs.index')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</Link>
                            <button type="submit" disabled={isOverStock} className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${isOverStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
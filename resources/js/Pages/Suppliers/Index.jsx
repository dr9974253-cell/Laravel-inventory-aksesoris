import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';

export default function Index({ suppliers, filters }) {
    const { props } = usePage();
    const [search, setSearch] = useState(filters?.search || '');
    const [showModal, setShowModal] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [formData, setFormData] = useState({ kode_supplier: '', nama_supplier: '', telepon: '', email: '', alamat: '', keterangan: '' });
    const [errors, setErrors] = useState({});

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        if (search) params.set('search', search);
        else params.delete('search');
        window.location.href = route('suppliers.index') + (params.toString() ? '?' + params.toString() : '');
    };

    const openModal = (supplier = null) => {
        if (supplier) {
            setEditingSupplier(supplier);
            setFormData({
                kode_supplier: supplier.kode_supplier,
                nama_supplier: supplier.nama_supplier,
                telepon: supplier.telepon || '',
                email: supplier.email || '',
                alamat: supplier.alamat || '',
                keterangan: supplier.keterangan || ''
            });
        } else {
            setEditingSupplier(null);
            setFormData({ kode_supplier: '', nama_supplier: '', telepon: '', email: '', alamat: '', keterangan: '' });
        }
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSupplier(null);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingSupplier ? route('suppliers.update', editingSupplier.id) : route('suppliers.store');
        const method = editingSupplier ? 'put' : 'post';

        router[method](url, formData, {
            onError: (err) => setErrors(err),
            onSuccess: () => {
                closeModal();
                // Reload to show flash message from server
                setTimeout(() => window.location.reload(), 100);
            },
        });
    };

    const confirmDelete = (id, nama) => {
        if (window.confirm(`Hapus supplier "${nama}"?`)) {
            document.getElementById('delete-form-' + id).submit();
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Supplier</h2>}>
            <Head title="Supplier" />
            <div className="p-6">
                {props.flash?.success && (
                    <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">{props.flash.success}</div>
                )}
                {props.flash?.error && (
                    <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-800">{props.flash.error}</div>
                )}

                <div className="rounded-xl bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)}
                                    className="rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Cari</button>
                        </form>
                        <button type="button" onClick={() => openModal()} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4" /> Tambah Supplier
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kode</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Supplier</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Telepon</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Alamat</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {suppliers.data.length === 0 ? (
                                    <tr><td colSpan="7" className="px-4 py-8 text-center text-sm text-gray-500">Tidak ada data.</td></tr>
                                ) : suppliers.data.map((sup, i) => (
                                    <tr key={sup.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">{suppliers.from + i}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{sup.kode_supplier}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">{sup.nama_supplier}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">{sup.telepon || '-'}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">{sup.email || '-'}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm max-w-xs truncate">{sup.alamat || '-'}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-center">
                                            <button type="button" onClick={() => openModal(sup)} className="rounded-lg p-1.5 text-yellow-500 hover:bg-yellow-50"><Pencil className="h-4 w-4" /></button>
                                            <button type="button" onClick={() => confirmDelete(sup.id, sup.nama_supplier)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                                            <form id={`delete-form-${sup.id}`} method="POST" action={route('suppliers.destroy', sup.id)} className="hidden">
                                                <input type="hidden" name="_token" value={props.csrf_token} />
                                                <input type="hidden" name="_method" value="DELETE" />
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {suppliers.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                            <div className="text-sm text-gray-500">Menampilkan {suppliers.from} sampai {suppliers.to} dari {suppliers.total}</div>
                            <div className="flex gap-1">
                                {suppliers.links.map((link, i) => (
                                    <a key={i} href={link.url || '#'}
                                        className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} ${!link.url ? 'pointer-events-none text-gray-300' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900/50" onClick={closeModal} />
                    <div className="relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{editingSupplier ? 'Edit Supplier' : 'Tambah Supplier'}</h3>
                            <button type="button" onClick={closeModal} className="rounded-lg p-1 hover:bg-gray-100"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Kode Supplier</label>
                                    <input type="text" value={formData.kode_supplier} onChange={(e) => setFormData({...formData, kode_supplier: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Auto: SUP001" />
                                    <p className="mt-1 text-xs text-gray-500">Kosongkan untuk auto generate</p>
                                    {errors.kode_supplier && <p className="mt-1 text-sm text-red-500">{errors.kode_supplier}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Nama Supplier <span className="text-red-500">*</span></label>
                                    <input type="text" value={formData.nama_supplier} onChange={(e) => setFormData({...formData, nama_supplier: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                                    {errors.nama_supplier && <p className="mt-1 text-sm text-red-500">{errors.nama_supplier}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Telepon</label>
                                    <input type="text" value={formData.telepon} onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Alamat</label>
                                    <textarea value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" rows="2" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Keterangan</label>
                                    <textarea value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" rows="2" />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Batal</button>
                                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
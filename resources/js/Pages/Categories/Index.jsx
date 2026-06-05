import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';

export default function Index({ categories, filters }) {
    const { props } = usePage();
    const [search, setSearch] = useState(filters?.search || '');
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ kode_kategori: '', nama_kategori: '', deskripsi: '' });
    const [errors, setErrors] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        if (search) params.set('search', search);
        else params.delete('search');
        window.location.href = route('categories.index') + (params.toString() ? '?' + params.toString() : '');
    };

    const openModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ kode_kategori: category.kode_kategori, nama_kategori: category.nama_kategori, deskripsi: category.deskripsi || '' });
        } else {
            setEditingCategory(null);
            setFormData({ kode_kategori: '', nama_kategori: '', deskripsi: '' });
        }
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted, editingCategory:', editingCategory);

        const url = editingCategory ? route('categories.update', editingCategory.id) : route('categories.store');
        const method = editingCategory ? 'put' : 'post';

        console.log('URL:', url, 'Method:', method);

        router[method](url, formData, {
            onError: (err) => {
                console.error('Validation errors:', err);
                setErrors(err);
            },
            onSuccess: () => {
                console.log('Success! Reloading...');
                closeModal();
                setTimeout(() => window.location.reload(), 100);
            },
        });
    };

    const confirmDelete = (id, nama) => {
        if (window.confirm(`Hapus kategori "${nama}"?`)) {
            setDeleteId(id);
            document.getElementById('delete-form-' + id).submit();
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kategori</h2>}>
            <Head title="Kategori" />
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
                            <Plus className="h-4 w-4" /> Tambah Kategori
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kode</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Kategori</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Deskripsi</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {categories.data.length === 0 ? (
                                    <tr><td colSpan="5" className="px-4 py-8 text-center text-sm text-gray-500">Tidak ada data.</td></tr>
                                ) : categories.data.map((cat, i) => (
                                    <tr key={cat.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">{categories.from + i}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{cat.kode_kategori}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">{cat.nama_kategori}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{cat.deskripsi || '-'}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-center">
                                            <button type="button" onClick={() => openModal(cat)} className="rounded-lg p-1.5 text-yellow-500 hover:bg-yellow-50"><Pencil className="h-4 w-4" /></button>
                                            <button type="button" onClick={() => confirmDelete(cat.id, cat.nama_kategori)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                                            <form id={`delete-form-${cat.id}`} method="POST" action={route('categories.destroy', cat.id)} className="hidden">
                                                <input type="hidden" name="_token" value={props.csrf_token} />
                                                <input type="hidden" name="_method" value="DELETE" />
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {categories.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                            <div className="text-sm text-gray-500">Menampilkan {categories.from} sampai {categories.to} dari {categories.total}</div>
                            <div className="flex gap-1">
                                {categories.links.map((link, i) => (
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
                    <div className="relative z-50 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
                            <button type="button" onClick={closeModal} className="rounded-lg p-1 hover:bg-gray-100"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Kode Kategori</label>
                                    <input type="text" value={formData.kode_kategori} onChange={(e) => setFormData({...formData, kode_kategori: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Auto: KAT001" />
                                    <p className="mt-1 text-xs text-gray-500">Kosongkan untuk auto generate</p>
                                    {errors.kode_kategori && <p className="mt-1 text-sm text-red-500">{errors.kode_kategori}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Nama Kategori <span className="text-red-500">*</span></label>
                                    <input type="text" value={formData.nama_kategori} onChange={(e) => setFormData({...formData, nama_kategori: e.target.value})}
                                        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                                    {errors.nama_kategori && <p className="mt-1 text-sm text-red-500">{errors.nama_kategori}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
                                    <textarea value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
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

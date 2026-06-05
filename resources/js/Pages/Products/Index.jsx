import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';

export default function Index({ products, filters }) {
    const { props } = usePage();
    const auth = props.auth;
    const isAdmin = auth.user.role === 'admin';
    const [search, setSearch] = useState(filters.search || '');

    const formatCurrency = (value) => {
        if (!value) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }
        window.location.href = route('products.index') + '?' + params.toString();
    };

    const confirmDelete = (id, name) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
            document.getElementById('delete-form-' + id).submit();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Master Produk
                </h2>
            }
        >
            <Head title="Master Produk" />

            <div className="p-6">
                {/* Success Message */}
                {props.flash?.success && (
                    <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
                        {props.flash.success}
                    </div>
                )}

                <div className="rounded-xl bg-white shadow-sm">
                    {/* Header with Search and Add Button */}
                    <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari kode/nama barang..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Cari
                            </button>
                        </form>

                        {isAdmin && (
                            <Link
                                href={route('products.create')}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah Produk
                            </Link>
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kode</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Barang</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kategori</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Satuan</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Stok</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Stok Min</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Harga Beli</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Harga Jual</th>
                                    {isAdmin && (
                                        <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={isAdmin ? 10 : 8} className="px-4 py-8 text-center text-sm text-gray-500">Tidak ada data produk.</td>
                                    </tr>
                                ) : (
                                    products.data.map((product, index) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{products.from + index}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{product.kode_barang}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 capitalize">
                                                    {product.category?.nama_kategori || '-'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                                                {product.unit?.nama_satuan || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-center">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${product.stok <= product.stok_minimum ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {product.stok}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-500">{product.stok_minimum}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-500">{formatCurrency(product.harga_beli)}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-500">{formatCurrency(product.harga_jual)}</td>
                                            {isAdmin && (
                                                <td className="whitespace-nowrap px-4 py-3 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={route('products.edit', product.id)} className="rounded-lg p-1.5 text-yellow-500 hover:bg-yellow-50" title="Edit">
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                        <button type="button" onClick={() => confirmDelete(product.id, product.nama_barang)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50" title="Hapus">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                        <form id={`delete-form-${product.id}`} method="POST" action={route('products.destroy', product.id)} className="hidden">
                                                            <input type="hidden" name="_token" value={props.csrf_token} />
                                                            <input type="hidden" name="_method" value="DELETE" />
                                                        </form>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
                            <div className="text-sm text-gray-500">
                                Menampilkan {products.from} sampai {products.to} dari {products.total} data
                            </div>
                            <div className="flex gap-1">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} ${!link.url ? 'pointer-events-none text-gray-300' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
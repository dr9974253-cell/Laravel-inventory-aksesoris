import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';

export default function Index({ stockOuts, filters }) {
    const { props } = usePage();
    const auth = props.auth;
    const isAdmin = auth.user.role === 'admin';
    const [search, setSearch] = useState(filters.search || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        if (search) params.set('search', search); else params.delete('search');
        if (dateFrom) params.set('date_from', dateFrom); else params.delete('date_from');
        if (dateTo) params.set('date_to', dateTo); else params.delete('date_to');
        window.location.href = route('stock-outs.index') + '?' + params.toString();
    };

    const confirmDelete = (id, name) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus data barang keluar "${name}"?`)) {
            document.getElementById('delete-form-' + id).submit();
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Barang Keluar</h2>}>
            <Head title="Barang Keluar" />
            <div className="p-6">
                {props.flash?.success && <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">{props.flash.success}</div>}
                {props.flash?.error && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-800">{props.flash.error}</div>}

                <div className="rounded-xl bg-white shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            <span className="text-gray-500">s/d</span>
                            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Cari</button>
                        </form>
                        {isAdmin && (
                            <Link href={route('stock-outs.create')} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                <Plus className="h-4 w-4" /> Tambah Barang Keluar
                            </Link>
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kode Barang</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Barang</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Jumlah</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Stok</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No Referensi</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Keterangan</th>
                                    {isAdmin && <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {stockOuts.data.length === 0 ? (
                                    <tr><td colSpan={isAdmin ? 9 : 7} className="px-4 py-8 text-center text-sm text-gray-500">Tidak ada data barang keluar.</td></tr>
                                ) : (
                                    stockOuts.data.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{stockOuts.from + index}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{formatDate(item.tanggal)}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{item.product?.kode_barang}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{item.product?.nama_barang}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-center"><span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">{item.jumlah}</span></td>
                                            <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-500">{item.product?.stok}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{item.no_referensi || '-'}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{item.keterangan || '-'}</td>
                                            {isAdmin && (
                                                <td className="whitespace-nowrap px-4 py-3 text-center">
                                                    <button type="button" onClick={() => confirmDelete(item.id, item.product?.nama_barang)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50" title="Hapus"><Trash2 className="h-4 w-4" /></button>
                                                    <form id={`delete-form-${item.id}`} method="POST" action={route('stock-outs.destroy', item.id)} className="hidden">
                                                        <input type="hidden" name="_token" value={props.csrf_token} />
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                    </form>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {stockOuts.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                            <div className="text-sm text-gray-500">Menampilkan {stockOuts.from} sampai {stockOuts.to} dari {stockOuts.total} data</div>
                            <div className="flex gap-1">
                                {stockOuts.links.map((link, index) => (
                                    <Link key={index} href={link.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} ${!link.url ? 'pointer-events-none text-gray-300' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
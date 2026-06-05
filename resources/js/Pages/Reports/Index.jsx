import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Filter, RefreshCw, Download, Printer } from 'lucide-react';

export default function Index({ products }) {

    const [filters, setFilters] = useState(() => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        return {
            tanggal_mulai: firstDay.toISOString().split('T')[0],
            tanggal_selesai: today.toISOString().split('T')[0],
            jenis: 'semua',
            product_id: '',
        };
    });

    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await fetch(`/reports/data?${params}`);
            const result = await response.json();
            if (result.success) {
                setReportData(result.data);
            }
        } catch (error) {
            console.error('Error fetching report:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const handleFilter = () => {
        fetchReport();
    };

    const handleReset = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        setFilters({
            tanggal_mulai: firstDay.toISOString().split('T')[0],
            tanggal_selesai: today.toISOString().split('T')[0],
            jenis: 'semua',
            product_id: '',
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const handleExport = () => {
        const params = new URLSearchParams(filters).toString();
        window.location.href = route('reports.export') + (params ? '?' + params : '');
    };

    const handlePrintPdf = () => {
        const params = new URLSearchParams(filters).toString();
        window.location.href = route('reports.printPdf') + (params ? '?' + params : '');
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Laporan Stok</h2>}>
            <Head title="Laporan Stok" />
            <div className="p-6">
                {/* Filter Card */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <Filter className="h-5 w-5" /> Filter Laporan
                    </h3>

                    {/* Filter Inputs Row */}
                    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5 mb-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                            <input type="date" value={filters.tanggal_mulai} onChange={(e) => setFilters({ ...filters, tanggal_mulai: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                            <input type="date" value={filters.tanggal_selesai} onChange={(e) => setFilters({ ...filters, tanggal_selesai: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Jenis</label>
                            <select value={filters.jenis} onChange={(e) => setFilters({ ...filters, jenis: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                <option value="semua">Semua</option>
                                <option value="masuk">Barang Masuk</option>
                                <option value="keluar">Barang Keluar</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Produk</label>
                            <select value={filters.product_id} onChange={(e) => setFilters({ ...filters, product_id: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                <option value="">Semua Produk</option>
                                {products.map((p) => <option key={p.id} value={p.id}>{p.kode_barang} - {p.nama_barang}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-wrap items-center justify-end gap-3">
                        <button onClick={handleFilter} disabled={loading} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400">
                            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Filter className="h-4 w-4" />} Filter
                        </button>
                        <button onClick={handleReset} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Reset
                        </button>
                        <div className="h-6 w-px bg-gray-300" />
                        <button onClick={handleExport} className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                            <Download className="h-4 w-4" /> Export Excel
                        </button>
                        <button onClick={handlePrintPdf} className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                            <Printer className="h-4 w-4" /> Cetak PDF
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                {reportData && (
                    <div className="mb-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">Total Masuk</p>
                            <p className="mt-1 text-2xl font-semibold text-green-600">{reportData.summary.total_masuk}</p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">Total Keluar</p>
                            <p className="mt-1 text-2xl font-semibold text-red-600">{reportData.summary.total_keluar}</p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">Total Produk Bergerak</p>
                            <p className="mt-1 text-2xl font-semibold text-blue-600">{reportData.summary.total_produk_bergera}</p>
                        </div>
                    </div>
                )}

                {/* Report Table */}
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Jenis</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kode</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Barang</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Jumlah</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No Referensi</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {!reportData || reportData.transaksi.length === 0 ? (
                                    <tr><td colSpan="8" className="px-4 py-8 text-center text-sm text-gray-500">Tidak ada data transaksi.</td></tr>
                                ) : (
                                    reportData.transaksi.map((item, index) => (
                                        <tr key={`${item.jenis}-${item.id}`} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{formatDate(item.tanggal)}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${item.jenis === 'masuk' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {item.jenis === 'masuk' ? 'Masuk' : 'Keluar'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{item.kode_barang}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{item.nama_barang}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-900">{item.jumlah}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{item.no_referensi || '-'}</td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{item.keterangan || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
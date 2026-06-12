import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState, useEffect } from 'react';

export default function Dashboard({
    totalProduk,
    totalKategori,
    totalSupplier,
    totalStokMasuk,
    totalStokKeluar,
    produkStokRendah,
    stokTertinggi,
    stokTerendah,
    grafikBulanan,
    grafikHarian
}) {
    // State untuk memastikan chart dirender setelah component mounted
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Set mounted state setelah initial render untuk menghindari chart dimension error
        setIsMounted(true);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Inventory
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6">
                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {/* Total Produk */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="ms-4">
                                <p className="text-sm font-medium text-gray-500">Total Produk</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalProduk}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Kategori */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div className="ms-4">
                                <p className="text-sm font-medium text-gray-500">Total Kategori</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalKategori}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Supplier */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="ms-4">
                                <p className="text-sm font-medium text-gray-500">Total Supplier</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalSupplier}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stok Masuk */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                            </div>
                            <div className="ms-4">
                                <p className="text-sm font-medium text-gray-500">Stok Masuk (Bulan Ini)</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalStokMasuk}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stok Keluar */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                            </div>
                            <div className="ms-4">
                                <p className="text-sm font-medium text-gray-500">Stok Keluar (Bulan Ini)</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalStokKeluar}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stok Rendah */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="ms-4">
                                <p className="text-sm font-medium text-gray-500">Produk Stok Rendah</p>
                                <p className="text-2xl font-semibold text-gray-900">{produkStokRendah}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Bulanan */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Pergerakan Stok 6 Bulan Terakhir
                    </h3>
                    <div className="h-72">
                        {isMounted ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={grafikBulanan} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="bulan" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="masuk" name="Stok Masuk" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="keluar" name="Stok Keluar" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chart Harian */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Pergerakan Stok 30 Hari Terakhir
                    </h3>
                    <div className="h-72">
                        {isMounted ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={grafikHarian} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="tanggal" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={{ stroke: '#e5e7eb' }} />
                                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                                    <Legend />
                                    <Bar dataKey="masuk" name="Stok Masuk" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="keluar" name="Stok Keluar" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tables Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Stok Tertinggi */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                            5 Produk Stok Tertinggi
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Produk</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kategori</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stok</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {stokTertinggi.length > 0 ? (
                                        stokTertinggi.map((product, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 capitalize">{product.category?.nama_kategori || '-'}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{product.stok}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    {product.stok > 5 ? (
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Tersedia</span>
                                                    ) : product.stok > 0 ? (
                                                        <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">Warning</span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">Habis</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-500">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Stok Terendah */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                            5 Produk Stok Terendah
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama Produk</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kategori</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stok</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {stokTerendah.length > 0 ? (
                                        stokTerendah.map((product, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 capitalize">{product.category?.nama_kategori || '-'}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">{product.stok}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    {product.stok > 5 ? (
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Tersedia</span>
                                                    ) : product.stok > 0 ? (
                                                        <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">Warning</span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">Habis</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-500">Tidak ada produk dengan stok rendah</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
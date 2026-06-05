import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

export default function UsersCreate() {
    const { errors } = usePage().props;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/users', formData);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah User Baru
                </h2>
            }
        >
            <Head title="Tambah User Baru" />

            <div className="p-6">
                {/* Page Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Tambah User Baru</h1>
                        <p className="mt-1 text-sm text-gray-500">Tambahkan akun user baru ke sistem</p>
                    </div>
                    <Link
                        href="/users"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-800">Form Tambah User</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Nama Lengkap */}
                            <div className="mb-5">
                                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                                    placeholder="Masukkan nama lengkap"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                                    placeholder="nama@email.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                <p className="mt-1 text-xs text-gray-400">Gunakan email yang valid untuk login</p>
                            </div>

                            {/* Password */}
                            <div className="mb-5">
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                                    placeholder="Minimal 6 karakter"
                                />
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            {/* Konfirmasi Password */}
                            <div className="mb-5">
                                <label htmlFor="password_confirmation" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Konfirmasi Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                    placeholder="Ulangi password baru"
                                />
                            </div>

                            {/* Role */}
                            <div className="mb-6">
                                <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={`w-full rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                                >
                                    <option value="">-- Pilih Role --</option>
                                    <option value="admin">Admin</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                                <p className="mt-1.5 text-xs text-gray-400">
                                    <strong>Admin:</strong> Akses penuh ke semua fitur<br />
                                    <strong>Viewer:</strong> Hanya bisa melihat data
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
                                >
                                    <Save className="h-4 w-4" />
                                    Simpan User
                                </button>
                                <Link
                                    href="/users"
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
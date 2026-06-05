import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, X } from 'lucide-react';

export default function UsersIndex({ users }) {
    const { auth } = usePage().props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleDeleteClick = (user) => {
        setDeleteTarget(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            router.delete(`/users/${deleteTarget.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeleteTarget(null);
                },
            });
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setDeleteTarget(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manajemen User
                </h2>
            }
        >
            <Head title="Manajemen User" />

            <div className="p-6">
                {/* Page Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Manajemen User</h1>
                        <p className="mt-1 text-sm text-gray-500">Kelola akun pengguna sistem inventory</p>
                    </div>
                    <a
                        href="/users/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
                    >
                        <UserPlus className="h-4 w-4" />
                        Tambah User
                    </a>
                </div>

                {/* Users Table */}
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar User</h3>
                        <span className="text-sm text-gray-500">{users.length} user</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center text-gray-400">
                                                <Users className="mb-3 h-12 w-12" />
                                                <p className="text-sm">Belum ada data user</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                                        <span className="text-lg">👤</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        {user.id === auth.user.id && (
                                                            <span className="text-xs text-amber-600">(Anda)</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    user.role === 'admin'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {user.role === 'admin' ? 'Admin' : 'Viewer'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={`/users/${user.id}/edit`}
                                                        className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
                                                    >
                                                        <Edit className="h-3.5 w-3.5" />
                                                        Edit
                                                    </a>
                                                    {user.id !== auth.user.id && (
                                                        <button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Hapus
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Konfirmasi Hapus</h3>
                            <button onClick={handleDeleteCancel} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Apakah Anda yakin ingin menghapus user <strong>{deleteTarget?.name}</strong>?
                            </p>
                            <p className="mt-2 text-sm text-gray-400">Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleDeleteCancel}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
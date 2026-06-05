import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Package,
    ArrowDownCircle,
    ArrowUpCircle,
    FileText,
    LogOut,
    User,
    Menu,
    Tags,
    Scale,
    Truck,
    Users,
} from 'lucide-react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isAdmin = user.role === 'admin';

    const handleLogout = (e) => {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin logout?')) {
            router.post(route('logout'), {}, {
                onFinish: () => {
                    // Force full page reload to clear Inertia cache and reset state
                    window.location.href = '/login';
                }
            });
        }
    };

    const menuGroups = [
        {
            title: '',
            items: [
                { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
            ],
        },
        {
            title: 'Master Data',
            items: [
                { name: 'Kategori', href: route('categories.index'), icon: Tags },
                { name: 'Satuan', href: route('units.index'), icon: Scale },
                { name: 'Supplier', href: route('suppliers.index'), icon: Truck },
                { name: 'Produk', href: route('products.index'), icon: Package },
            ],
        },
        {
            title: 'Transaksi',
            items: [
                { name: 'Barang Masuk', href: route('stock-ins.index'), icon: ArrowDownCircle },
                { name: 'Barang Keluar', href: route('stock-outs.index'), icon: ArrowUpCircle },
            ],
        },
        {
            title: 'Laporan',
            items: [
                { name: 'Laporan', href: route('reports.index'), icon: FileText },
            ],
        },
        {
            title: 'Akun',
            items: [
                { name: 'Profil', href: route('profile.edit'), icon: User },
                { name: 'Manajemen User', href: route('users.index'), icon: Users },
            ],
        },
    ];

    const viewerMenuGroups = [
        {
            title: '',
            items: [
                { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
            ],
        },
        {
            title: 'Laporan',
            items: [
                { name: 'Laporan', href: route('reports.index'), icon: FileText },
            ],
        },
        {
            title: 'Akun',
            items: [
                { name: 'Profil', href: route('profile.edit'), icon: User },
            ],
        },
    ];

    const navigationGroups = isAdmin ? menuGroups : viewerMenuGroups;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-full flex-col">
                    {/* Logo Header */}
                    <div className="flex h-16 items-center justify-center border-b border-slate-700 px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
                                <span className="text-xl">💍</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-white">Inventory</h1>
                                <p className="text-xs text-slate-400">Aksesoris</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {navigationGroups.map((group, gIndex) => (
                            <div key={gIndex}>
                                {group.title && (
                                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        {group.title}
                                    </p>
                                )}
                                {group.items.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = window.location.pathname === item.href;

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-slate-600 text-white'
                                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>

                    {/* User Section */}
                    <div className="border-t border-slate-700 p-4">
                        <div className="flex items-center gap-3 rounded-lg bg-slate-700/50 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600">
                                <User className="h-5 w-5 text-slate-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                        </div>

                        {/* Role Badge */}
                        <div className="mt-3 flex items-center justify-between">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isAdmin ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-300'}`}>
                                {isAdmin ? 'Admin' : 'Viewer'}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                            >
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
                    <button type="button" className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex-1 lg:flex lg:items-center lg:justify-between">
                        {header && <div className="hidden lg:block">{header}</div>}
                        <div className="flex items-center gap-4 lg:hidden">
                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {isAdmin ? 'Admin' : 'Viewer'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {header && <div className="mb-6 lg:hidden">{header}</div>}
                    {children}
                </main>
            </div>
        </div>
    );
}
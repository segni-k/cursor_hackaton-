import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    DocumentTextIcon,
    CreditCardIcon,
    BuildingStorefrontIcon,
    ArchiveBoxIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    QrCodeIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import ThemeToggle from '@/Components/ThemeToggle';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import Toast from '@/Components/Toast';

const patientNav = [
    { name: 'Dashboard', href: '/patient/dashboard', icon: HomeIcon },
    { name: 'Search Medicines', href: '/patient/medicines', icon: MagnifyingGlassIcon },
    { name: 'Pharmacies', href: '/patient/pharmacies', icon: BuildingStorefrontIcon },
    { name: 'My Orders', href: '/patient/orders', icon: ShoppingCartIcon },
    { name: 'Prescriptions', href: '/patient/prescriptions', icon: DocumentTextIcon },
    { name: 'Payments', href: '/patient/payments', icon: CreditCardIcon },
];

const pharmacyNav = [
    { name: 'Dashboard', href: '/pharmacy/dashboard', icon: HomeIcon },
    { name: 'Inventory', href: '/pharmacy/inventory', icon: ArchiveBoxIcon },
    { name: 'Orders', href: '/pharmacy/orders', icon: ClipboardDocumentListIcon },
    { name: 'Payments', href: '/pharmacy/payments', icon: CreditCardIcon },
    { name: 'Analytics', href: '/pharmacy/analytics', icon: ChartBarIcon },
    { name: 'QR Scanner', href: '/pharmacy/orders/scanner', icon: QrCodeIcon },
];

export default function AuthenticatedLayout({ children, header }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const isPharmacy = auth.user?.role === 'pharmacy_owner';
    const navItems = isPharmacy ? pharmacyNav : patientNav;
    const currentPath = window.location.pathname;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Toast flash={flash} />

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-xl"
                        >
                            <SidebarContent
                                navItems={navItems}
                                currentPath={currentPath}
                                user={auth.user}
                                onClose={() => setSidebarOpen(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-6 pb-4">
                    <SidebarContent navItems={navItems} currentPath={currentPath} user={auth.user} />
                </div>
            </div>

            {/* Main content area */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="lg:hidden -m-2.5 p-2.5 text-gray-700 dark:text-gray-300"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        {header && (
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {header}
                                </h1>
                            </div>
                        )}
                        <div className="flex flex-1 items-center justify-end gap-x-3">
                            <LanguageSwitcher />
                            <ThemeToggle />

                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-endode-400 to-endode-600 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-white">
                                            {auth.user?.name?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {auth.user?.name}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 py-2 z-50"
                                        >
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <UserCircleIcon className="h-5 w-5" />
                                                Profile
                                            </Link>
                                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                                Log Out
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

function SidebarContent({ navItems, currentPath, user, onClose }) {
    return (
        <>
            <div className="flex h-16 shrink-0 items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-endode-400 to-endode-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-lg font-bold text-white">እ</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-endode-600 to-endode-800 dark:from-endode-400 dark:to-endode-600 bg-clip-text text-transparent">
                        Endode
                    </span>
                </Link>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden p-1 text-gray-500">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                )}
            </div>

            <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-1">
                    {navItems.map((item) => {
                        const isActive = currentPath.startsWith(item.href);
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`group flex gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-endode-50 dark:bg-endode-900/30 text-endode-700 dark:text-endode-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                    onClick={onClose}
                                >
                                    <item.icon
                                        className={`h-5 w-5 shrink-0 transition-colors ${
                                            isActive
                                                ? 'text-endode-600 dark:text-endode-400'
                                                : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                                        }`}
                                    />
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-indicator"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-endode-500"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-endode-400 to-endode-600 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

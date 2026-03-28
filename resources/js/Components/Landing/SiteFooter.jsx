import { Link } from '@inertiajs/react';
import { GlobeAltIcon, CurrencyDollarIcon, QrCodeIcon } from '@heroicons/react/24/outline';

export default function SiteFooter({ title }) {
    return (
        <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-endode-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-endode-500/20">
                                እ
                            </div>
                            <span className="font-display font-bold text-gray-900 dark:text-white">{title}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                            Marketing site lives under <code className="text-xs px-1 rounded bg-gray-200 dark:bg-white/10">Landing/</code> — admin
                            work stays in <code className="text-xs px-1 rounded bg-gray-200 dark:bg-white/10">Admin/</code>.
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-4">Product</p>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
                            <li>
                                <a href="#features" className="hover:text-endode-600 dark:hover:text-emerald-400 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="hover:text-endode-600 dark:hover:text-emerald-400 transition-colors">
                                    How it works
                                </a>
                            </li>
                            <li>
                                <a href="#security" className="hover:text-endode-600 dark:hover:text-emerald-400 transition-colors">
                                    Security
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-endode-600 dark:hover:text-emerald-400 transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-4">Account</p>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
                            <li>
                                <Link href="/login" className="hover:text-endode-600 dark:hover:text-emerald-400">
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-endode-600 dark:hover:text-emerald-400">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="/register?role=pharmacy_owner" className="hover:text-endode-600 dark:hover:text-emerald-400">
                                    Pharmacy signup
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-4">Platform</p>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                                <GlobeAltIcon className="h-4 w-4 text-endode-500" />
                                English · አማርኛ
                            </li>
                            <li className="flex items-center gap-2">
                                <CurrencyDollarIcon className="h-4 w-4 text-endode-500" />
                                M-Pesa escrow
                            </li>
                            <li className="flex items-center gap-2">
                                <QrCodeIcon className="h-4 w-4 text-endode-500" />
                                QR verification
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-slate-500">
                    <p>
                        &copy; {new Date().getFullYear()} {title} (እንዶድ). All rights reserved.
                    </p>
                    <p className="text-xs text-center sm:text-right">Landing UI · separate from patient, pharmacy & admin apps</p>
                </div>
            </div>
        </footer>
    );
}

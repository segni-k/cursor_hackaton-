import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { navLinks } from '@/Components/Landing/landingData';

export default function StitchNav({ auth, title }) {
    return (
        <nav className="fixed top-0 inset-x-0 z-50 border-b border-gray-200/70 dark:border-white/10 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[4.25rem] flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400/35 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity dark:opacity-60" />
                        <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-1 ring-black/5 dark:ring-white/15">
                            <span className="text-base font-bold text-white">እ</span>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <span className="block font-display text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                            {title}
                        </span>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-endode-600 dark:text-emerald-400/90">
                            Health OS
                        </span>
                    </div>
                </Link>

                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-slate-300">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="hover:text-endode-600 dark:hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-endode-500 dark:after:bg-emerald-400 hover:after:w-full after:transition-all"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:flex rounded-full border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 p-0.5">
                        <LanguageSwitcher />
                    </div>
                    <ThemeToggle />
                    {auth.user ? (
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity shadow-md"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-endode-600 dark:hover:text-white transition-colors px-2"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-endode-500 to-teal-500 text-white hover:from-endode-400 hover:to-teal-400 shadow-lg shadow-endode-500/25 dark:shadow-emerald-500/20 ring-1 ring-black/5 dark:ring-white/10"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Skills', path: '/skills', icon: Layers },
    { name: 'Admin', path: '/admin', icon: User },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl bg-black/50">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link key={item.path} href={item.path} className="relative group p-2">
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 flex items-center justify-center transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                <Icon size={20} />
                            </span>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

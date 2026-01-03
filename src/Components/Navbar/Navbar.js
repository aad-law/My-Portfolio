"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, Layers, Contact } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const navItems = [
    { name: 'Home', path: '/', icon: Home },
        {name : 'About', path : '/about', icon : User},
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'contact', path: '/contact', icon: Contact },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link key={item.path} href={item.path} className={styles.navLink}>
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className={styles.navPill}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`${styles.navIcon} ${isActive ? styles.active : styles.inactive}`}>
                                <Icon size={20} />
                            </span>
                            <span className={styles.navTooltip}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

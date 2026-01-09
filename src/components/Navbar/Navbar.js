"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, Layers, Contact } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';
import styles from './Navbar.module.css';

const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Contact', path: '/contact', icon: Contact },
];

export default function Navbar() {
    const pathname = usePathname();
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <nav className={styles.nav}>
            <LayoutGroup id="nav-group">
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
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
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
            </LayoutGroup>
        </nav>
    );
}

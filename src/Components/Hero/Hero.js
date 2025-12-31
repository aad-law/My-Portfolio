'use client';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero({ name, role, bio }) {
    return (
        <section className={styles.section}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
            >
                <h1 className={styles.title}>
                    {name}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
            >
                <h2 className={styles.role}>
                    {role}
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
            >
                <p className={styles.bio}>
                    {bio}
                </p>
            </motion.div>
        </section>
    );
}

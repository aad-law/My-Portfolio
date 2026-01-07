'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation({ onComplete }) {
    const [count, setCount] = useState(0);

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const duration = 2000;
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    if (!hasMounted) return null;

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className={styles.glowBackground}>
                <div className={styles.glow} />
            </div>

            <div className={styles.content}>
                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.brandName}
                >
                    Aadesh Lawate
                </motion.h1>

                {/* Progress Section */}
                <div className={styles.progressSection}>
                    <div className={styles.progressInfo}>
                        <span>Loading Portfolio...</span>
                        <span>{count}%</span>
                    </div>

                    <div className={styles.progressBarContainer}>
                        <motion.div
                            className={styles.progressBar}
                            initial={{ width: 0 }}
                            animate={{ width: `${count}%` }}
                            transition={{ duration: 0.05, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

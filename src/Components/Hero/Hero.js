'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ name, intro }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Section - Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.leftSection}
                >
                    <h1 className={styles.title}>
                        {name || "Aadesh Lawate"}
                    </h1>

                    <p className={styles.intro}>
                        {intro || "Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                    </p>

                    <button className={styles.ctaButton}>
                        Let's get started
                        <ArrowRight size={20} />
                    </button>
                </motion.div>

                {/* Right Section - Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.rightSection}
                >
                    <Image
                        src="/assets/images/profile.png"
                        alt={name || "Aadesh Lawate"}
                        width={350}
                        height={350}
                        className={styles.profilePhoto}
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}

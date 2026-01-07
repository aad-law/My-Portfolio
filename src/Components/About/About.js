'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Palette,
    Zap,
    Cpu,
    Globe,
    Smartphone,
    Server,
    Layers,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import styles from './About.module.css';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const skills = [
        { name: 'Frontend Arch', icon: Code },
        { name: 'UI/UX Design', icon: Palette },
        { name: 'Next.js 15', icon: Zap },
        { name: 'Backend Logic', icon: Cpu },
        { name: 'Web Perform', icon: Globe },
        { name: 'Mobile First', icon: Smartphone },
        { name: 'Node.js', icon: Server },
        { name: 'Cloud Infra', icon: Layers }
    ];

    const timeline = [
        {
            date: '2024 — PRESENT',
            title: 'Full Stack Architect',
            company: 'Sanjivani Studios',
            desc: 'Leading the digital transformation of studio workflows through bespoke web solutions. Focusing on performance-first architecture and seamless user experiences.'
        },
        {
            date: '2023 — 2024',
            title: 'Creative Developer',
            company: 'Freelance & Open Source',
            desc: 'Explored the intersection of design and code. Contributed to various projects focusing on interactive UI and accessible web components.'
        },
        {
            date: '2022 — 2023',
            title: 'Junior Frontend Developer',
            company: 'Digital Agency',
            desc: 'Started the journey into the web. Mastered the fundamentals of HTML, CSS, and modern JavaScript libraries.'
        }
    ];

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <motion.span
                        className={styles.aboutLabel}
                        {...fadeIn}
                        transition={{ duration: 0.5 }}
                    >
                        About Me
                    </motion.span>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    >
                        Elegance <span className={styles.highlight}>in Code</span>
                    </motion.h1>

                    <div className={styles.heroCardWrapper}>
                        <motion.div
                            className={styles.heroCard}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <div className={styles.heroAvatar}>
                                <Code size={32} color="#22c55e" />
                            </div>
                            <p className={styles.heroText}>
                                I craft digital experiences that blend form and function.
                                My code is as clean as my design. Driven by a passion for minimalist aesthetics
                                and technical excellence.
                            </p>
                        </motion.div>
                        <div className={styles.heroCardGlow} />
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <motion.div className={styles.sectionHeader} {...fadeIn}>
                        <h2 className={styles.sectionTitle}>My Philosophy</h2>
                    </motion.div>

                    <div className={styles.philosophyGrid}>
                        <motion.div
                            className={styles.philosophyItem}
                            {...fadeIn}
                            transition={{ delay: 0.1 }}
                        >
                            <h3>Simplicity</h3>
                            <p>I believe in the power of minimalism. Removing the unnecessary to let the essential shine, creating interfaces that are intuitive and clutter-free.</p>
                        </motion.div>
                        <motion.div
                            className={styles.philosophyItem}
                            {...fadeIn}
                            transition={{ delay: 0.2 }}
                        >
                            <h3>Precision</h3>
                            <p>Every pixel and every line of code matters. I strive for technical perfection to ensure reliability, accessibility, and high performance.</p>
                        </motion.div>
                        <motion.div
                            className={styles.philosophyItem}
                            {...fadeIn}
                            transition={{ delay: 0.3 }}
                        >
                            <h3>Innovation</h3>
                            <p>Constantly exploring new horizons in web technology. Adapting to the latest trends while maintaining timeless design principles.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.skillsWrapper}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className={styles.skillsGrid}>
                            {skills.map((skill, index) => {
                                const Icon = skill.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className={styles.skillItem}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={styles.skillIcon}>
                                            <Icon size={24} />
                                        </div>
                                        <span className={styles.skillName}>{skill.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Professional Journey */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <motion.div className={styles.sectionHeader} {...fadeIn}>
                        <h2 className={styles.sectionTitle}>Professional Journey</h2>
                    </motion.div>

                    <div className={styles.journeyTimeline}>
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                className={styles.journeyItem}
                                {...fadeIn}
                                transition={{ delay: index * 0.2 }}
                            >
                                <span className={styles.journeyDate}>{item.date}</span>
                                <div className={styles.journeyContent}>
                                    <h3>{item.title}</h3>
                                    <h4>{item.company}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <motion.div {...fadeIn}>
                        <h2>Let's Build Something Together</h2>
                        <p>Available for freelance projects and collaborations</p>

                        <div className={styles.ctaActions}>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className={styles.primaryBtn}>
                                    Get in Touch <ArrowRight size={18} />
                                </Link>
                                <a
                                    href="/assets/resume.pdf"
                                    download
                                    className={styles.secondaryBtn}
                                >
                                    Download CV
                                </a>
                            </div>


                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;

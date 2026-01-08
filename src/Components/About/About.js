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
    ArrowRight,
    Monitor,
    Coffee,
    Database,
    Leaf,
    Rocket,
    Atom,
    FileCode
} from 'lucide-react';
import Link from 'next/link';
import styles from './About.module.css';

const About = () => {
    const [skillsData, setSkillsData] = React.useState([]);
    const [timelineData, setTimelineData] = React.useState([]);
    const [hasMounted, setHasMounted] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const iconMap = {
        code: Code,
        palette: Palette,
        zap: Zap,
        cpu: Cpu,
        globe: Globe,
        smartphone: Smartphone,
        server: Server,
        layers: Layers,
        monitor: Monitor,
        coffee: Coffee,
        database: Database,
        leaf: Leaf,
        rocket: Rocket,
        atom: Atom,
        'js-square': FileCode,
        filecode: FileCode,
        java: Coffee,
        react: Atom,
        javascript: FileCode,
        html: Code,
        css: Palette,
        sql: Database,
        spring: Leaf,
        springboot: Rocket
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    React.useEffect(() => {
        setHasMounted(true);
        fetch('/api/data', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.skills) setSkillsData(data.skills);
                if (data.timeline) setTimelineData(data.timeline);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching about data:", err);
                setLoading(false);
            });
    }, []);

    if (!hasMounted || loading) {
        return (
            <div className={styles.pageContainer} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.highlight}>
                    Loading Excellence...
                </motion.div>
            </div>
        );
    }

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
                        It's <span className={styles.highlight}>Me</span>
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
                            {skillsData.map((skill, index) => {
                                const Icon = iconMap[skill.icon?.toLowerCase()] || Code;
                                return (
                                    <motion.div
                                        key={skill.id || index}
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
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={item.id || index}
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

            {/* CTA Section */}
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

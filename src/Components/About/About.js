'use client';
import React from 'react';
import styles from './About.module.css';

const About = () => {
    const skills = [
        { name: 'HTML5', level: '95%' },
        { name: 'CSS3', level: '90%' },
        { name: 'JavaScript', level: '85%' },
        { name: 'React', level: '80%' },
        { name: 'Next.js', level: '75%' },
        { name: 'Tailwind CSS', level: '90%' },
        { name: 'Node.js', level: '70%' },
        { name: 'Git/GitHub', level: '85%' },
    ];

    const experience = [
        {
            year: '2024 - Present',
            title: 'Full Stack Developer',
            company: 'Sanjivani Studios',
            desc: 'Building modern web applications and refining user experiences with React and Next.js.'
        },
        {
            year: '2023 - 2024',
            title: 'Frontend Developer Intern',
            company: 'Freelance Projects',
            desc: 'Developed responsive user interfaces and optimized website performance for various clients.'
        }
    ];

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>About Me</h1>
                    <p className={styles.description}>
                        A passionate developer dedicated to crafting beautiful and functional digital experiences.
                    </p>
                </div>
            </section>

            {/* Bio Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.bioWrapper}>
                        <h2 className={styles.sectionTitle}>My Story</h2>
                        <div className={styles.bioText}>
                            <p>
                                Hi! I'm a developer who loves turning complex problems into simple, beautiful, and intuitive designs.
                                My journey in tech started with a curiosity about how things work on the web, which led me to
                                master the art of frontend and backend development.
                            </p>
                            <p>
                                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                                or refining my design skills to ensure every project I touch has a premium feel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Technical Skills</h2>
                    <div className={styles.skillsGrid}>
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className={styles.skillCard}
                                style={{ animationDelay: `${0.1 * index}s` }}
                            >
                                <div className={styles.skillHeader}>
                                    <span className={styles.skillName}>{skill.name}</span>
                                    <span className={styles.skillPercent}>{skill.level}</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: skill.level }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    <div className={styles.timeline}>
                        {experience.map((exp, index) => (
                            <div
                                key={index}
                                className={styles.timelineItem}
                                style={{ animationDelay: `${0.2 * index}s` }}
                            >
                                <div className={styles.timelineYear}>{exp.year}</div>
                                <div className={styles.timelineContent}>
                                    <h3 className={exp.title}>{exp.title}</h3>
                                    <div className={styles.company}>{exp.company}</div>
                                    <p className={styles.timelineDesc}>{exp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

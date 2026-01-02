'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Instagram, Mail, Linkedin } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ name, intro }) {
    const socialLinks = [
        { name: 'GitHub', icon: Github, url: 'https://github.com/aad-law' },
        { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/aadlaw' },
        { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/aadlaw1' },
        { name: 'Email', icon: Mail, url: 'mailto:aadeshlawate19@gmail.com' },
        { name: 'LeetCode', icon: null, url: 'https://leetcode.com/aad-law' },
    ];

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
                        {intro || "I am a web developer skilled in building responsive and functional websites using modern web technologies. I work with HTML, CSS, JavaScript, React, and Next.js to develop clean user interfaces and reliable web applications, focusing on performance, usability, and maintainable code."}
                    </p>

                    <Link href="/projects" className={styles.ctaButton}>
                        View My Work
                        <ArrowRight size={20} />
                    </Link>
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

            {/* Footer - Social Media Links */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={styles.socialFooter}
            >
                <div className={styles.socialLinks}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label={link.name}
                        >
                            {link.icon ? (
                                <link.icon size={22} />
                            ) : (
                                // LeetCode custom icon
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.952a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                                </svg>
                            )}
                        </a>
                    ))}
                </div>

            </motion.div>
        </section>
    );
}
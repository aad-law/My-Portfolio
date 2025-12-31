"use client";
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={styles.card}
        >
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <Link href={project.link} className={styles.linkButton}>
                        <ExternalLink size={16} />
                    </Link>
                </div>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                    {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.overlay} />
        </motion.div>
    );
}

import React from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import styles from './Project.module.css';

const ProjectCard = ({ project }) => {
    return (
        <div className={styles.card}>
            {/* Image */}
            <div className={styles.imageContainer}>
                <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                />
                <div className={styles.imageOverlay} />

                {/* Floating Action Buttons */}
                <div className={styles.floatingButtons}>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.floatBtn}
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.floatBtn}
                    >
                        <ExternalLink size={20} />
                    </a>
                </div>

                {/* Category Badge */}
                <div className={styles.categoryBadge}>
                    <span className={styles.badge}>
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    {project.title}
                </h3>
                <p className={styles.cardDesc}>
                    {project.description}
                </p>

                {/* Tags */}
                <div className={styles.tags}>
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className={styles.tag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer with Code Icon */}
            <div className={styles.cardFooter}>
                <div className={styles.viewCode}>
                    <Code2 size={16} />
                    <span>View Code</span>
                </div>
                <div className={styles.footerLinks}>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.footerLink}
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.footerLink}
                    >
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

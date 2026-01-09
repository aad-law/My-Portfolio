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
                    {project.github && project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.floatBtn}
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {project.link && project.link !== '#' && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.floatBtn}
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>

                {/* Category Badge */}
                {project.category && (
                    <div className={styles.categoryBadge}>
                        <span className={styles.badge}>
                            {project.category}
                        </span>
                    </div>
                )}
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
                    {project.tags && project.tags.map(tag => (
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
                    <span>Project Links</span>
                </div>
                <div className={styles.footerLinks}>
                    {project.github && project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {project.link && project.link !== '#' && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerLink}
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

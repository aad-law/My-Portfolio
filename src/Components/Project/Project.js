'use client';
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import styles from './Project.module.css';
import ProjectCard from './ProjectCard';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/data')
            .then((res) => res.json())
            .then((data) => {
                if (data && data.projects) {
                    setProjects(data.projects);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.pageContainer}>

            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>My Projects</h1>
                    <p className={styles.description}>
                        A collection of web applications and projects I've built using modern technologies
                    </p>
                </div>
            </div>

            {/* GitHub Contributions */}
            <div className={styles.statsSection}>
                <div className={styles.statsContainer}>
                    <div className={styles.statsHeader}>
                        <h2 className={styles.statsTitle}>
                            <Github className="w-6 h-6" />
                            GitHub Activity
                        </h2>
                        <a
                            href="https://github.com/aad-law"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.profileLink}
                        >
                            View Profile
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* GitHub Contribution Graph */}
                    <div className={styles.contributionGraph}>
                        <img
                            src="https://ghchart.rshah.org/2ea44f/aad-law"
                            alt="GitHub Contributions"
                            className={styles.graphAttributes}
                        />
                    </div>

                    {/* Stats */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>400+</div>
                            <div className={styles.statLabel}>Contributions</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>15</div>
                            <div className={styles.statLabel}>Repositories</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>30+</div>
                            <div className={styles.statLabel}>Streak Days</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className={styles.gridContainer}>
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#8b949e', padding: '2rem' }}>Loading projects...</div>
                ) : (
                    <div className={styles.projectsGrid}>
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Project;

'use client';
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import styles from './Project.module.css';
import ProjectCard from './ProjectCard';
import GitHubCalendar from './GitHubCalendar';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [githubSettings, setGithubSettings] = useState({ username: 'aad-law', themeColor: '#22c55e' });
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(null);
    const [availableYears, setAvailableYears] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const currentYear = new Date().getFullYear();
        setSelectedYear(currentYear);

        const years = [];
        for (let i = currentYear; i >= currentYear - 3; i--) {
            years.push(i);
        }
        setAvailableYears(years);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;

        const fetchData = async () => {
            try {
                const res = await fetch('/api/data', { cache: 'no-store' });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const data = await res.json();
                if (data && data.projects) {
                    setProjects(data.projects);
                }
                if (data && data.github) {
                    setGithubSettings(data.github);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [hasMounted]);

    useEffect(() => {
        if (!hasMounted || !selectedYear) return;

        fetch(`/api/github?username=${githubSettings.username}&year=${selectedYear}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.total && data.total[selectedYear]) {
                    setTotalContributions(data.total[selectedYear]);
                }
            })
            .catch(err => console.error("Error fetching contributions:", err));
    }, [hasMounted, githubSettings.username, selectedYear]);

    const refreshHeader = () => {
        if (!hasMounted || !selectedYear) return;
        fetch(`/api/github?username=${githubSettings.username}&year=${selectedYear}&refresh=true`)
            .then(res => res.json())
            .then(data => {
                if (data && data.total && data.total[selectedYear]) {
                    setTotalContributions(data.total[selectedYear]);
                }
            })
            .catch(err => console.error("Error refreshing contributions:", err));
    };

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>My Projects</h1>
                    {hasMounted && (
                        <p className={styles.description}>
                            A collection of web applications and projects I've built using modern technologies
                        </p>
                    )}
                </div>
            </div>

            {hasMounted && selectedYear && (
                <>


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


                    {/* GitHub Contributions */}
                    <div className={styles.statsSection}>
                        <div className={styles.statsWrapper}>
                            <div className={styles.statsMain}>
                                <div className={styles.statsHeaderTop}>
                                    <h2 className={styles.contributionCount}>
                                        {totalContributions} contributions in {selectedYear}
                                    </h2>
                                </div>

                                {/* GitHub Contribution Graph */}
                                <div className={styles.contributionGraphContainer}>
                                    <GitHubCalendar
                                        username={githubSettings.username}
                                        year={selectedYear}
                                        themeColor={githubSettings.themeColor}
                                        onRefresh={refreshHeader}
                                    />
                                </div>
                            </div>

                            {/* Vertical Year Selector on the right */}
                            <div className={styles.yearSidebar}>
                                {availableYears.map(year => (
                                    <button
                                        key={year}
                                        className={`${styles.yearBtn} ${selectedYear === year ? styles.yearBtnActive : ''}`}
                                        onClick={() => setSelectedYear(year)}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Project;

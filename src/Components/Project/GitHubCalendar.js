'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './GitHubCalendar.module.css';

const GitHubCalendar = ({ username, year, themeColor, onRefresh }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchData = useCallback(async (isRetry = false, isForce = false) => {
        if (!isRetry) {
            setLoading(true);
            setError(null);
        }

        try {
            const res = await fetch(`/api/github?username=${username}${year ? `&year=${year}` : ''}${isForce ? '&refresh=true' : ''}`);
            if (!res.ok) throw new Error('Failed to fetch');

            const resData = await res.json();
            if (resData.error) throw new Error(resData.error);

            setData(resData);
            setLoading(false);
            setRetryCount(0);

            // If this was a manual refresh, also trigger the parent's refresh
            if (isForce && onRefresh) {
                onRefresh();
            }
        } catch (err) {
            console.error("Error fetching GitHub data:", err);

            if (retryCount < 3 && !isForce) {
                // Exponential backoff
                const delay = Math.pow(2, retryCount) * 1000;
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    fetchData(true);
                }, delay);
            } else {
                setError(err.message);
                setLoading(false);
            }
        }
    }, [username, year, retryCount]);

    useEffect(() => {
        fetchData();
    }, [username, year]);

    if (loading && !data) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.shimmer}></div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>Failed to load activity data</p>
                <button onClick={() => fetchData()} className={styles.retryBtn}>
                    Try Again
                </button>
            </div>
        );
    }

    if (!data || !data.contributions) {
        return <div className={styles.error}>No data found for this year</div>;
    }

    // Process data into weeks for rendering
    const contributions = data.contributions;
    const weeks = [];
    let currentWeek = [];

    contributions.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === contributions.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    // Extract months for labels
    const monthLabels = [];
    let lastMonth = -1;
    weeks.forEach((week, index) => {
        const firstDay = new Date(week[0].date);
        const month = firstDay.getMonth();
        if (month !== lastMonth) {
            monthLabels.push({ name: firstDay.toLocaleString('default', { month: 'short' }), index });
            lastMonth = month;
        }
    });

    return (
        <div className={`${styles.calendarBox} ${loading ? styles.calendarFaded : ''}`}>
            <div className={styles.topRow}>
                <div className={styles.monthLabels}>
                    {monthLabels.map((m, i) => (
                        <div key={i} className={styles.monthLabel} style={{ gridColumn: m.index + 2 }}>
                            {m.name}
                        </div>
                    ))}
                </div>
                <button
                    className={styles.refreshBtn}
                    onClick={() => fetchData(false, true)}
                    disabled={loading}
                    title="Refresh contributions"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={`${styles.refreshIcon} ${loading ? styles.spinning : ''}`}
                    >
                        <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                </button>
            </div>

            <div className={styles.calendarBody}>
                <div className={styles.weekdayLabels}>
                    <div className={styles.weekdayLabel}>   </div>
                    <div className={styles.weekdayLabel}>   </div>
                    <div className={styles.weekdayLabel}></div>
                    <div className={styles.weekdayLabel}></div>
                    <div className={styles.weekdayLabel}></div>
                    <div className={styles.weekdayLabel}></div>
                    <div className={styles.weekdayLabel}></div>
                </div>

                <div className={styles.grid}>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={styles.week}>
                            {week.map((day, dayIndex) => (
                                <div
                                    key={day.date}
                                    className={styles.day}
                                    style={{
                                        backgroundColor: day.level === 0 ? '#161b22' : themeColor,
                                        opacity: day.level === 0 ? 1 : day.level * 0.25 + 0.1,
                                    }}
                                    title={`${day.count} contributions on ${day.date}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.learnLink}>

                </div>
                <div className={styles.legend}>
                    <span>Less</span>
                    <div className={styles.legendBoxes}>
                        {[0, 1, 2, 3, 4].map(level => (
                            <div
                                key={level}
                                className={styles.legendBox}
                                style={{
                                    backgroundColor: level === 0 ? '#161b22' : themeColor,
                                    opacity: level === 0 ? 1 : level * 0.25 + 0.1
                                }}
                            />
                        ))}
                    </div>
                    {/* <span>More</span> */}
                </div>
            </div>
        </div>
    );
};

export default GitHubCalendar;

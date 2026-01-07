"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Login.module.css';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                // Set cookie or session token here if needed
                // For now, we'll just redirect to admin
                window.location.href = '/admin';
            } else {
                setError('Invalid password. Access denied.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <motion.div
                className={styles.loginCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.iconWrapper}>
                    <Lock size={32} className={styles.icon} />
                </div>

                <h1 className={styles.title}>Secure Access</h1>
                <p className={styles.subtitle}>Enter password to access the administrative dashboard</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={styles.input}
                            autoFocus
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitBtn}
                    >
                        {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div className={styles.footer}>
                    <ShieldCheck size={14} />
                    <span>Protected Environment</span>
                </div>
            </motion.div>
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase.config';
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get ID token
            const idToken = await user.getIdToken();

            // Send token to server to set cookie
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const data = await response.json();

            if (data.success) {
                window.location.href = '/admin';
            } else {
                setError('Authentication failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/user-not-found') {
                setError('No account found with this email');
            } else {
                setError('Something went wrong. Please try again.');
            }
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
                <p className={styles.subtitle}>Enter credentials to access the administrative dashboard</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className={styles.input}
                            autoFocus
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={styles.input}
                            required
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
                    <span>Protected by Firebase Auth</span>
                </div>
            </motion.div>
        </div>
    );
}

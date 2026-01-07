'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(result.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.contactPage}>
            <div className={styles.backgroundPattern} />

            <div className={styles.container}>
                {/* Left Section */}
                <motion.div
                    className={styles.leftSection}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className={styles.title}>
                        Get in <br />
                        <span className={styles.accent}>Touch.</span>
                    </h1>
                </motion.div>

                {/* Right Section */}
                <motion.div
                    className={styles.rightSection}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2 className={styles.formTitle}>Contact Me</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <User className={styles.icon} size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="YOUR NAME"
                                    className={styles.input}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <Mail className={styles.icon} size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="YOUR EMAIL"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <MessageSquare className={styles.iconTextArea} size={20} />
                                <textarea
                                    name="message"
                                    placeholder="YOUR MESSAGE"
                                    className={styles.textarea}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className={styles.submitBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>

                        {status.message && (
                            <motion.div
                                className={`${styles.statusMessage} ${styles[status.type]}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {status.message}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

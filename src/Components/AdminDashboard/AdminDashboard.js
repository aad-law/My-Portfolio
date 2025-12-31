"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, Trash2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard({ initialData }) {
    const [data, setData] = useState(initialData);
    const [activeTab, setActiveTab] = useState('projects');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        setSaving(false);
        alert('Saved successfully!');
        router.refresh();
    };

    const removeItem = (type, id) => {
        setData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.id !== id)
        }));
    };

    const addItem = (type) => {
        const newItem = type === 'projects'
            ? { id: Date.now().toString(), title: "New Project", description: "Desc", link: "#", tags: ["Tag"] }
            : { id: Date.now().toString(), name: "New Skill", level: "Beginner" };

        setData(prev => ({
            ...prev,
            [type]: [...prev[type], newItem]
        }));
    };

    const updateItem = (type, id, field, value) => {
        setData(prev => ({
            ...prev,
            [type]: prev[type].map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const updateTags = (id, tagsString) => {
        const tags = tagsString.split(',').map(t => t.trim());
        updateItem('projects', id, 'tags', tags);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Admin Dashboard</h1>
                <div className={styles.headerActions}>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={styles.saveButton}
                    >
                        <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <a href="/api/auth/logout" className={styles.logoutButton}>
                        <LogOut size={20} />
                    </a>
                </div>
            </header>

            <div className={styles.tabContainer}>
                {['projects', 'skills'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles.tab} ${activeTab === tab ? styles.tabActive : styles.tabInactive}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles.grid}
                    >
                        {activeTab === 'projects' && (
                            <>
                                {data.projects.map((project) => (
                                    <div key={project.id} className={styles.projectCard}>
                                        <div className={styles.projectHeader}>
                                            <input
                                                value={project.title}
                                                onChange={(e) => updateItem('projects', project.id, 'title', e.target.value)}
                                                className={styles.projectTitleInput}
                                            />
                                            <button onClick={() => removeItem('projects', project.id)} className={styles.deleteButton}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => updateItem('projects', project.id, 'description', e.target.value)}
                                            className={styles.textarea}
                                        />
                                        <div className={styles.inputGrid}>
                                            <input
                                                value={project.link}
                                                onChange={(e) => updateItem('projects', project.id, 'link', e.target.value)}
                                                className={styles.input}
                                                placeholder="Link URL"
                                            />
                                            <input
                                                value={project.tags.join(', ')}
                                                onChange={(e) => updateTags(project.id, e.target.value)}
                                                className={styles.input}
                                                placeholder="Tags (comma separated)"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addItem('projects')} className={styles.addButton}>
                                    <Plus size={20} /> Add Project
                                </button>
                            </>
                        )}

                        {activeTab === 'skills' && (
                            <div className={styles.skillsGrid}>
                                {data.skills.map((skill) => (
                                    <div key={skill.id} className={styles.skillCard}>
                                        <div className={styles.skillContent}>
                                            <input
                                                value={skill.name}
                                                onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
                                                className={styles.skillNameInput}
                                            />
                                            <select
                                                value={skill.level}
                                                onChange={(e) => updateItem('skills', skill.id, 'level', e.target.value)}
                                                className={styles.skillLevelSelect}
                                            >
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                                <option>Expert</option>
                                            </select>
                                        </div>
                                        <button onClick={() => removeItem('skills', skill.id)} className={styles.deleteButton}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button onClick={() => addItem('skills')} className={styles.addSkillButton}>
                                    <Plus size={20} /> Add Skill
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

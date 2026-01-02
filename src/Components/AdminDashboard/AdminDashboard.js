"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, Trash2, LogOut, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard({ initialData }) {
    const [data, setData] = useState(initialData);
    const [activeTab, setActiveTab] = useState('projects');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/data', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            alert('Saved successfully!');
            router.refresh();
        } catch (error) {
            alert('Failed to save');
        }
        setSaving(false);
    };

    const removeItem = (type, id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setData(prev => ({
                ...prev,
                [type]: prev[type].filter(item => item.id !== id)
            }));
        }
    };

    const addItem = (type) => {
        const newItem = type === 'projects'
            ? {
                id: Date.now().toString(),
                title: "New Project",
                description: "Project description...",
                link: "#",
                image: "https://images.unsplash.com/photo-1557821552-17105176677c",
                tags: ["React"]
            }
            : { id: Date.now().toString(), name: "New Skill", level: "Beginner" };

        setData(prev => ({
            ...prev,
            [type]: [...prev[type], newItem]
        }));
    };

    const handleImageUpload = async (e, type, id) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                updateItem(type, id, 'image', data.url);
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Upload failed');
        }
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
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={activeTab === 'projects' ? styles.grid : styles.skillsGrid}
                >
                    {activeTab === 'projects' && (
                        <>
                            {data.projects.map((project) => (
                                <div key={project.id} className={styles.projectCard}>
                                    <div className={styles.cardHeader}>
                                        <input
                                            value={project.title}
                                            onChange={(e) => updateItem('projects', project.id, 'title', e.target.value)}
                                            className={styles.titleInput}
                                            placeholder="Project Title"
                                        />
                                        <button onClick={() => removeItem('projects', project.id)} className={styles.deleteButton}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Image Input & Preview */}
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Project Image</label>
                                        <div className={styles.row}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'projects', project.id)}
                                                className={styles.fileInput}
                                            />
                                            {/* Fallback to URL if needed */}
                                            <input
                                                value={project.image || ''}
                                                onChange={(e) => updateItem('projects', project.id, 'image', e.target.value)}
                                                className={styles.input}
                                                placeholder="Or paste URL..."
                                                style={{ width: '40%' }}
                                            />
                                        </div>
                                        <div className={styles.imagePreviewContainer}>
                                            {project.image ? (
                                                <img src={project.image} alt="Preview" className={styles.imagePreview} onError={(e) => e.target.style.display = 'none'} />
                                            ) : (
                                                <span className={styles.noImage}><ImageIcon size={24} /> No Image</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Description</label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => updateItem('projects', project.id, 'description', e.target.value)}
                                            className={styles.textarea}
                                            placeholder="Description..."
                                        />
                                    </div>

                                    <div className={styles.row}>
                                        <div className={styles.col}>
                                            <label className={styles.label}>Demo Link</label>
                                            <input
                                                value={project.link || ''}
                                                onChange={(e) => updateItem('projects', project.id, 'link', e.target.value)}
                                                className={styles.input}
                                                placeholder="#"
                                            />
                                        </div>
                                        <div className={styles.col}>
                                            <label className={styles.label}>GitHub Link</label>
                                            <input
                                                value={project.github || ''}
                                                onChange={(e) => updateItem('projects', project.id, 'github', e.target.value)}
                                                className={styles.input}
                                                placeholder="#"
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1rem' }}>
                                        <label className={styles.label}>Tags</label>
                                        <input
                                            value={project.tags ? project.tags.join(', ') : ''}
                                            onChange={(e) => updateTags(project.id, e.target.value)}
                                            className={styles.input}
                                            placeholder="React, Next.js, CSS"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addItem('projects')} className={styles.addButton}>
                                <Plus size={20} /> Add New Project
                            </button>
                        </>
                    )}

                    {activeTab === 'skills' && (
                        <>
                            {data.skills.map((skill) => (
                                <div key={skill.id} className={styles.projectCard}>
                                    <div className={styles.cardHeader}>
                                        <input
                                            value={skill.name}
                                            onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
                                            className={styles.titleInput}
                                            placeholder="Skill Name"
                                        />
                                        <button onClick={() => removeItem('skills', skill.id)} className={styles.deleteButton}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <select
                                        value={skill.level}
                                        onChange={(e) => updateItem('skills', skill.id, 'level', e.target.value)}
                                        className={styles.input}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                        <option>Expert</option>
                                    </select>
                                </div>
                            ))}
                            <button onClick={() => addItem('skills')} className={styles.addButton}>
                                <Plus size={20} /> Add New Skill
                            </button>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

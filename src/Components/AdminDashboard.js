"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Trash2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
        router.refresh(); // Refresh server components
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
        <div className="min-h-screen bg-black text-white p-8 pb-32">
            <header className="max-w-4xl mx-auto flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                        <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <a href="/api/auth/logout" className="p-2 bg-[#1a1a1a] rounded-full text-red-400 hover:bg-red-400/10">
                        <LogOut size={20} />
                    </a>
                </div>
            </header>

            <div className="max-w-4xl mx-auto mb-8 flex gap-4">
                {['projects', 'skills'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full capitalize transition-colors ${activeTab === tab ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid gap-6"
                    >
                        {activeTab === 'projects' && (
                            <>
                                {data.projects.map((project) => (
                                    <div key={project.id} className="bg-[#121212] border border-[#2a2a2a] p-6 rounded-xl flex flex-col gap-4">
                                        <div className="flex justify-between">
                                            <input
                                                value={project.title}
                                                onChange={(e) => updateItem('projects', project.id, 'title', e.target.value)}
                                                className="bg-transparent text-xl font-bold outline-none border-b border-transparent focus:border-white/20 w-full mr-4"
                                            />
                                            <button onClick={() => removeItem('projects', project.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded"><Trash2 size={18} /></button>
                                        </div>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => updateItem('projects', project.id, 'description', e.target.value)}
                                            className="bg-[#1a1a1a] p-3 rounded text-[#aaa] w-full resize-none h-24 outline-none"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                value={project.link}
                                                onChange={(e) => updateItem('projects', project.id, 'link', e.target.value)}
                                                className="bg-[#1a1a1a] p-2 rounded text-sm text-[#888]"
                                                placeholder="Link URL"
                                            />
                                            <input
                                                value={project.tags.join(', ')}
                                                onChange={(e) => updateTags(project.id, e.target.value)}
                                                className="bg-[#1a1a1a] p-2 rounded text-sm text-[#888]"
                                                placeholder="Tags (comma separated)"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-[#2a2a2a] rounded-xl text-[#444] hover:border-[#444] hover:text-[#666] flex items-center justify-center gap-2 transition-colors">
                                    <Plus size={20} /> Add Project
                                </button>
                            </>
                        )}

                        {activeTab === 'skills' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.skills.map((skill) => (
                                    <div key={skill.id} className="bg-[#121212] border border-[#2a2a2a] p-4 rounded-xl flex items-center gap-4">
                                        <div className="flex-1 space-y-2">
                                            <input
                                                value={skill.name}
                                                onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
                                                className="bg-transparent font-medium outline-none w-full"
                                            />
                                            <select
                                                value={skill.level}
                                                onChange={(e) => updateItem('skills', skill.id, 'level', e.target.value)}
                                                className="bg-[#1a1a1a] text-xs px-2 py-1 rounded text-[#888] outline-none"
                                            >
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                                <option>Expert</option>
                                            </select>
                                        </div>
                                        <button onClick={() => removeItem('skills', skill.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button onClick={() => addItem('skills')} className="w-full h-full min-h-[100px] border-2 border-dashed border-[#2a2a2a] rounded-xl text-[#444] hover:border-[#444] hover:text-[#666] flex items-center justify-center gap-2 transition-colors">
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

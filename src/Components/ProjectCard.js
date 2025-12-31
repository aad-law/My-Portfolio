"use client";
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-white/20 transition-colors"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#e0e0e0] group-hover:text-white transition-colors">{project.title}</h3>
                    <Link href={project.link} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <ExternalLink size={16} />
                    </Link>
                </div>
                <p className="text-[#a0a0a0] mb-6 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-[#1a1a1a] rounded text-[#888] border border-[#333]">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
}

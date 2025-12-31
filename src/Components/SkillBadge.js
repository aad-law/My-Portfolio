"use client";
import { motion } from 'framer-motion';

export default function SkillBadge({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg hover:border-white/20 transition-colors"
        >
            <span className="font-medium text-[#e0e0e0]">{skill.name}</span>
            <span className="text-xs text-[#666] uppercase tracking-wider">{skill.level}</span>
        </motion.div>
    );
}

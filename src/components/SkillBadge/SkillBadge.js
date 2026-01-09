"use client";
import { motion } from 'framer-motion';
import styles from './SkillBadge.module.css';

export default function SkillBadge({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={styles.badge}
        >
            <span className={styles.skillName}>{skill.name}</span>
            <span className={styles.skillLevel}>{skill.level}</span>
        </motion.div>
    );
}

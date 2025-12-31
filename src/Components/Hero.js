'use client';
import { motion } from 'framer-motion';

export default function Hero({ name, role, bio }) {
    return (
        <section className="mb-32 text-center md:text-left">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }} // Delay to sync with Intro
            >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#666] mb-6">
                    {name}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
            >
                <h2 className="text-2xl md:text-3xl text-[#888] mb-8 font-light">
                    {role}
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
            >
                <p className="max-w-2xl text-[#a0a0a0] text-lg leading-relaxed mx-auto md:mx-0">
                    {bio}
                </p>
            </motion.div>
        </section>
    );
}

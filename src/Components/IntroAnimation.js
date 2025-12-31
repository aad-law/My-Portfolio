'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroAnimation({ onComplete }) {
    const [showHello, setShowHello] = useState(false);

    useEffect(() => {
        // 1. Black screen for 1 second (Wait 1000ms)
        // 2. Show "Hello"
        // 3. Wait a bit, then pull screen (onComplete renders the exit)

        const timer1 = setTimeout(() => {
            setShowHello(true);
        }, 1000);

        const timer2 = setTimeout(() => {
            onComplete();
        }, 2500); // 1s load + 1.5s display time

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            initial={{ x: 0 }}
            exit={{ x: '-100vw', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        >

            {showHello && (
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-white text-5xl md:text-8xl font-light tracking-widest font-[family-name:var(--font-geist-sans)]"
                >
                    Hello
                </motion.h1>
            )}
        </motion.div>
    );
}

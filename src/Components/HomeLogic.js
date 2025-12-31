'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroAnimation from './IntroAnimation';

export default function HomeLogic({ children }) {
    const [showIntro, setShowIntro] = useState(true);

    // Optional: Disable scroll while intro is showing
    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showIntro]);

    return (
        <>
            <AnimatePresence mode="wait">
                {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
            </AnimatePresence>
            <main>
                {children}
            </main>
        </>
    );
}

'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroAnimation from '../IntroAnimation/IntroAnimation';

export default function HomeLogic({ children }) {
    const [showIntro, setShowIntro] = useState(true);

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

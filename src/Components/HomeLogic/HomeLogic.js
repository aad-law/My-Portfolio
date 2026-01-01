'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroAnimation from '../IntroAnimation/IntroAnimation';

export default function HomeLogic({ children }) {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        // Check if intro has been shown in this session
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

        if (!hasSeenIntro) {
            // First time in this session - show intro
            setShowIntro(true);
            // Prevent scrolling during intro and on home page
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Already seen intro in this session - skip it
            setShowIntro(false);
        }
    }, []);

    const handleIntroComplete = () => {
        setShowIntro(false);
        // Mark intro as seen for this session
        sessionStorage.setItem('hasSeenIntro', 'true');
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
            </AnimatePresence>
            <main>
                {children}
            </main>
        </>
    );
}

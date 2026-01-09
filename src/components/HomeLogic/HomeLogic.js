'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroAnimation from '../IntroAnimation/IntroAnimation';

export default function HomeLogic({ children }) {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        // Enforce no scrolling on Home Page
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Check if intro has been shown in this session
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

        if (!hasSeenIntro) {
            setShowIntro(true);
        } else {
            setShowIntro(false);
        }

        // Cleanup: Allow scrolling again when leaving Home Page
        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
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

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={handleSubmit}
                className="glass p-12 rounded-2xl w-full max-w-md flex flex-col gap-6"
            >
                <h1 className="text-3xl font-bold text-center text-white mb-4">Admin Access</h1>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#121212] border border-[#333] p-4 rounded-xl text-white outline-none focus:border-white/50 transition-colors"
                />
                {error && <p className="text-red-500 text-sm text-center">Invalid Password</p>}
                <button
                    type="submit"
                    className="bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors"
                >
                    Login
                </button>
            </motion.form>
        </div>
    );
}

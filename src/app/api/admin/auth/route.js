import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Fallback for local dev if not set

        if (password === adminPassword) {
            const response = NextResponse.json({ success: true });

            // Set a simple auth cookie. In a real app, this would be a JWT.
            // For this portfolio, we'll use a simple token.
            cookies().set('admin_auth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

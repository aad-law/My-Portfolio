import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    const { password } = body;

    // Hardcoded password for demonstration. Change this!
    if (password === 'admin123') {
        const cookieStore = await cookies();
        cookieStore.set('auth_token', 'display_token', {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}

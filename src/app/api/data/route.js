import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getData, saveData } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
    const data = await getData();
    return NextResponse.json(data);
}

export async function POST(request) {
    // Security Handle: Check for admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_auth');

    if (!token) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const success = await saveData(body);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

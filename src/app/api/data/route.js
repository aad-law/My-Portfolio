import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/api';

export async function GET() {
    const data = await getData();
    return NextResponse.json(data);
}

export async function POST(request) {
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

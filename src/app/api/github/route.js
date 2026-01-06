import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const year = searchParams.get('year');

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    try {
        const url = `https://github-contributions-api.jogruber.de/v4/${username}${year ? `?y=${year}` : ''}`;
        
        const response = await fetch(url, {
            next: { revalidate: 300 } // Next.js cache: 5 minutes
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: response.status === 404 ? 'User not found' : 'Failed to fetch data' },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });
    } catch (error) {
        console.error('GitHub Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
}
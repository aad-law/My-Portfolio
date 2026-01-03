import { NextResponse } from 'next/server';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 300 * 1000; // 5 minutes

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const year = searchParams.get('year');
    const forceRefresh = searchParams.get('refresh') === 'true';

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cacheKey = `${username}-${year || 'last'}`;
    const cachedData = cache.get(cacheKey);

    if (!forceRefresh && cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
        return NextResponse.json(cachedData.data);
    }

    try {
        const bust = Date.now();
        const url = `https://github-contributions-api.jogruber.de/v4/${username}${year ? `?y=${year}` : ''}${year ? '&' : '?'}t=${bust}`;
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch from upstream: ${response.statusText}`);
        }

        const data = await response.json();

        // Store in cache
        cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('GitHub Proxy Error:', error);

        // If we have stale cache, return it even if expired rather than failing
        if (cachedData) {
            return NextResponse.json(cachedData.data);
        }

        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
}

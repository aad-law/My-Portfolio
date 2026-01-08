import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';

export async function POST(request) {
    // Security Handle: Check for admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_auth');

    if (!token) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    try {
        await writeFile(
            path.join(uploadDir, filename),
            buffer
        );
        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { storage } from '@/lib/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(request) {
    // Security Handle: Check for admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_auth');

    if (!token) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}_${file.name.replaceAll(" ", "_")}`;

        // Upload to Firebase Storage
        const storageRef = ref(storage, `uploads/${filename}`);
        const metadata = {
            contentType: file.type,
        };

        await uploadBytes(storageRef, buffer, metadata);

        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);

        return NextResponse.json({
            success: true,
            url: downloadURL
        });
    } catch (error) {
        console.log("Error occurred:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}

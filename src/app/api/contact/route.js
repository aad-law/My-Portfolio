import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req) {
  if (!resend) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    );
  }
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Send notification to you
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL || email,
      subject: `New Message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #22c55e;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f4f4f4; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
    });

    // 2. Send Auto-Reply to the sender
    await resend.emails.send({
      from: 'Aadesh Lawate <onboarding@resend.dev>',
      to: email,
      subject: 'Message Received - Aadesh Lawate',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #22c55e;">Thanks for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and I'll get back to you as soon as possible.</p>
          <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #22c55e; background: #f9f9f9;">
            <p style="margin: 0; color: #666; font-style: italic;">" ${message} "</p>
          </div>
          <p>Best regards,<br><strong>Aadesh Lawate</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8rem; color: #999;">This is an automated response to confirm your message was received.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

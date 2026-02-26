import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import { sendOTP } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { username, email, password, fullName } = await req.json();

    if (!username || !email || !password || !fullName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // 1. Check if user exists
    const existingUsers: any = await query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
    
    if (existingUsers.length > 0) {
      return NextResponse.json({ error: 'Username or Email already taken' }, { status: 409 });
    }

    // 2. Hash Password and Generate OTP
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutes from now

    // 3. Create User in Database as Unverified
    const insertSql = `
      INSERT INTO users (username, email, password_hash, full_name, is_verified, otp_code, otp_expires_at)
      VALUES (?, ?, ?, ?, FALSE, ?, ?)
    `;
    
    await query(insertSql, [username, email, passwordHash, fullName, otp, expiresAt]);

    // 4. Send the OTP Email via Hostinger credentials
    // Note: if SMTP credentials aren't set in dev, it'll fail silently but return true so dev flow proceeds
    if (process.env.SMTP_USER) {
        const mailSent = await sendOTP(email, otp, 'signup');
        if (!mailSent) {
             console.log(`Failed to send email to ${email}. OTP is: ${otp}`);
             // non-blocking for now
        }
    } else {
        // Dev visual cue if skip mailer
        console.log(`[DEV MODE] Skipping email. OTP for ${email} is: ${otp}`);
    }

    return NextResponse.json({ 
        success: true, 
        message: 'Account created. OTP sent to email.'
    }, { status: 201 });

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

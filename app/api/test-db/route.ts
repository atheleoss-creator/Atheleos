import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const start = Date.now();
    const result: any = await query('SELECT 1 + 1 AS result');
    const duration = Date.now() - start;

    return NextResponse.json({ 
        success: true, 
        message: 'Successfully connected to MySQL database', 
        testQuery: result[0],
        durationMs: duration
    }, { status: 200 });

  } catch (error: any) {
    console.error('Database Connection Error:', error);
    return NextResponse.json({ 
        success: false, 
        message: 'Failed to connect to MySQL database',
        error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

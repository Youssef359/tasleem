import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { createSessionSchema } from '@/lib/validation';
import { requireAuth, getCurrentDbUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    if (user.role !== 'DEVELOPER') {
      return new NextResponse('Only developers can create sessions', { status: 403 });
    }

    const body = await req.json();
    const parsed = createSessionSchema.parse(body);

    const inviteToken = crypto.randomBytes(18).toString('hex');

    const session = await prisma.session.create({
      data: {
        title: parsed.title,
        description: parsed.description,
        price: parsed.price,
        deadline: parsed.deadline ? new Date(parsed.deadline) : undefined,
        inviteToken,
        status: 'INVITED',
        developerId: user.id,
      },
    });

    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/s/${inviteToken}`;

    return NextResponse.json({ session, inviteLink });
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return new NextResponse(JSON.stringify({ error: err.errors }), { status: 400 });
    }
    console.error('create session error', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { acceptSessionSchema } from '@/lib/validation';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request, { params }: { params: { invite: string } }) {
  const { invite } = params;
  const session = await prisma.session.findUnique({
    where: { inviteToken: invite },
    include: { developer: true, files: true },
  });
  if (!session) return new NextResponse('Not found', { status: 404 });

  // don't expose locked files content URLs
  const safeFiles = session.files.map(f => ({
    id: f.id,
    kind: f.kind,
    url: f.isLocked ? null : f.url, // or don't include url at all if locked
    filename: f.filename,
    createdAt: f.createdAt,
  }));

  return NextResponse.json({ ...session, files: safeFiles });
}

export async function POST(req: Request, { params }: { params: { invite: string } }) {
  try {
    const { invite } = params;
    const body = await req.json();
    const parsed = acceptSessionSchema.parse(body);

    // We allow clients to accept without Clerk auth, but recommend requiring auth.
    const { userId } = auth();
    if (!userId) return new NextResponse('Authentication required', { status: 401 });

    // get or create user using clerkId
    let client = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!client) client = await prisma.user.create({ data: { clerkId: userId, role: 'CLIENT' } });

    const session = await prisma.session.findUnique({ where: { inviteToken: invite } });
    if (!session) return new NextResponse('Not found', { status: 404 });

    // update session: attach client, set payment pending
    const updated = await prisma.session.update({
      where: { id: session.id },
      data: {
        clientId: client.id,
        status: 'PENDING_PAYMENT',
        paymentStatus: 'PENDING_VERIFICATION',
        paymentNote: parsed.paymentNote,
      },
    });

    // If paymentProofUrl provided, create File for payment proof
    if (parsed.paymentProofUrl) {
      await prisma.file.create({
        data: {
          sessionId: session.id,
          uploaderId: client.id,
          url: parsed.paymentProofUrl,
          filename: 'payment-proof',
          mime: 'image/*',
          kind: 'PAYMENT_PROOF',
          isLocked: false,
        },
      });
    }

    return NextResponse.json({ updated });
  } catch (e: any) {
    if (e?.name === 'ZodError') return new NextResponse(JSON.stringify(e.errors), { status: 400 });
    console.error(e);
    return new NextResponse('Server Error', { status: 500 });
  }
}
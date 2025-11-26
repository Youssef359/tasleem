import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await requireAdmin();
    const sessionId = Number(params.id);
    const session = await prisma.session.findUnique({ where: { id: sessionId }});
    if (!session) return new NextResponse('Not found', { status: 404 });
    if (session.paymentStatus !== 'PENDING_VERIFICATION') {
      return new NextResponse('Session not waiting for verification', { status: 400 });
    }

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: {
        paymentStatus: 'VERIFIED',
        status: 'ACTIVE',
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: admin.id,
        action: 'payment_verified',
        details: `Session ${sessionId} payment verified`,
      },
    });

    return NextResponse.json({ updated });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Server error', { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    const sessionId = Number(params.id);
    const session = await prisma.session.findUnique({ where: { id: sessionId }, include: { client: true } });
    if (!session) return new NextResponse('Not found', { status: 404 });

    if (session.clientId !== user.id && user.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // unlock FINAL_CODE files
    await prisma.file.updateMany({
      where: { sessionId, kind: 'FINAL_CODE' },
      data: { isLocked: false },
    });

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        paymentStatus: 'RELEASED',
        approvedAt: new Date(),
        releasedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'session_approved',
        details: `Session ${sessionId} approved by user ${user.id}`,
      },
    });

    return NextResponse.json({ updated });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Server Error', { status: 500 });
  }
}
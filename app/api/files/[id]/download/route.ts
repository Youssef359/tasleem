import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    const fileId = Number(params.id);

    const file = await prisma.file.findUnique({ where: { id: fileId }, include: { session: true } });
    if (!file) return new NextResponse('Not found', { status: 404 });

    const session = file.session;

    const isDeveloper = user.id === session.developerId;
    const isClient = user.id === session.clientId;
    const isAdmin = user.role === 'ADMIN';

    if (file.kind === 'FINAL_CODE' && file.isLocked && !isAdmin && !isDeveloper) {
      return new NextResponse('Locked', { status: 403 });
    }

    return NextResponse.json({ url: file.url });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Server Error', { status: 500 });
  }
}
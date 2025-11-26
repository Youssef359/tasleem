import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { Prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const { sessionId, url, filename, mime, size, kind } = body;

    // basic server-side validation
    if (!sessionId || !url || !filename || !kind) {
      return new NextResponse('Missing params', { status: 400 });
    }

    // validate that user is allowed to upload to this session
    const session = await Prisma.session.findUnique({ where: { id: sessionId } });
    if (!session) return new NextResponse('Session not found', { status: 404 });

    // developer can upload to their sessions, client can upload for sessions they've accepted
    if (user.role === 'DEVELOPER' && session.developerId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    if (user.role === 'CLIENT' && session.clientId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // If type is FINAL_CODE, lock by default
    const isLocked = kind === 'FINAL_CODE' ? true : false;

    const file = await Prisma.file.create({
      data: {
        sessionId,
        uploaderId: user.id,
        url,
        filename,
        mime,
        size,
        kind,
        isLocked,
      },
    });

    return NextResponse.json({ file });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Server Error', { status: 500 });
  }
}
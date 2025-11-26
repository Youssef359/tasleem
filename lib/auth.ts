import { auth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';

export async function getCurrentDbUser() {
  const { userId } = auth();
  if (!userId) return null;

  let user = await prisma.user.findUnique({ where: { clerkId: userId }});
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: userId }
    });
  }
  return user;
}

export async function requireAuth() {
  const { userId } = auth();
  if (!userId) throw new Error('UNAUTHORIZED');
  const user = await prisma.user.findUnique({ where: { clerkId: userId }});
  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'ADMIN') throw new Error('FORBIDDEN');
  return user;
}
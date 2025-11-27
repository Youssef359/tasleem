import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

/**
 * Find or create a local DB user record for the current Clerk user.
 * The Clerk user id is a string (clerkId). The DB user has a numeric id.
 */
export async function getCurrentDbUser() {
  const { userId } = auth();
  if (!userId) return null;

  let user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    user = await db.user.create({
      data: { clerkId: userId },
    });
  }
  return user;
}

export async function requireAuth() {
  const { userId } = auth();
  if (!userId) throw new Error("UNAUTHORIZED");
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("USER_NOT_FOUND");
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}
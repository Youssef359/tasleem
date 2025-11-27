"use server";

import crypto from "crypto";
import { db, Prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("يجب تسجيل الدخول");

  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "0").trim();
  const deadlineRaw = (formData.get("deadline") as string) ?? "";

  const priceNum = Number(priceRaw);
  if (!title) throw new Error("العنوان مطلوب");
  if (Number.isNaN(priceNum) || priceNum <= 0) throw new Error("السعر غير صالح");

  const deadline = deadlineRaw ? new Date(deadlineRaw) : undefined;

  let dbUser = await db.user.findUnique({ where: { clerkId: user.id } });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses?.[0]?.emailAddress ?? undefined,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || undefined,
        role: "DEVELOPER", 
      },
    });
  }

  const maxAttempts = 3;
  let createdSession = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const inviteToken = crypto.randomBytes(18).toString("hex");

    try {
      createdSession = await db.session.create({
        data: {
          title,
          description: "Project Description", 
          price: new Prisma.Decimal(priceNum),
          deadline,
          inviteToken,
          developerId: dbUser.id,
          status: "DRAFT",
        },
      });
      break; 
    } catch (err: any) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        Array.isArray(err.meta?.target) &&
        err.meta.target.includes("inviteToken")
      ) {
        if (attempt === maxAttempts) throw new Error("Failed to generate unique invite token. Try again.");
        continue;
      }
      throw err;
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
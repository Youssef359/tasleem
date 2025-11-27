// lib/auth-user.ts
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getDbUser() {
  // 1. نجيب اليوزر من Clerk
  const user = await currentUser();

  if (!user) {
    return null; // مش مسجل دخول أصلاً
  }

  // 2. ندور عليه في الداتابيز بتاعتنا
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id, // بنستخدم نفس الـ ID بتاع Clerk
    },
  });

  // 3. لو لقيناه، نرجعه علطول
  if (dbUser) {
    return dbUser;
  }

  // 4. لو ملقيناهوش (أول مرة يدخل)، نضيفه في الداتابيز
  const newUser = await db.user.create({
    data: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      role: "CLIENT", // الافتراضي عميل، وممكن نغيره بعدين
    },
  });

  return newUser;
}
import { PrismaClient, Prisma } from "@prisma/client";

declare global {
  var __db: PrismaClient | undefined;
}

const _client =
  global.__db ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "info"] : ["error"],
  });

if (process.env.NODE_ENV === "development") global.__db = _client;

export const db = _client;
export { Prisma };
export default db;
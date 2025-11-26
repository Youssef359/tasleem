import { z } from 'zod';

export const createSessionSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  deadline: z.string().optional(),
});

export const acceptSessionSchema = z.object({
  clientName: z.string().optional(),
  paymentProofUrl: z.string().url().optional(),
  paymentNote: z.string().optional(),
});
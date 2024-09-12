import { InMemoryDb } from "./in-memory";
import { z } from "zod";

export const ZMedication = z.object({
  id: z.string().optional(),
  name: z.string().min(7).max(11),
  ean: z.string(),
  stock: z.number(),
  price: z.number(),
});

export type Medication = z.infer<typeof ZMedication>;

declare global {
  var medDb: InMemoryDb<Medication> | undefined;
}

export const db = globalThis?.medDb || new InMemoryDb<Medication>();

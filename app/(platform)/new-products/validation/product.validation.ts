import { db } from "@/lib/data/db";
import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  ean: z.string().min(7).max(11),
  stock: z.number(),
  price: z.number(),
  isSuspect: z.boolean()
});

export type Product = z.infer<typeof productSchema>;

export function validateEANIsInvalid(product: Product): boolean {
  const isValid = productSchema.safeParse(product)

  return !isValid.success;
}

export function validateIsDuplicate(product: Product): boolean {
  const procutsInDB = db.findAll();
  return procutsInDB.some(product => product.ean === product.ean)
}

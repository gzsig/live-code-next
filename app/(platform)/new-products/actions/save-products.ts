"use server"
import fs from "fs"

import { Product, validateDuplicate, validateEAN } from "../validation/product.validation";
import { db } from "@/lib/data/db";

export async function saveProducts(prevState: any, formData: FormData) {
  const file = formData.get('products-csv') as File;
  const buffer = await file?.arrayBuffer();
  const encode = new TextDecoder("utf-8");
  const decoded = encode.decode(buffer);
  const timeStemp = new Date().toISOString();

  fs.writeFile(`/home/nevola/personal/mevo/live-code-next/csv-lists/products-lists-${timeStemp}.csv`, decoded, (err) => {
    console.log('ERROR', err)
  });

  const procutsList = decoded.split('\n');
  const invalidProducts = [];
  const validProducts = [];

  for (let i = 1; i < procutsList.length; i++) {
    const product = procutsList[i].split(";");
    const productInJson: Product = {
      name: product[0],
      ean: product[1],
      stock: Number(product[2]),
      price: Number(product[3]),
      isSuspect: Number(product[2]) < 4 || Number(product[3]) > 500
    }

    const invalidEAN = validateEAN(productInJson);

    if (invalidEAN) {
      invalidProducts.push(productInJson);
      continue
    }

    const isDuplicated = validateDuplicate(productInJson);

    if (isDuplicated) {
      invalidProducts.push(productInJson);
      continue
    }

    db.create(productInJson);
    validProducts.push(productInJson);
  };

  return {
    products: validProducts,
    invalidProducts
  }
}

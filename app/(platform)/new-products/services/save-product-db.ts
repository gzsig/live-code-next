import { createReadStream } from "fs";

import { Product, validateEANIsInvalid, validateIsDuplicate } from "../validation/product.validation";
import { ProductParse } from "../parsers/product.parse";
import { db } from "@/lib/data/db";

export default async function saveProductsOnDBFromFile(file: File) {
  const stream = file.stream();
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

  const invalidProducts: Product[] = [];
  const validProducts: Product[] = [];

  let done = false;

  while (!done) {
    const { value, done: doneValue } = await reader.read();

    if (doneValue) {
      done = true;
      break;
    }

    const productsList = value.split('\n');

    if (productsList.includes('name;ean;stock;price')) {
      productsList.shift();
    }

    productsList.forEach((product) => {
      const productJson = ProductParse(product);

      if (validateEANIsInvalid(productJson) || validateIsDuplicate(productJson)) {
        invalidProducts.push(productJson);
      } else {
        validProducts.push(productJson);
        db.create(productJson);
      }
    });
  }

  return {
    validProducts,
    invalidProducts
  };
};

"use server"

import saveFileProducts from "../services/save-file-products";
import saveProductsOnDBFromFile from "../services/save-product-db";

export async function saveProducts(prevState: any, formData: FormData) {
  const file = formData.get('products-csv') as File;

  const [products] = await Promise.all([
    saveProductsOnDBFromFile(file),
    saveFileProducts(file)
  ]);

  return {
    products: products.validProducts,
    invalidProducts: products.invalidProducts
  }
}

import { Product } from "../validation/product.validation";

export function ProductParse(product: string): Product {
  const productSplited = product.split(";");
  return {
    name: productSplited[0],
    ean: productSplited[1],
    stock: Number(productSplited[2]),
    price: Number(productSplited[3]),
    isSuspect: Number(productSplited[2]) < 4 || Number(productSplited[3]) > 500
  };
}

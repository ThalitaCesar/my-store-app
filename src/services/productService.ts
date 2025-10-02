const BASE_URL = "https://fakestoreapi.com/products";
import { Product } from '../types/Products';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Produto não encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

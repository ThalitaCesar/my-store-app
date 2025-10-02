import { Product } from '../types/Products';

const BASE_URL = 'https://fakestoreapi.com/products';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return await response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Produto não encontrado');
  return await response.json();
}

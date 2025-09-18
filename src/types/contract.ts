export interface Product {
  id: string;
  name: string;
  description: string;
  model?: string;
  price: number;
  imageUrl: string; // This will now hold a Base64 string
}
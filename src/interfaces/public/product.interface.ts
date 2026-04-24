export interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
}

export interface ProductsData {
  title: string;
  subtitle: string;
  products: Product[];
}

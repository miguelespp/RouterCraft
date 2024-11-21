import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
};

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
};

const stateProduct = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  setProduct: (product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (id: number) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default stateProduct;
export type { Product };

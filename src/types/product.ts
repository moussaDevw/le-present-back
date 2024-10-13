import { Image } from "./image";

export type Product = {
  id: string;
  images: Image[];
  name: string;
  article: string;
  price: number;
  description: string;
  quantity: number;
};

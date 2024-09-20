import { Image } from "./image";
import { Product } from "./product";

export type Article = {
  id: string;
  name: string;
  image: Image;
  products: Product[];
};

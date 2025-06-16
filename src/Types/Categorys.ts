import { Product } from "./ProductPart";

export type Category = {
  _id: string;
  name: string;
  image: string;
  description: string;
  showing?: boolean;
  products: Product[];
};

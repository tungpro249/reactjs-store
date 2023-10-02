import { typeCategory } from "./typeCategory";

export interface typeProduct {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: typeCategory;
}
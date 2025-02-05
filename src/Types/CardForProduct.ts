import { ProductWithreviews } from "./ProductPart";

export interface CardForProductProps {
  product?: ProductWithreviews;
  index: number; // Add index prop
  id: string; // Add id prop
  forCart: boolean; // Add forCart prop
}

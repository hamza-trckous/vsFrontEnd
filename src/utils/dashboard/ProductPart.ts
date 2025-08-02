import { deleteProduct } from "@/api/product";
import { NewProduct, ProductWithreviews } from "@/Types/ProductPart";

export const handleDelete = async (
  id: string,
  setProducts: React.Dispatch<
    React.SetStateAction<NewProduct[] | ProductWithreviews[]>
  >,
  setAlertType: (value: React.SetStateAction<"success" | "error">) => void,
  setAlertMessage: (value: React.SetStateAction<string | null>) => void,
  products: NewProduct[] | ProductWithreviews[],
) => {
  try {
    await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
    setAlertType("success");
    setAlertMessage("تم حذف المنتج بنجاح!");
  } catch (error) {
    console.error("Error deleting product:", error);
    setAlertMessage("حدث خطأ أثناء حذف المنتج. يرجى المحاولة مرة أخرى.");
    setAlertType("error");
  }
};

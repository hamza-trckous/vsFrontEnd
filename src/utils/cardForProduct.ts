import { Product } from "@/Types/ProductPart";
import trackFacebookEvent from "./trackFacebookEvent";
import { addToCart } from "@/api/cart";

export const handleAddToCart = async (
  e: React.MouseEvent<HTMLButtonElement>,
  product: Product | undefined,
  setAlertMessage: (message: string) => void,
  setAlertType: (type: "success" | "error") => void,
) => {
  e.stopPropagation();
  try {
    if (product) {
      await addToCart(product._id, 1);
    } else {
      throw new Error("Product is undefined");
    }
    setAlertMessage("تمت الإضافة إلى السلة!");
    setAlertType("success");

    trackFacebookEvent({
      eventName: "AddToCart",
      data: {
        content_ids: product._id,
        content_name: product.name,
        content_type: "product",
        value: product.price,
        currency: "DZD",
        contents: JSON.stringify([
          {
            id: product._id,
            quantity: 1,
          },
        ]),
      },
      isAdmin: false, // or true, depending on your logic
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    setAlertMessage(
      "حدث خطأ أثناء الإضافة إلى السلة أو يرجي التسجيل للاضافة للسلة.",
    );
    setAlertType("error");
  }
};

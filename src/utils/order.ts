import { OrderDetails } from "@/Types/OrderPart";
import { NewProduct } from "@/Types/ProductPart";
import { UseFormGetValues } from "react-hook-form";

export const OrderInformation = ({
  product,
  data,
  getValues,
}: {
  product: NewProduct;
  getValues: UseFormGetValues<OrderDetails>;
  data: OrderDetails;
}) => {
  const orderData: {
    phone: string;
    address: string;
    wilaya: string | undefined;
    products: { product: string; quantity: number }[];
    totalAmount: number;
    status: string;
    user?: string;
    name: string; // Include name in orderData
  } = {
    phone: data.phone,
    address: data.address,
    wilaya: data.wilaya,
    name: data.name, // Add name to orderData
    products: [{ product: product._id ?? "", quantity: data.quantity }],
    totalAmount: getValues("totalAmount")!, // Ensure totalAmount is included
    status: "pending",
  };

  return orderData;
};

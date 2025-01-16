"use client";
import { OrderDetails } from "@/Types/OrderPart";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Correct import statement
import { createOrder } from "@/api/orders";
import { wilayas } from "@/utils/shipping"; // Import wilayas
import { trackConversion } from "@/api/TrackConversion"; // Import trackConversion
import CryptoJS from "crypto-js"; // Import CryptoJS for hashing
import { useUser } from "@/context/UserContext";
import { NewProduct } from "@/Types/ProductPart";
import { useShipping } from "@/context/ShippingContext";
import AlertModal from "../AlertModal";
import { getCookie } from "cookies-next"; // Correct import statement for cookies-next
import axios from "axios"; // Import axios
import { useAuth } from "@/context/AuthContext";

const FormOrder = ({ product }: { product: NewProduct }) => {
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [selectedWilayaStyle, setSelectedWilayaStyle] = useState("");
  const [isAnimating, setIsAnimating] = useState(true); // Add state to control animation
  const [ShippingMethode, setShippingMethode] = useState("للمكتب");

  const { shippingPrices } = useShipping(); // Use the useShipping hook to get the shipping prices
  const { isAdmin } = useAuth(); // Use the useUser hook to get the logged-in user
  const { user } = useUser(); // Use the useUser hook to get the logged-in user
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<OrderDetails>(); // Add getValues and watch to useForm
  const selectedWilaya = watch("wilaya"); // Watch the selected wilaya

  useEffect(() => {
    setValue("quantity", quantity); // Update the form value when quantity changes
  }, [quantity, setValue]);

  const calculateTotalAmount = React.useCallback(() => {
    const discountedPrice = product.discountedPrice ?? product.price;
    const shippingPrice = selectedWilaya
      ? ShippingMethode === "للمكتب"
        ? shippingPrices[selectedWilaya]?.priceToDesktop
        : shippingPrices[selectedWilaya]?.priceToHomme || 0
      : 0;
    const totalAmount =
      discountedPrice * quantity +
      (product.withShipping === "نعم" ? shippingPrice : 0);
    return totalAmount;
  }, [
    product.discountedPrice,
    product.price,
    product.withShipping,
    selectedWilaya,
    shippingPrices,
    quantity,
    ShippingMethode,
  ]);
  useEffect(() => {
    setValue("totalAmount", calculateTotalAmount());
  }, [selectedWilaya, quantity, setValue, calculateTotalAmount]); // Add setValue and calculateTotalAmount to the dependency array

  const onSubmit: SubmitHandler<OrderDetails> = async (data) => {
    console.log("Order data:", data);
    try {
      if (!product._id) {
        throw new Error("Product ID is undefined");
      }

      const totalAmount = calculateTotalAmount();
      setValue("totalAmount", totalAmount); // Set the totalAmount value

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
        products: [{ product: product._id, quantity: data.quantity }],
        totalAmount: getValues("totalAmount")!, // Ensure totalAmount is included
        status: "pending",
      };

      // If the user is logged in, include the user ID in the order data
      if (user) {
        orderData.user = user._id;
      }
      console.log("Order data after:", orderData);
      await createOrder(orderData);
      setAlertMessage("تم تقديم الطلب بنجاح! سنتصل بك قريبًا.");
      setAlertType("success");
      reset();
      setValue("quantity", 1);
      setQuantity(1);
      setIsAnimating(false);

      // Fetch the user's IP address from the backend using axios
      const ipResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-ip`
      );
      const userIpAddress = ipResponse.data.ip;
      console.log("User IP address:", userIpAddress);
      // Hash the email before sending it to Facebook
      const hashedPhone = CryptoJS.SHA256(data.phone).toString();
      // Get fbp and fbc from cookies
      const fbp = getCookie("_fbp")?.toString() || "";
      const fbc = getCookie("_fbc")?.toString() || "";
      const hashedFirstName = CryptoJS.SHA256(data.name).toString();
      const hashedState = CryptoJS.SHA256(data.wilaya || "").toString();

      // Track conversion event
      const eventData = {
        event_name: "order",
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          client_ip_address: userIpAddress,
          client_user_agent: navigator.userAgent,
          fbc: fbc || "",
          ph: hashedPhone || "",
          fbp: fbp || "",
          external_id: "external_id",
          fb_login_id: "facebook_login_id",
          fn: hashedFirstName || "",
          st: hashedState || "",
        },
        custom_data: {
          currency: "DZD",
          value: totalAmount,
        },
      };
      console.log(
        "Tracking conversion event:",
        JSON.stringify(eventData, null, 2)
      );
      await trackConversion(eventData);
    } catch (error) {
      console.error("Error placing order:", error);
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data?.error?.code === 190 &&
          error.response?.data?.error?.error_subcode === 463
        ) {
          console.error("Access token has expired. Please refresh the token.");
          // Optionally, you can implement a retry mechanism here
        } else {
          console.error(
            `Error: ${error.response?.data?.message || error.message}`
          );
        }
      } else if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error("An unknown error occurred.");
      }
      // Do not show token-related errors to the customer
      if (isAdmin) {
        setAlertMessage(
          "تم تقديم الطلب.ولكن يوجد مشكلة و بالظبط في اعدادات فايسبك بيكسل ."
        );
        setAlertType("error");
      }
    }
  };

  useEffect(() => {
    if (selectedWilaya) {
      setSelectedWilayaStyle(selectedWilaya);
      setShippingMethode("للمكتب");
    } else {
      setSelectedWilayaStyle("");
      setShippingMethode("للمكتب");
    }
  }, [selectedWilaya]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4  flex flex-col  w-full">
      <Title />
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-2 items-center justify-center content-center justify-items-center ">
        <Name register={register} />
        <Phone register={register} />

        <Adrees register={register} />
        <Quantité quantity={quantity} setQuantity={setQuantity} />

        {product.withShipping === "نعم" ? (
          <select
            {...register("wilaya", { required: true })}
            className={`border-teal-800 border  w-[90%] sm:w-[70%]  m-2 rounded-lg p-2 text-right ${
              selectedWilayaStyle ? "bg-green-100" : "bg-red-100"
            }`}
            onChange={(e) => {
              const value = e.target.value;
              setValue("wilaya", value); // Update the form value
              setSelectedWilayaStyle(value);
            }}
            value={selectedWilayaStyle}>
            <option value="">اختر الولاية</option>
            {wilayas.map((wilaya) => (
              <option key={wilaya.code} value={wilaya.name}>
                {wilaya.arabicName}
              </option>
            ))}
          </select>
        ) : (
          <div className="border-teal-800 border  w-[90%] sm:w-[70%]  m-2 rounded-lg p-2 text-right  bg-green-100 ">
            {" "}
            💸 التوصيل مجانا
          </div>
        )}
      </div>
      {product.withShipping === "نعم" && (
        <label className="flex flex-col">
          <input
            type="text"
            value={`🚚 سعر التوصيل:${
              selectedWilaya
                ? (ShippingMethode === "للمكتب"
                    ? shippingPrices[selectedWilaya]?.priceToDesktop
                    : shippingPrices[selectedWilaya]?.priceToHomme) || 0
                : 0
            } دج`}
            readOnly
            className={`border-teal-800 border  w-[90%] sm:w-[70%]  m-2 rounded-lg p-2 text-right  ${
              selectedWilayaStyle ? "bg-green-100" : "bg-red-100"
            }`}
          />
          <div className="flex justify-center content-center align-middle items-center">
            {" "}
            <input
              name="shippingMethod"
              disabled={!selectedWilaya}
              onChange={() => setShippingMethode("للمكتب")}
              value={"للمكتب"}
              className="m-1"
              type="radio"
              checked={ShippingMethode === "للمكتب"}
            />{" "}
            للمكتب
            <input
              name="shippingMethod"
              disabled={!selectedWilaya}
              onChange={() => setShippingMethode("للمنزل")}
              value={"للمنزل"}
              checked={ShippingMethode === "للمنزل"}
              className="m-1"
              type="radio"
            />{" "}
            للمنزل
          </div>
        </label>
      )}
      <hr></hr>

      <TotalPrice
        calculateTotalAmount={calculateTotalAmount}
        product={product}
        selectedWilayaStyle={selectedWilayaStyle}
      />

      <ButtonOfSendForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isAnimating={isAnimating}
      />
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </form>
  );
};

export default FormOrder;
const Quantité = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleIncrement = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  return (
    <div className="flex items-center justify-center m-2 w-[90%] sm:w-[70%] rounded-lg p-2 text-right max-h-16">
      <input
        disabled
        type="text"
        placeholder="الكمية"
        className=" text-black  w-[90%] sm:w-[70%]   m-2 rounded-lg p-2 text-right"
      />
      <button
        type="button"
        onClick={handleDecrement}
        className="bg-red-200 text-black border px-4 py-1 rounded-lg">
        -
      </button>
      <span className="mx-4">{quantity}</span>
      <button
        type="button"
        onClick={handleIncrement}
        className="bg-green-200 text-black border px-4 py-1 rounded-lg">
        +
      </button>
    </div>
  );
};
const Title = () => {
  return (
    <h3
      className="text-lg font-bold m-2 text-right "
      style={{ fontFamily: "Cairo, sans-serif" }}>
      طلب المنتج
    </h3>
  );
};
const ButtonOfSendForm = ({
  handleSubmit,
  isAnimating,
  onSubmit,
}: {
  handleSubmit: (onSubmit: SubmitHandler<OrderDetails>) => void;
  isAnimating: boolean;
  onSubmit: SubmitHandler<OrderDetails>;
}) => {
  return (
    <button
      type="submit" // Change type to button to handle click event
      onClick={() => handleSubmit(onSubmit)} // Add click handler
      className={`mt-4 text-white px-4 py-2 rounded-lg transition-colors duration-200 ${
        isAnimating ? "animate-pulse bg-orange-500" : "bg-teal-500"
      } hover:bg-teal-600`}>
      إرسال الطلب
    </button>
  );
};

const TotalPrice = ({
  calculateTotalAmount,
  selectedWilayaStyle,
  product,
}: {
  calculateTotalAmount: () => number;
  selectedWilayaStyle: string;
  product: NewProduct;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-2">
      <input
        type="text"
        value={`💸السعر الاجمالي: ${calculateTotalAmount()} دج`}
        readOnly
        className={`border-teal-800 border  text-center m-2 rounded-lg p-2 w-max  ${
          selectedWilayaStyle
            ? "bg-green-100"
            : product.withShipping === "نعم"
            ? "bg-red-100"
            : "bg-green-100"
        }`}
      />
    </div>
  );
};
const Name = ({
  register,
}: {
  register: ReturnType<typeof useForm<OrderDetails>>["register"];
}) => {
  return (
    <input
      type="text"
      {...register("name", { required: true })}
      placeholder="الاسم 👤"
      className="border-teal-800 border m-2  w-[90%] sm:w-[70%] rounded-lg p-2 text-right "
    />
  );
};

const Phone = ({
  register,
}: {
  register: ReturnType<typeof useForm<OrderDetails>>["register"];
}) => {
  return (
    <input
      type="text"
      {...register("phone", { required: true })}
      placeholder="رقم الهاتف ☎️"
      className="border-teal-800 border w-[90%] sm:w-[70%] m-2 rounded-lg p-2 text-right"
    />
  );
};

const Adrees = ({
  register,
}: {
  register: ReturnType<typeof useForm<OrderDetails>>["register"];
}) => {
  return (
    <input
      type="text"
      {...register("address", { required: true })}
      placeholder="العنوان   🏚️"
      className="border-teal-800 border   w-[90%] sm:w-[70%]   m-2 rounded-lg p-2 text-right"
    />
  );
};

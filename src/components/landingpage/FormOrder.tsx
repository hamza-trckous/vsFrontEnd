"use client";
import { OrderDetails } from "@/Types/OrderPart";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Correct import statement
import { createOrder } from "@/api/orders";
import { fetchShippingPrices, wilayas } from "@/utils/shipping"; // Import wilayas
import { trackConversion } from "@/api/TrackConversion"; // Import trackConversion
import { useUser } from "@/context/UserContext";
import { NewProduct } from "@/Types/ProductPart";
import AlertModal from "../AlertModal";
import { useAuth } from "@/context/AuthContext";
import { OrderInformation } from "@/utils/order";
import { getIp } from "@/api/ip";
import { HashedInformation } from "@/utils/PixlFacebook/hashedinformation";

const FormOrder = ({ product }: { product: NewProduct }) => {
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [selectedWilayaStyle, setSelectedWilayaStyle] = useState("");
  const [isAnimating, setIsAnimating] = useState(true); // Add state to control animation
  const [ShippingMethode, setShippingMethode] = useState("للمكتب");
  const [shippingPrices, setShippingPrices] = useState<{
    [city: string]: { priceToDesktop: number; priceToHomme: number };
  }>({});

  const { isAdmin } = useAuth(); // Use the useUser hook to get the logged-in user

  const { user } = useUser(); // Use the useUser hook to get the logged-in user
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<OrderDetails>(); // Add getValues and watch to useForm

  const selectedWilaya = watch("wilaya"); // Watch the selected wilaya

  useEffect(() => {
    setValue("quantity", quantity); // Update the form value when quantity changes
  }, [quantity, setValue]);

  useEffect(() => {
    console.log(product, "product");
    const feetch = async () => {
      const prices = await fetchShippingPrices();
      if (prices) {
        setShippingPrices(prices);
      }
    };
    feetch();
  }, []); // Fetch shipping prices when the component mounts

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
      const orderData = OrderInformation({ product, data, getValues });

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
      const userIpAddress = await getIp();

      console.log("User IP address:", userIpAddress);

      const { eventData } = HashedInformation({
        data,
        userIpAddress,
        totalAmount,
      });
      await trackConversion(eventData);
    } catch (error) {
      console.error("Error creating order:", error);
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

        {product.withShipping === "نعم" ? (
          <>
            <SelectWilaya
              register={register}
              selectedWilayaStyle={selectedWilayaStyle}
              setValue={setValue}
              setSelectedWilayaStyle={setSelectedWilayaStyle}
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
            <Quantité quantity={quantity} setQuantity={setQuantity} />

            <div className="w-full flex justify-between items-center text-center  ">
              <textarea
                value={`سعر التوصيل : 🚚 
${
  selectedWilaya
    ? (ShippingMethode === "للمكتب"
        ? shippingPrices[selectedWilaya]?.priceToDesktop
        : shippingPrices[selectedWilaya]?.priceToHomme) || 0
    : 0
} دج`}
                readOnly
                className={`border-teal-800 border text-center m-auto w-[90%] sm:w-[70%] flex justify-center items-center content-center justify-items-center  rounded-lg p-2  resize-none  ${
                  selectedWilayaStyle ? "bg-green-100" : "bg-blue-100"
                }`}
              />
              ➕
            </div>

            <textarea
              value={`  سعر المنتج : 📦 
${product.discountedPrice ? product.discountedPrice : product.price} دج`}
              readOnly
              className={`border-teal-800 border m-auto text-center  w-[90%] sm:w-[70%]   rounded-lg p-2  resize-none  ${
                selectedWilayaStyle ? "bg-green-100" : "bg-blue-100"
              }`}
            />
          </>
        ) : (
          <div className="border-teal-800 border  w-[90%] sm:w-[70%]  m-2 rounded-lg p-2 text-right  bg-green-100 ">
            {" "}
            💸 التوصيل مجانا
          </div>
        )}
      </div>

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
        className="bg-blue-200 text-black border px-4 py-1 rounded-lg">
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
            ? "bg-blue-100"
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

const SelectWilaya = ({
  register,
  selectedWilayaStyle,
  setValue,
  setSelectedWilayaStyle,
}: {
  register: ReturnType<typeof useForm<OrderDetails>>["register"];
  selectedWilayaStyle: string;
  setValue: ReturnType<typeof useForm<OrderDetails>>["setValue"];
  setSelectedWilayaStyle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <select
      {...register("wilaya", { required: true })}
      className={`border-teal-800 border  w-[90%] sm:w-[70%]  m-2 rounded-lg p-2 text-right ${
        selectedWilayaStyle ? "bg-green-100" : " animate-pulse"
      }`}
      onChange={(e) => {
        const value = e.target.value;
        setValue("wilaya", value); // Update the form value
        setSelectedWilayaStyle(value);
      }}
      value={selectedWilayaStyle}>
      <option value="">اختر البلدية</option>
      {wilayas.map((wilaya) => (
        <option key={wilaya.code} value={wilaya.name}>
          {wilaya.arabicName}
        </option>
      ))}
    </select>
  );
};

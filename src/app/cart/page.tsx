"use client";
import React, { useEffect } from "react";
import { FaTrash, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Product } from "@/Types/ProductPart";
import useTrackPageView from "@/hooks/useTrackPageView";
import trackFacebookEvent from "@/utils/trackFacebookEvent";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import { UseCardItems } from "@/hooks/useCardItems";
import Image from "next/image";

const CartPage = () => {
  const { isLoggedIn } = useAuth();
  const { isAdmin } = useAuth(); // Get isAdmin from the AuthContext
  const { cartItems, loading } = UseCardItems(); // Use the useCartItems hook to get the cart items
  const { handleRemoveItem } = UseCardItems(); // Use the useCartItems hook to get the cart items
  const router = useRouter();

  useEffect(() => {
    // Track PageView event
    trackFacebookEvent({
      eventName: "PageView",
      data: {
        page_name: "CartPage",
      },
      isAdmin,
    });

    // Track ViewContent event for each product in cartItems
    cartItems.forEach((product: Product) => {
      trackFacebookEvent({
        eventName: "ViewContent",
        data: {
          content_type: "product",
          content_ids: product._id,
          content_name: product.name,
          value: product.price,
          currency: "DZD",
        },
        isAdmin,
      });
    });
  }, [cartItems, isAdmin]);

  const productNames = cartItems.map((item) => item.name).join(", ");
  useTrackPageView({ page_name: "CartPage", product_names: productNames });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <Title text="سلة التسوق" />
      {isLoggedIn ? (
        <Title text="مرحباً بك" />
      ) : (
        <Title text="للتمكن من الوصول للسلة يجب عليك تسجيل الدخول" />
      )}
      {cartItems.length === 0 ? (
        <Title text="سلة التسوق فارغة" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-md p-4 bg-white flex flex-col md:flex-row justify-start">
              {item.images.length !== 0 ? (
                <div className="flex justify-center flex-col md:justify-start w-max">
                  {item.images.slice(0, 3).length > 0 &&
                    item.images.map((image, index) => (
                      <Image
                        width={200}
                        height={200}
                        key={index}
                        src={image}
                        alt={item.name}
                        className="w-full m-1 h-40 object-cover rounded-lg"
                      />
                    ))}
                </div>
              ) : (
                <div className="flex justify-center flex-col items-center content-center align-middle md:justify-center w-full text-red-600">
                  No Fotos
                </div>
              )}
              <div className="flex flex-col p-4 w-1/2 justify-around">
                <Name name={item.name} />
                <Description description={item.description} />
                <Price item={item} />
                <SizesOrColor itemsTitle="الألوان:" item={item.colors} />
                <SizesOrColor itemsTitle="الأحجام:" item={item.sizes} />
                <Rating item={item} />
                <div className="flex items-center justify-start">
                  <Button
                    className="m-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex h-14 items-center justify-start"
                    text="إزالة"
                    onClick={() => item._id && handleRemoveItem(item._id)}>
                    <FaTrash className="mr-2" />
                  </Button>
                  <Button
                    text="إتمام الطلب"
                    onClick={() => router.push(`/landingpage/${item._id}`)}
                    className="m-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200 h-14 flex items-center justify-start"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Title = ({ text }: { text: string }) => {
  return <h1 className="text-2xl font-bold mb-4 text-center">{text}</h1>;
};

const Button = ({
  text,
  onClick,
  className,
  children,
}: {
  text: string;
  onClick: () => void;
  className: string;
  children?: React.ReactNode;
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children} {text}
    </button>
  );
};

const SizesOrColor = ({
  item,
  itemsTitle,
}: {
  item: Product["sizes"] | Product["colors"];
  itemsTitle: string;
}) => {
  return (
    <div className="flex justify-start mb-2">
      <span className="font-bold">{itemsTitle}</span>
      <div className="flex justify-start ml-2 max-width-[200px] flex-wrap">
        {item.map((size, index) => (
          <span
            key={index}
            className="whitespace-nowrap border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm ml-2 mb-2">
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};

const Rating = ({ item }: { item: Product }) => {
  return (
    <div className="flex items-center justify-start mb-2">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={index < item.rating ? "text-yellow-500" : "text-gray-300"}
          size={16}
        />
      ))}
    </div>
  );
};

const Price = ({ item }: { item: Product }) => {
  return (
    <div className="flex items-start justify-start mb-2 flex-col">
      <span className="text-gray-600 line-through mr-2">{item.price} $</span>
      <span className="text-teal-500 font-bold">{item.discountedPrice} $</span>
    </div>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <p className="text-gray-700 mb-2 break-words max-w-30">{description}</p>
  );
};

const Name = ({ name }: { name: string }) => {
  return <h2 className="text-lg font-bold mb-2">{name}</h2>;
};

export default CartPage;

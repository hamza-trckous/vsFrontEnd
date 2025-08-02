import { NewProduct, ProductWithreviews } from "@/Types/ProductPart";
import { useRouter } from "next/navigation";
import React from "react";
import NAmeProductsTable from "./NAmeProductsTable";
import DescriptionProductTable from "./DescriptionProductTable";
import ImagesProductTable from "./ImagesProductTable";
import ActionsForTable from "./ActionsForTable";
import PriceProductTable from "./PriceProductTable";
import ColorProductTable from "./ColorProductTable";
import SizeProductTable from "./SizeProductTable";
import RatingProductTable from "./RatingProductTable";
import ReviewsProductTable from "./ReviewsProductTable";
import ShippingProductTable from "./ShippingProductTable";
import { useLanguage } from "@/context/languageColorContext";

const BodyOfTableLandingAndProductEdit = ({
  items,
  landingPage = false,
  onDelete,
}: {
  items: NewProduct[] | ProductWithreviews[];
  landingPage?: boolean;
  onDelete?: (id: string) => void;
}) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/Product/${id}`);
  };

  const ShowItem = (id: string) => {
    router.push(`/landingpage/${id}`);
  };
  const { dataOflang } = useLanguage();

  return (
    <tbody>
      {items.length > 0 ? (
        items
          .slice()
          .reverse()
          .map((product, index) => (
            <tr key={index} className="border-t">
              <ImagesProductTable
                forproduct={true}
                items={{ ...product, _id: product._id || "" }}
              />
              <NAmeProductsTable items={product} />
              <DescriptionProductTable item={product} />
              <PriceProductTable
                item={{
                  price: product.price,
                  discountedPrice: product.discountedPrice,
                }}
              />
              <ColorProductTable
                item={{
                  product: {
                    colors: product.colors,
                  },
                }}
              />
              <SizeProductTable
                item={{
                  product: {
                    sizes: product.sizes,
                  },
                }}
              />

              <RatingProductTable
                item={{
                  product: {
                    rating: product.rating,
                  },
                }}
              />
              <ReviewsProductTable product={product} />
              <ShippingProductTable
                product={{
                  withShipping: product.withShipping,
                }}
              />
              {!landingPage ? (
                <ActionsForTable
                  itemNAme={dataOflang?.dashboardProduct.name || "المنتج"}
                  item={{ ...product, _id: product._id || "" }}
                  ShowItem={() => product._id && ShowItem(product._id)}
                  handleEdit={handleEdit}
                  onDelete={onDelete}
                />
              ) : (
                <td className="px-2 py-1 border border-gray-400 w-20 text-right break-words">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/landingpageEditing/${product._id}`,
                      )
                    }
                    className="bg-green-500 w-16 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs"
                  >
                    عرض
                  </button>
                </td>
              )}
            </tr>
          ))
      ) : (
        <tr>
          <td colSpan={100} className="text-center text-red-600">
            {dataOflang?.dashboardProduct.noProducts || "لا يوجد منتجات"}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default BodyOfTableLandingAndProductEdit;

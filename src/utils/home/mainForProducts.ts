import { getAllProducts } from "@/api/product";
import { Product } from "@/Types/ProductPart";

export const fetchProducts = async (
  page: number,
  limit: number,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setTotalProducts: React.Dispatch<React.SetStateAction<number>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>,
  products: Product[]
) => {
  try {
    const fetchedProductsResponse = await getAllProducts({ page, limit });
    const { products: fetchedProducts, totalProducts } =
      fetchedProductsResponse;
    setTotalProducts(totalProducts);
    if (fetchedProducts.length === 0) {
      return;
    }
    setProducts((prevProducts) => [
      ...prevProducts,
      ...fetchedProducts.filter(
        (product) => !prevProducts.some((p) => p._id === product._id)
      ),
    ]);
    if (products.length > 0) {
      setTimeout(() => {
        setShowSideBar(true);
      }, 1000);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

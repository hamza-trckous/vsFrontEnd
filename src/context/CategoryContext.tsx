"use client";
import { addCategory, deleteCategory, getCategories } from "@/api/category";
import { Category } from "@/Types/Categorys";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback
} from "react";

interface CategoryContextProps {
  category: Category[] | null;
  setcategory: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategorie: (
    data: Category
  ) => Promise<"تمت اضافة الفئة بنجاح" | "حدث خطأ ما">;

  deleateCategory: (
    id: string
  ) => Promise<"  تم حذف القسم بنجاح" | "حدث خطأ ما" | undefined>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [category, setcategory] = useState<Category[]>([]);
  const getCategorys = useCallback(async () => {
    const getcategory = await getCategories();
    if (getcategory) {
      setcategory(getcategory);
    }
  }, []);
  useEffect(() => {
    getCategorys();
  }, [getCategorys]);
  const deleateCategory = async (id: string) => {
    try {
      const deleat = await deleteCategory(id);
      if (deleat) {
        setcategory(category.filter((item) => item._id !== id));
        getCategorys();
        return "  تم حذف القسم بنجاح";
      }
    } catch (error) {
      console.log(error);

      return "حدث خطأ ما";
    }
  };
  const addCategorie = async (data: Category) => {
    try {
      await addCategory(data);
      getCategorys();
      return "تمت اضافة الفئة بنجاح";
    } catch (error) {
      console.log(error);
      return "حدث خطأ ما";
    }
  };

  return (
    <CategoryContext.Provider
      value={{ category, setcategory, deleateCategory, addCategorie }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

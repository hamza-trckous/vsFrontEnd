import { logos } from "@/Types/dashboard";

export const Links = ({
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
}: logos) => {
  const items = [
    { name: "إدارة المستخدمين", icon: Logo1, Link: "/dashboard/users" },
    {
      name: "إدارة المنتجات",
      icon: Logo2,
      Link: "/dashboard/Product",
      // DFault /dashboard/Product
      sections: [
        { name: "المنتجات", Link: "/dashboard/Product" },
        { name: "الفئات", Link: "/dashboard/Product/category" },
      ],
    },
    { name: "إحصائيات الموقع", icon: Logo3, Link: "/dashboard/statics" },
    { name: "إدارة الشحن", icon: Logo4, Link: "/dashboard/shipping" },
    {
      name: "التكامل مع Facebook Pixel",
      icon: Logo5,
      Link: "/dashboard/integration",
    },
    {
      name: "Google Sheets التكامل مع",
      icon: Logo6,
      Link: "/dashboard/sheets",
    },
    { name: "تعديل صفحات السياسات", icon: Logo7, Link: "/dashboard/policy" },
    {
      name: "تعديل صفحة عرض المنتج",
      icon: Logo8,
      Link: "/dashboard/landingpageEditing",
    },
    {
      name: "تعديل الصفحة الرئيسية",
      icon: Logo9,
      Link: "/dashboard/profile",
    },
  ];
  return { items };
};

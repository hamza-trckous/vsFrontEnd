import { logos } from "@/Types/dashboard";
import { LanguageConfig } from "@/Types/LanguageConfig";

interface LogosD extends logos {
  dataOflang: LanguageConfig | undefined;
}

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
  dataOflang,
}: LogosD) => {
  const items = [
    {
      name: dataOflang?.dashboardBar.manageUsers || "إدارة المستخدمين",
      icon: Logo1,
      Link: "/dashboard/users",
    },
    {
      name: dataOflang?.dashboardBar.manageProducts || "إدارة المنتجات",
      icon: Logo2,
      Link: "/dashboard/Product",
      sections: [
        {
          name: dataOflang?.dashboardBar.products || "المنتجات",
          Link: "/dashboard/Product",
        },
        {
          name: dataOflang?.dashboardBar.PrincipalCategory || "الفئات",
          Link: "/dashboard/Product/category",
        },
      ],
    },
    {
      name: dataOflang?.dashboardBar.siteStats || "إحصائيات الموقع",
      icon: Logo3,
      Link: "/dashboard/statics",
    },
    {
      name: dataOflang?.dashboardBar.shippingManagement || "إدارة الشحن",
      icon: Logo4,
      Link: "/dashboard/shipping",
    },
    {
      name:
        dataOflang?.dashboardBar.facebookPixelIntegration ||
        "التكامل مع Facebook Pixel",
      icon: Logo5,
      Link: "/dashboard/integration",
    },
    {
      name:
        dataOflang?.dashboardBar.googleSheetsIntegration ||
        "Google Sheets التكامل مع",
      icon: Logo6,
      Link: "/dashboard/sheets",
    },
    {
      name: dataOflang?.dashboardBar.editPolicyPages || "تعديل صفحات السياسات",
      icon: Logo7,
      Link: "/dashboard/policy",
    },
    {
      name: dataOflang?.dashboardBar.editProductPage || "تعديل صفحة عرض المنتج",
      icon: Logo8,
      Link: "/dashboard/landingpageEditing",
    },
    {
      name: dataOflang?.dashboardBar.editHomePage || "تعديل الصفحة الرئيسية",
      icon: Logo9,
      Link: "/dashboard/profile",
    },
  ];

  return { items };
};

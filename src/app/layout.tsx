// app/layout.tsx
import "../styles/globals.css";
import ProvidersWrapper from "@/components/providerOfContent/providerOfContent";
import { getUserSettings } from "@/utils/getUserSetting/getUserSetting";
import { getUserProfile } from "@/utils/getUserSetting/getProfileSetting";
import { LanguageConfig } from "@/Types/LanguageConfig";
import Script from "next/script";

export const metadata = {
  title: {
    default: "MyStore",
    template: "%s | MyStore",
  },
  description: "Your favorite online store for daily menus and more.",
  alternates: {
    canonical: "https://vs-ebon.vercel.app/",
  },
};
// Async layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, LanguageData } = await getUserSettings();
  const { profile } = await getUserProfile();
  const cleanProfile = profile || { color: "teal" };

  return (
    <html lang="en">
      <body>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=explicit`}
          async
          defer
        />
        <ProvidersWrapper
          language={language}
          LanguageData={LanguageData as LanguageConfig}
          profile={cleanProfile}
        >
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}

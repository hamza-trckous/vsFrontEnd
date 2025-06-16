// app/layout.tsx
import "../styles/globals.css";
import ProvidersWrapper from "@/components/providerOfContent/providerOfContent";
import { getUserSettings } from "@/utils/getUserSetting/getUserSetting";
import { getUserProfile } from "@/utils/getUserSetting/getProfileSetting";
import { LanguageConfig } from "@/Types/LanguageConfig";

// Async layout
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { language, LanguageData } = await getUserSettings();
  const { profile } = await getUserProfile();
  const cleanProfile = profile || { color: "teal" };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <title>Vs</title>
      </head>
      <body>
        <ProvidersWrapper
          language={language}
          LanguageData={LanguageData as LanguageConfig}
          profile={cleanProfile}>
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}

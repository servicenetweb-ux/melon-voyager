import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getSettings } from "./lib/data";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: s.seoTitle || s.companyName,
    description: s.seoDescription || s.tagline || "Travel agency website",
    icons: s.faviconUrl ? { icon: s.faviconUrl, shortcut: s.faviconUrl, apple: s.faviconUrl } : undefined,
    openGraph: { images: s.ogImageUrl ? [s.ogImageUrl] : [] },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/melonadmin");

  return (
    <html lang="en">
      <body>
        {isAdmin ? null : <Header />}
        {children}
        {isAdmin ? null : <Footer />}
      </body>
    </html>
  );
}

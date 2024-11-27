import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/providers";
import TopLoader from "@/components/top-loader.tsx";
import { Toaster } from "@/components/ui/toaster";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { metadataKaialearn } from "@/lib/metadata";

const myFont = localFont({
  src: [
    {
      path: "./fonts/IBMPlexMono-Bold.ttf",
      weight: "700",
    },
    {
      path: "./fonts/IBMPlexMono-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "./fonts/IBMPlexMono-Light.ttf",
      weight: "300",
    },
    {
      path: "./fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/IBMPlexMono-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/IBMPlexMono-Thin.ttf",
      weight: "100",
    },
  ],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Kaialearn",
    template: "%s | Kaialearn",
  },
  description: metadataKaialearn.description,
  metadataBase: new URL("https://www.kaialearn.com"),
  keywords: [...metadataKaialearn.keywords],
  referrer: "origin-when-cross-origin",
  authors: [{ name: "lou1s", url: "https://github.com/Lou1sVuong" }],
  publisher: "lou1s aka Mai Vu Xuan Vuong",
  alternates: {
    canonical: "./",
  },
  openGraph: metadataKaialearn.openGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${myFont.className} ${myFont.variable} custom-selection antialiased`}
      >
        <Providers>
          <TopLoader />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers";
import Header from "@/components/layouts/landing/header";

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
  title: "Kaialearn",
  description: "Hack, learn, and secure the future of decentralized tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${myFont.className} ${myFont.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

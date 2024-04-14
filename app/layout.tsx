import type { Metadata } from "next";

import "./globals.css";

import { DM_Sans } from "next/font/google";

import { SessionProvider } from "next-auth/react";
// import { Toaster } from "@/components/ui/sonner";

const roboto = DM_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Farmer Chat!",
  description:
    "FarmChat, powered by Digital Green, connects farmers across the globe, offering a platform for sharing insights, advice, and innovations in agriculture. Join our community to grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
        {/* <script defer src="https://www.youtube.com/iframe_api"></script> */}
      </html>
    </SessionProvider>
  );
}

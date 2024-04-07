import type { Metadata } from "next";

import "./globals.css";
import SessionWrapper from "@/components/generic/SessionWrapper";
import { Work_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const roboto = Work_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farmer Chat",
  description: "A chat bot to answer all your farming realted queries",
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

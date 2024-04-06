import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farmer Chat App",
  description: "Farmer Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

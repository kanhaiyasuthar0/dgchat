// import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
// import { Inter } from "next/font/google";
import { Suspense } from "react";
import { PuffLoader } from "react-spinners";
export const dynamic = "force-dynamic";
// const inter = Inter({ subsets: ["latin"] });

// or Dynamic metadata
// export async function generateMetadata({ params }) {
//   // const { data: session } = useSession();
//   const title = `Farmer Chat ${
//     "" // session?.user?.name ? "- " + session.user.name : ""
//   }`;
//   const description =
//     "Connect with experts and fellow farmers to discuss crops, weather, and farming techniques. Get real-time advice and share your experiences to grow together.";
//   return {
//     title,
//     description,
//   };
// }
export default function ChatLayout({
  children,
  services,
}: // modal,
Readonly<{
  children: React.ReactNode;
  // modal: React.ReactNode;
  services: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white overflow-hidden">
      {children}

      <div className="pt-4 m-auto w-full max-w-4xl h-full flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto ">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <PuffLoader loading color={"gray"} />
            </div>
          }
        >
          {services}
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}

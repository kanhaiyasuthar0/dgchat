// import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
}: // modal,
Readonly<{
  children: React.ReactNode;
  // modal: React.ReactNode;
}>) {
  return (
    <>
      {children}

      {/* {modal} */}
    </>
  );
}

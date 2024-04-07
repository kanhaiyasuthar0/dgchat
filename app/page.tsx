// mark as client component
// "use client";

import { auth } from "@/auth";
import LoginComponent from "@/components/login/LoginComponent";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = await auth();
  console.log("🚀 ~ Home ~ data:", data);
  if (!data) {
    // signOut();
    // redirect("/chat");
  }
  // extracting data from usesession as session

  // rendering components for not logged in users
  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute top-0 right-0 p-4">
          <Link
            href="/get-started-doc"
            passHref
            target="_blank"
            className={`text-white bg-black focus:ring-4 ont-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center transition-colors duration-150`}
          >
            Get Started
          </Link>
        </div>
        <LoginComponent />
      </div>
    </>
  );
}

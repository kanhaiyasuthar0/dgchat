// mark as client component
// "use client";

import { auth } from "@/auth";
import LoginComponent from "@/components/login/LoginComponent";
import { signOut } from "next-auth/react";
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
  return <LoginComponent />;
}

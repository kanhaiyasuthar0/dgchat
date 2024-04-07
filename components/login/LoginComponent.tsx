// mark as client component
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
const LoginComponent = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const createUser = async (user: { email: string; displayName: string }) => {
    if (!user) {
      console.error("User details not found");
      return false;
    }

    const { email, displayName: username } = user;

    try {
      const response = await axios.post(
        `${"https://sandbox.farmstack.digitalgreen.org"}/ai/user/`,
        { email, username },
        {
          headers: {
            "Content-Type": "application/json",
            // Specify other necessary headers
          },
        }
      );

      console.log("User created:", response.data);
      localStorage.setItem("userId", response.data.id);
      // Handle successful user creation, if needed
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
      return false;
    }
  };
  if (typeof window !== "undefined" && !localStorage?.getItem("theme")) {
    document.documentElement.classList.add("dark");
    localStorage?.setItem("theme", "dark");
  }

  // checking if sessions exists
  //   if (session) {
  //     console.log("🚀 ~ Home ~ session:123", session);

  //     console.log(response, "createuser response");
  //     // rendering components for logged in users
  //     redirect("/chat");
  //   }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-semibold mb-6">Welcome Back!</h1>
      <p className="text-xl mb-4">Sign in to continue</p>
      <Button
        className={`text-white bg-black focus:ring-4 ont-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center transition-colors duration-150 ${
          isLoading ? "cursor-not-allowed opacity-50" : "opacity-100"
        }`}
        disabled={isLoading}
        onClick={async () => {
          try {
            setIsLoading(true);
            const response = await signIn("google", { callbackUrl: `/chat` });
            console.log("🚀 ~ onClick={ ~ response:", response);
            const createUserResponse = await createUser({
              email: session?.user?.email!,
              displayName: session?.user?.name!,
            });
            if (createUserResponse) {
              redirect("/chat");
            }
          } catch (error) {
            console.error(error);
            // redirect("/");
          } finally {
            setIsLoading(false);
          }

          //   console.log("🚀 ~ onClick={async ~ response:", response);
          // await createUser()
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
          </>
        ) : (
          <>
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 25.7 166.3 68L351.5 136C317.3 101.1 284.5 88 248 88c-73.5 0-133.5 60.1-133.5 133.5S174.5 355 248 355c41.8 0 61.8-29.5 64-44.5H248v-59h236.2c2.3 12.2 3.8 24.7 3.8 37.3z"
              ></path>
            </svg>
            Sign in with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default LoginComponent;

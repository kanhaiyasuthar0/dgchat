"use client";
// components/UserProfile.js
import React, { Suspense, useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SettingsModal from "./Options";
import OtherSettings from "./OtherSettings";
const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { data: session } = useSession();
  // console.log("🚀 ~ UserProfile ~ data:", data);
  // console.log("🚀 ~ UserProfile ~ session:", session);
  // if (!session) {
  //   // redirect("/");
  // }
  const [showOptions, setShowOptions] = useState(false);

  const handleSignOut = async () => {
    signOut({ callbackUrl: "/" });
    // redirect("/");
  };

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set("modalfor", term);
    } else {
      params.delete("modalfor");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  // const session = "";
  if (!session) return <></>;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-full cursor-pointer">
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
              height={40} // Adjust based on your design
              width={40} // Adjust based on your design
              unoptimized={true} // Consider setting to true if you encounter issues with external images
            />
            <span className="max-w-xs truncate text-gray-900 dark:text-white">
              {session?.user?.name || "User"}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-gray-700 rounded-md shadow-xl w-[200px]">
          <DropdownMenuItem
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            onSelect={() => setIsOpen(true)}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            onSelect={handleSignOut}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Suspense fallback={"Loading..."}>
        <SettingsModal
          isOpen={isOpen}
          handleClose={handleClose}
          renderComponent={() => (
            <OtherSettings isOpen={isOpen} handleClose={handleClose} />
          )}
        />
      </Suspense>
    </div>
  );
};

export default UserProfile;

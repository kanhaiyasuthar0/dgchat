"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Adjust the import path as needed
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
// import CountryStateSelector from "../generic/CountryStateSelector";

const Modal = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useSearchParams();
  console.log("🚀 ~ Page ~ params:", params.get("modalfor"));
  // console.log("🚀 ~ Page ~ router:", router);
  const modalFor = params.get("modalfor")!;
  const [isOpen, setIsOpen] = useState(
    ["language", "crop", "profile", "country", "settings"].includes(modalFor)
  );

  useEffect(() => {
    // Check if the modalfor query param exists and matches one of the specified values
    if (
      ["language", "crop", "profile", "settings", "country"].includes(modalFor)
    ) {
      setIsOpen(true); // Open the dialog if a matching query parameter is found
    }
  }, [JSON.stringify(params)]); // Re-run the effect when query parameters change

  const handleClose = () => {
    console.log(isOpen, "in modal123");
    if (isOpen) {
      isOpen && setIsOpen(false);
      console.log(pathname);
      replace(`${pathname}`);
    }
  };

  //   useEffect(() => {
  //     if (!params.get("modalfor")) {
  //       //   replace(`${pathname}`);
  //       setIsOpen(false);
  //     }
  //   }, [pathname]);

  return (
    <div>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {" "}
                {params.get("modalfor")?.toUpperCase()}{" "}
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
                {params.get("modalfor") == "country"
                  ? ""
                  : //   <CountryStateSelector />
                    null}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Modal;

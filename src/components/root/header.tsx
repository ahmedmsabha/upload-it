import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Search } from "./search";
import { FileUploader } from "./file-uploader";
import { signOutUser } from "@/lib/actions/users.action";
export function Header() {
  return (
    <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">
      <Search />
      <div className="flex min-w-fit items-center justify-center gap-4">
        <FileUploader />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button
            type="submit"
            className="flex h-[52px] min-w-[54px] items-center justify-center rounded-full bg-brand/10 p-0 text-brand shadow-none transition-all hover:bg-brand/20"
          >
            <Image
              src="./icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}

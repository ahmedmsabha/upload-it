"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileUploader } from "./file-uploader";
import { signOutUser } from "@/lib/actions/users.action";

export function MobileNavigation({
  $id: userId,
  accountId,
  fullName,
  email,
  avatar,
}: {
  $id: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="flex h-[60px] justify-between px-5 sm:hidden">
      <Image
        src="./icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image src="./icons/menu.svg" alt="menu" width={30} height={30} />
        </SheetTrigger>

        <SheetContent className="h-screen px-3 pt-0">
          <SheetTitle>
            <div className="my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-brand/10 lg:justify-start lg:p-3">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square w-10 rounded-full object-cover"
              />
              <div className="sm:hidden lg:block">
                <p className="text-sm font-semibold capitalize leading-5">
                  {fullName}
                </p>
                <p className="text-xs font-normal leading-4">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <nav className="flex-1 text-base font-semibold leading-6 text-brand">
            <ul className="flex flex-1 flex-col gap-4">
              {navItems.map(({ name, url, icon }) => {
                const isActive = pathname === url;
                return (
                  <Link key={name} href={url} className="lg:w-full">
                    <li
                      className={cn(
                        "flex text-light-100 gap-4 w-full justify-start items-center text-base leading-6 font-semibold px-6 h-[52px] rounded-full",
                        isActive && "bg-brand text-white shadow-drop-2"
                      )}
                    >
                      <Image src={icon} alt={name} width={24} height={24} />
                      <span>{name}</span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={userId} accountId={accountId} />
            <Button
              type="submit"
              className="flex h-[52px] w-full items-center gap-4 rounded-full bg-brand/10 px-6 text-base font-semibold leading-6 text-brand shadow-none transition-all hover:bg-brand/20"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="./icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="w-6"
              />
              <span>Logout</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

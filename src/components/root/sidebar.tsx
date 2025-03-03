"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Logo from "@/assets/images/files-2.png";

interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
}
export function Sidebar({ fullName, email, avatar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
      <Link href="/">
        <Image
          src="./icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto md:block"
        />

        <Image
          src="./icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="mt-9 flex-1 gap-1 text-base font-semibold leading-6 text-brand">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ name, url, icon }) => {
            const isActive = pathname === url;
            return (
              <Link key={name} href={url} className="lg:w-full">
                <li
                  className={cn(
                    "flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center text-base leading-6 font-semibold lg:px-8 h-14 lg:rounded-full",
                    isActive && "bg-brand text-white shadow-drop-2"
                  )}
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className={cn(
                      "w-6 filter invert opacity-25",
                      isActive && "invert-0 opacity-100"
                    )}
                  />
                  <span className="hidden lg:block">{name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      <Image
        src={Logo}
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand/10 p-1 text-light-100 lg:justify-start lg:p-3">
        <Image
          src={avatar}
          alt="avatar"
          width={32}
          height={32}
          className="aspect-square w-10 rounded-full object-cover"
        />
        <div className="hidden lg:block">
          <p className="text-sm font-semibold capitalize leading-5">
            {fullName}
          </p>
          <p className="text-xs font-normal leading-4">{email}</p>
        </div>
      </div>
    </aside>
  );
}

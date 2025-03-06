import React from "react";
import Image from "next/image";
import logo from "@/assets/icons/logo-full.svg";
import brandLogo from "@/assets/icons/logo-full-brand.svg";
import files from "@/assets/images/files.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center gap-12">
          <Image
            src={logo}
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          />
          <div className="space-y-5 text-white">
            <h1 className="text-4xl font-bold leading-10">
              Manage your files the best way
            </h1>
            <p className="text-base font-normal leading-6">
              Upload, manage, and share your files with ease.
            </p>
          </div>
          <Image
            src={files}
            alt="hero"
            width={342}
            height={342}
            className="transition-all duration-300 hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src={brandLogo}
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-52 lg:w-64"
          />
        </div>
        {children}
      </section>
    </div>
  );
}

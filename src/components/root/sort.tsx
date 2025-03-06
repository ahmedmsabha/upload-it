"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { sortTypes } from "@/constants";

export default function Sort() {
  const router = useRouter();
  const pathname = usePathname();

  function handleSort(value: string) {
    router.push(`${pathname}?sort=${value}`);
  }
  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className="h-11 w-full rounded-[8px] border-transparent bg-white !shadow-sm outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 sm:w-[210px]">
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className="!shadow-drop-3">
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.label}
            className="cursor-pointer"
            value={sort.value}
          >
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

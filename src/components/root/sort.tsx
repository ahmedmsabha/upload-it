"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { sortTypes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export default function Sort() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSort = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (value === sortTypes[0].value) {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", value);
    }

    // Use replace instead of push to prevent history stack duplication
    router.replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  const currentSort =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("sort") ||
        sortTypes[0].value
      : sortTypes[0].value;

  return (
    <Select onValueChange={handleSort} value={currentSort}>
      <SelectTrigger className="h-11 w-full rounded-[8px] border-transparent bg-white !shadow-sm outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 sm:w-[210px]">
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className="!shadow-drop-3">
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.value}
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

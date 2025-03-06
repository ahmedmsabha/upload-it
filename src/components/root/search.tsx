"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import { Thumbnail } from "./thumbnail";
import FormattedDateTime from "./formatted-date-time";
import { useDebounce } from "use-debounce";
export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Models.Document[]>([]);
  const searchParams = useSearchParams();
  const searchText = searchParams.get("query") || "";
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(pathname.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery, pathname, router, searchParams]);

  useEffect(() => {
    if (!searchText) {
      setQuery("");
    }
  }, [searchText]);

  function handleClickItem(file: Models.Document) {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  }

  return (
    <div className="relative w-full md:max-w-[480px]">
      <div className="flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 shadow-drop-3">
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        <Input
          placeholder="Search"
          className="w-full border-none p-0 text-center text-sm font-normal leading-5 text-light-100 shadow-none outline-none ring-offset-transparent placeholder:text-base placeholder:font-normal placeholder:leading-6 placeholder:text-light-200 focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      url={file.url}
                      extension={file.extention}
                    />
                    <p className="line-clamp-1 text-sm font-normal leading-5 text-light-100">
                      {file.name}
                    </p>
                  </div>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className="line-clamp-1 text-xs font-normal leading-4 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="text-center text-sm font-normal leading-5 text-light-100">
                No files found
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

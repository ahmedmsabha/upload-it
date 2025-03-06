"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { Thumbnail } from "./thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

export function FileUploader({
  ownerId,
  accountId,
  className,
}: FileUploaderProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map((file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prev) => prev.filter((f) => f !== file));

          return toast({
            description: (
              <p className="text-[14px] font-normal leading-[20px] text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Maximum file size is 50MB.
              </p>
            ),
            className: "bg-red !rounded-[10px]",
          });
        }
        return uploadFile({
          file,
          ownerId,
          accountId,
          path: pathname,
        }).then((uploadedFile) => {
          if (uploadedFile) {
            setFiles((prev) => prev.filter((f) => f.name !== file.name));
          }
        });
      });

      await Promise.all(uploadPromises);
    },
    [toast, pathname, ownerId, accountId]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function handleRemoveFile(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) {
    e.stopPropagation();
    setFiles(files.filter((file) => file.name !== fileName));
  }
  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn(
          "primary-btn h-[52px] gap-2 px-10 shadow-drop-1 ",
          className
        )}
      >
        <Image src="/icons/upload.svg" alt="upload" width={24} height={24} />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-[20px] bg-white p-7 shadow-drop-3">
          <h4 className="text-lg font-medium leading-5 text-light-100">
            Uploading
          </h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                className="flex items-center justify-between  gap-3 rounded-xl p-3 shadow-drop-3"
                key={`${file.name}-${index}`}
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="mb-2 line-clamp-1 max-w-[300px] text-[14px] font-semibold leading-[20px]">
                    {file.name}
                    <Image
                      src="/icons/file-loader.gif"
                      alt="Loader"
                      width={80}
                      height={26}
                    />
                  </div>
                </div>

                <Image
                  src="/icons/remove.svg"
                  alt="Remove"
                  width={24}
                  height={24}
                  onClick={(e) => {
                    handleRemoveFile(e, file.name);
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

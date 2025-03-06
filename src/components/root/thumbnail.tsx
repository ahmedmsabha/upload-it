import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

export function Thumbnail({
  type,
  extension,
  url,
  className,
  imageClassName,
}: ThumbnailProps) {
  const isImage = type === "image" && extension !== "svg";

  console.log(url, isImage);

  return (
    <figure
      className={cn(
        "flex items-center justify-center size-[50px] min-w-[50px] overflow-hidden rounded-full bg-brand/10",
        className
      )}
    >
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          !isImage && imageClassName,
          isImage && "size-full object-cover object-center rounded-full"
        )}
      />
    </figure>
  );
}

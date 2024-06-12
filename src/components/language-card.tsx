import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LanguageCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  name: string;
  logo: string;
  className?: string;
}
export default function LanguageCard({
  name,
  logo,
  className,
  ...rest
}: LanguageCardProps) {
  return (
    <Link
      href={`/playground/${name.toLowerCase()}`}
      {...rest}
      className={cn(
        "border-secondary border-2 flex flex-col justify-center items-center font-bold p-3 h-[10rem] rounded-lg hover:scale-105 cursor-pointer transition-all  duration-300",
        className
      )}
    >
      <Image src={logo} width={30} height={30} alt={name} />
      <p>{name}</p>
    </Link>
  );
}

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface LanguageCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    <div
      {...rest}
      className={cn(
        "bg-slate-600 flex flex-col justify-center items-center font-bold w-[19rem] p-3 h-[10rem] rounded-lg hover:scale-105 cursor-pointer transition-all  duration-300",
        className
      )}
    >
      <Image src={logo} width={30} height={30} alt={name} />
      <p>{name}</p>
    </div>
  );
}

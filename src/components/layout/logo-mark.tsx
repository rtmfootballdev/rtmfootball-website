import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-9 w-9 shrink-0 overflow-hidden rounded-lg", className)}>
      <Image
        src="/rtm_logo.jpg"
        alt="RTM Football crest"
        fill
        sizes="36px"
        className="object-cover"
        priority
      />
    </span>
  );
}

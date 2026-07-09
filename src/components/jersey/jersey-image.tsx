import Image from "next/image";
import { JerseyArt } from "./jersey-art";
import type { Jersey } from "@/lib/types";
import { cn } from "@/lib/utils";

type JerseyImageInput = Pick<Jersey, "clube" | "tipo" | "era" | "fotoUrl">;

export function JerseyImage({
  jersey,
  className,
  sizes,
  priority,
}: {
  jersey: JerseyImageInput;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const hasPhoto = Boolean(jersey.fotoUrl);

  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {hasPhoto ? (
        <Image
          src={jersey.fotoUrl}
          alt={`${jersey.clube} jersey`}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <JerseyArt jersey={jersey} />
      )}
    </div>
  );
}

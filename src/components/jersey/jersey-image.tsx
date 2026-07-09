import Image from "next/image";
import { JerseyArt } from "./jersey-art";
import type { Era, Tipo } from "@/lib/types";
import { cn } from "@/lib/utils";

export function JerseyImage({
  clube,
  tipo,
  era,
  photoUrl,
  className,
  sizes,
  priority,
}: {
  clube: string;
  tipo: Tipo;
  era: Era;
  photoUrl?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`${clube} jersey`}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <JerseyArt jersey={{ clube, tipo, era }} />
      )}
    </div>
  );
}

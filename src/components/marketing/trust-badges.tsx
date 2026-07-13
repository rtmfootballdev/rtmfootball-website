import { PackageCheck, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { TRUST_FEATURE_KEYS } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const ICONS = [ShieldCheck, Sparkles, Tag, PackageCheck];

export async function TrustBadges({ className }: { className?: string }) {
  const { dict } = await getDictionary();

  return (
    <div className={cn("grid grid-cols-2 gap-6 lg:grid-cols-4", className)}>
      {TRUST_FEATURE_KEYS.map((key, index) => {
        const Icon = ICONS[index];
        const feature = dict.trust[key];
        return (
          <div key={key} className="flex flex-col items-start gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <p className="font-heading text-sm tracking-wide">{feature.title}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}

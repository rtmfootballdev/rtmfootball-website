export function CategoryPageHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="bg-pitch text-pitch-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <h1 className="font-heading text-3xl tracking-wide sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-pitch-foreground/80">{description}</p>
        <p className="mt-2 text-xs font-medium text-gold">
          {count} jersey{count === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}

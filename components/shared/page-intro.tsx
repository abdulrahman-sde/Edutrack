export function PageIntro({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        {description && (
          <p className="max-w-[60ch] text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

import { cn } from "@/lib/utils";

type TileData = {
  row: number;
  col: number;
  label?: string;
  color?: string;
};

export function Integrations() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center">
      <div className="max-w-xl space-y-5">
        <h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
          Built on a solid stack
        </h2>
        <p className="text-lg text-muted-foreground leading-8">
          EduTrack runs on Next.js, Express, PostgreSQL, and Cloudinary — a fast,
          reliable foundation designed to scale with your institution.
        </p>
      </div>

      <div className="place-items-end">
        <div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-90">
          {tiles.map((tile) => (
            <TechCard key={`${tile.row}_${tile.col}`} {...tile} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TechCard({ row, col, label, color }: TileData) {
  return (
    <div
      className={cn(
        "absolute flex size-18 items-center justify-center rounded-md border text-xs font-semibold",
        label
          ? "bg-card shadow-xs"
          : "bg-secondary/30",
      )}
      style={{ left: col * 72, top: row * 72 }}
    >
      {label && (
        <span className="text-center leading-tight px-1" style={{ color: color ?? "currentColor" }}>
          {label}
        </span>
      )}
    </div>
  );
}

const tiles: TileData[] = [
  { row: 0, col: 1 },
  { row: 0, col: 3, label: "Next.js", color: "oklch(0.98 0 0)" },

  { row: 1, col: 0 },
  { row: 1, col: 2, label: "Express", color: "oklch(0.75 0 0)" },
  { row: 1, col: 4, label: "Node.js", color: "oklch(0.72 0.18 142)" },

  { row: 2, col: 1, label: "Postgres", color: "oklch(0.65 0.15 250)" },
  { row: 2, col: 3, label: "JWT", color: "oklch(0.72 0.18 85)" },

  { row: 3, col: 0 },
  { row: 3, col: 2, label: "Cloudinary", color: "oklch(0.65 0.2 250)" },
  { row: 3, col: 4, label: "bcrypt", color: "oklch(0.70 0 0)" },

  { row: 4, col: 1, label: "TypeScript", color: "oklch(0.65 0.15 250)" },
  { row: 4, col: 3, label: "Tailwind", color: "oklch(0.72 0.18 220)" },
];

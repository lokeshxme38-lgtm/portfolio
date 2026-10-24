import { cn } from "@/lib/cn";
import type { HeatDay } from "@/lib/platforms";

const levelClass: Record<HeatDay["level"], string> = {
  0: "bg-line/35",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

interface HeatmapProps {
  days: HeatDay[] | null;
  /** Describes the data for screen readers, e.g. "LeetCode submissions". */
  label: string;
  unit: string;
}

/**
 * Contribution-style heatmap. With `days === null` it renders an empty ghost
 * grid (all cells level 0) so empty states still look intentional — it never
 * invents activity.
 */
export function Heatmap({ days, label, unit }: HeatmapProps) {
  const cells: Array<HeatDay | null> = days ? [...days] : Array.from({ length: 53 * 7 }, () => null);

  // Pad the front so the first column starts on Sunday, like GitHub's calendar.
  let leading = 0;
  if (days && days[0]) {
    leading = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  }
  const padded: Array<HeatDay | null> = [...Array.from({ length: leading }, () => null), ...cells];
  const total = days ? days.reduce((sum, d) => sum + d.count, 0) : 0;

  return (
    <figure className="m-0">
      <div className="overflow-x-auto pb-2">
        <div
          role="img"
          aria-label={days ? `${label}: ${total} ${unit} in the last year.` : `${label}: no data available.`}
          className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
        >
          {padded.map((day, i) => (
            <span
              key={day?.date ?? `empty-${i}`}
              title={day ? `${day.date}: ${day.count} ${unit}` : undefined}
              className={cn(
                "size-[11px] rounded-[3px]",
                day ? levelClass[day.level] : "bg-line/25",
                !days && "opacity-60",
              )}
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-muted">
        <span className="mono">{days ? `${total.toLocaleString()} ${unit} in the last year` : "No activity data yet"}</span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          {([0, 1, 2, 3, 4] as const).map((l) => (
            <span key={l} className={cn("size-[10px] rounded-[3px]", levelClass[l])} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}

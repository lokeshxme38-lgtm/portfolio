import { AlertCircle, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

/** Shown while a platform has no username configured yet. */
export function NotConnected({
  title,
  hint,
  envKey,
}: {
  title: string;
  hint: string;
  envKey: string;
}) {
  return (
    <div className="flex h-full min-h-48 flex-col items-start justify-center gap-3 rounded-2xl border border-dashed border-line/80 p-6">
      <Settings2 className="size-5 text-muted" aria-hidden="true" />
      <div>
        <p className="font-medium text-fg">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{hint}</p>
      </div>
      <code className="mono rounded-md bg-bg px-2 py-1 text-xs text-accent">{envKey}</code>
    </div>
  );
}

export function ErrorState({ message, children }: { message: string; children?: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex h-full min-h-48 flex-col items-start justify-center gap-3 rounded-2xl border border-line/80 bg-bg-2/60 p-6"
    >
      <AlertCircle className="size-5 text-muted" aria-hidden="true" />
      <div>
        <p className="font-medium text-fg">Live data is unavailable right now</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{message}</p>
      </div>
      {children}
    </div>
  );
}

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

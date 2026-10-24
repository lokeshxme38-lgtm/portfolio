import { Link } from "react-router-dom";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  size?: "md" | "sm";
}

type ButtonProps = CommonProps &
  (
    | ({ href: string; to?: never } & Omit<ComponentProps<"a">, "href" | "className" | "children">)
    | ({ to: string; href?: never } & Omit<ComponentProps<typeof Link>, "to" | "className" | "children">)
    | ({ href?: never; to?: never } & Omit<ComponentProps<"button">, "className" | "children">)
  );

const styles: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-accent hover:text-white border border-transparent",
  secondary:
    "bg-transparent text-fg border border-line hover:border-accent/60 hover:bg-accent/10",
  ghost: "bg-transparent text-muted hover:text-fg border border-transparent",
};

/**
 * One button for everything. Pass `href` (external / mailto / hash), `to`
 * (router link) or nothing (real <button>). A disabled state is available for
 * actions that are not configured yet.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-premium)]",
    "active:scale-[0.98] select-none",
    size === "md" ? "h-12 px-6 text-[0.95rem]" : "h-10 px-4 text-sm",
    styles[variant],
    className,
  );

  if ("to" in props && props.to !== undefined) {
    const { to, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _c; void _ch;
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _c; void _ch;
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ComponentProps<"button"> & CommonProps;
  void _v; void _s; void _c; void _ch;
  return (
    <button
      type="button"
      className={cn(cls, "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent")}
      {...rest}
    >
      {children}
    </button>
  );
}

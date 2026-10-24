import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, person } from "@/data";
import { useActiveSection, useScrolled } from "@/lib/useActiveSection";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const sectionIds = [...navLinks.map((l) => l.id), "contact"] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds, onHome);
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation, lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hrefFor = (id: string) => ({ pathname: "/", hash: `#${id}` });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-line/70 bg-bg/75 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-x grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 md:h-[4.5rem]">
        <Link
          to={hrefFor("home")}
          className="mono text-[0.95rem] font-semibold tracking-tight text-fg"
          aria-label={`${person.name} — home`}
        >
          {person.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = onHome && active === link.id;
              return (
                <li key={link.id} className="relative">
                  <Link
                    to={hrefFor(link.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block px-4 py-2 text-sm transition-colors duration-200",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button to="/#contact" variant="secondary" size="sm" className="hidden sm:inline-flex">
            Contact
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between py-10">
              <ul className="space-y-1">
                {[...navLinks, { id: "contact", label: "Contact" }].map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={hrefFor(link.id)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-line/50 py-4 text-3xl font-semibold tracking-tight",
                        onHome && active === link.id ? "text-accent" : "text-fg",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="mono mt-10 text-xs text-muted">{person.institutionShort}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

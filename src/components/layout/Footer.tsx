import { person } from "@/data";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {person.name}. Designed and built by me with React and TypeScript.
        </p>
        <SocialLinks withIcons={false} />
      </div>
    </footer>
  );
}

import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  useDocumentMeta("Page not found");
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="mono text-sm text-accent">404</p>
      <h1 className="heading-lg mt-4 text-fg">That page doesn&apos;t exist.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">The link may be old or mistyped. Head back to the portfolio to keep exploring.</p>
      <Button to="/" className="mt-9">
        Back to home
      </Button>
    </section>
  );
}

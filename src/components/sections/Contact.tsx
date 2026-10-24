import { Download, Mail } from "lucide-react";
import { profileUrls } from "@/lib/env";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t border-line/40">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 id="contact-title" className="heading-lg text-fg">
                Have something in mind?
                <br />
                Let&apos;s make it happen.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                Whether you have a website idea, a collaboration opportunity, or simply want to connect, I&apos;d be happy to hear from you.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-wrap gap-3">
                {profileUrls.email ? (
                  <Button href={profileUrls.email}>
                    <Mail className="size-4" aria-hidden="true" />
                    Email me
                  </Button>
                ) : (
                  <Button disabled title="Set VITE_CONTACT_EMAIL in .env.local">
                    <Mail className="size-4" aria-hidden="true" />
                    Email me
                  </Button>
                )}
                {profileUrls.resume ? (
                  <Button href={profileUrls.resume} variant="secondary" download>
                    <Download className="size-4" aria-hidden="true" />
                    Download Resume
                  </Button>
                ) : (
                  <Button variant="secondary" disabled title="Set VITE_RESUME_URL in .env.local">
                    <Download className="size-4" aria-hidden="true" />
                    Download Resume
                  </Button>
                )}
              </div>
              {(!profileUrls.email || !profileUrls.resume) && (
                <p className="mono mt-3 text-[0.7rem] text-muted">
                  Disabled buttons turn on when {[!profileUrls.email && "VITE_CONTACT_EMAIL", !profileUrls.resume && "VITE_RESUME_URL"].filter(Boolean).join(" and ")} {!profileUrls.email && !profileUrls.resume ? "are" : "is"} set.
                </p>
              )}
            </Reveal>

            <Reveal delay={0.2}>
              <SocialLinks className="mt-12" />
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

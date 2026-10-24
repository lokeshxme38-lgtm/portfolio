import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { projectInquiryTypes } from "@/data";
import { ContactError, sendInquiry, validateInquiry } from "@/lib/contact";
import type { InquiryErrors, InquiryValues } from "@/lib/contact";
import { env, profileUrls } from "@/lib/env";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";

const empty: InquiryValues = { name: "", email: "", projectType: projectInquiryTypes[0], message: "", website: "" };

const field =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-[0.95rem] text-fg placeholder:text-muted/60 " +
  "transition-colors duration-200 hover:border-muted/50 focus:border-accent focus:outline-none";

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<InquiryValues>(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<{ message: string; notConfigured: boolean } | null>(null);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const set = <K extends keyof InquiryValues>(key: K, value: InquiryValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validateInquiry(values);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((k) => found[k]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    setStatus("sending");
    setFailure(null);
    try {
      await sendInquiry(values);
      setStatus("success");
      setValues(empty);
    } catch (err) {
      const known = err instanceof ContactError;
      setFailure({
        message: known ? err.message : "Something went wrong. Please try again.",
        notConfigured: known && err.notConfigured,
      });
      setStatus("error");
    }
  }

  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: "name" | "email" | "message") => (errors[name] ? id(`${name}-error`) : undefined);

  return (
    <div className="card p-6 sm:p-9" aria-labelledby={id("title")}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            className="flex min-h-[26rem] flex-col items-start justify-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
            <h3 className="text-3xl font-semibold tracking-tight text-fg">Message sent.</h3>
            <p className="max-w-sm text-muted">Thanks for reaching out. I&apos;ll reply to the email address you gave.</p>
            <Button variant="secondary" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3 id={id("title")} className="text-2xl font-semibold tracking-tight text-fg">
              Project inquiry
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={id("name")} className="mb-2 block text-sm text-muted">
                  Your name
                </label>
                <input
                  ref={refs.name}
                  id={id("name")}
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describe("name")}
                  className={cn(field, errors.name && "border-rose-400/70")}
                  placeholder="Ada Lovelace"
                  maxLength={100}
                />
                {errors.name && (
                  <p id={id("name-error")} className="mt-2 text-sm text-rose-300">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={id("email")} className="mb-2 block text-sm text-muted">
                  Email address
                </label>
                <input
                  ref={refs.email}
                  id={id("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describe("email")}
                  className={cn(field, errors.email && "border-rose-400/70")}
                  placeholder="you@example.com"
                  maxLength={200}
                />
                {errors.email && (
                  <p id={id("email-error")} className="mt-2 text-sm text-rose-300">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor={id("type")} className="mb-2 block text-sm text-muted">
                What do you need?
              </label>
              <select
                id={id("type")}
                name="projectType"
                value={values.projectType}
                onChange={(e) => set("projectType", e.target.value)}
                className={cn(field, "appearance-none bg-[length:1rem] bg-[position:right_1rem_center] bg-no-repeat pr-10")}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239AA4B2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                {projectInquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={id("message")} className="mb-2 block text-sm text-muted">
                Tell me about it
              </label>
              <textarea
                ref={refs.message}
                id={id("message")}
                name="message"
                rows={6}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describe("message")}
                className={cn(field, "resize-y", errors.message && "border-rose-400/70")}
                placeholder="What are you building, and when do you need it?"
                maxLength={4200}
              />
              {errors.message && (
                <p id={id("message-error")} className="mt-2 text-sm text-rose-300">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor={id("website")}>Leave this field empty</label>
              <input
                id={id("website")}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>

            {status === "error" && failure && (
              <div role="alert" className="flex gap-3 rounded-xl border border-rose-400/30 bg-rose-400/5 p-4 text-sm">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden="true" />
                <div className="text-rose-100/90">
                  <p>{failure.message}</p>
                  {failure.notConfigured && (
                    <p className="mt-1 text-muted">
                      {profileUrls.email ? (
                        <>
                          You can email me directly at{" "}
                          <a className="text-fg underline underline-offset-4" href={profileUrls.email}>
                            {env.contactEmail}
                          </a>
                          .
                        </>
                      ) : (
                        "Set VITE_FORMSPREE_ENDPOINT, or the Resend variables for /api/contact, to turn the form on."
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send inquiry
                    <Send className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted">I&apos;ll only use your details to reply to this message.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

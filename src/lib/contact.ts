import { env } from "./env";

export interface InquiryValues {
  name: string;
  email: string;
  projectType: string;
  message: string;
  /** Honeypot. Real visitors never see or fill it. */
  website: string;
}

export type InquiryErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!EMAIL.test(v.email.trim())) errors.email = "Enter a valid email address, like name@example.com.";
  const len = v.message.trim().length;
  if (len < 10) errors.message = "Tell me a little more (at least 10 characters).";
  else if (len > 4000) errors.message = "Keep the message under 4,000 characters.";
  return errors;
}

export class ContactError extends Error {
  notConfigured: boolean;
  constructor(message: string, notConfigured = false) {
    super(message);
    this.notConfigured = notConfigured;
  }
}

/**
 * Delivery order:
 *  1. VITE_FORMSPREE_ENDPOINT (if set)
 *  2. /api/contact (Vercel function using Resend, secrets stay server-side)
 */
export async function sendInquiry(v: InquiryValues): Promise<void> {
  const payload = {
    name: v.name.trim(),
    email: v.email.trim(),
    projectType: v.projectType,
    message: v.message.trim(),
    website: v.website,
  };

  if (env.formspreeEndpoint) {
    const res = await fetch(env.formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new ContactError("The message could not be sent. Please try again in a moment.");
    return;
  }

  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ContactError("You appear to be offline. Check your connection and try again.");
  }

  const isJson = (res.headers.get("content-type") ?? "").includes("json");
  if (!isJson || res.status === 404 || res.status === 501) {
    throw new ContactError("The form isn't connected to an inbox yet.", true);
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new ContactError(body.message ?? "The message could not be sent. Please try again.");
  }
}

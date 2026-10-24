/**
 * Vercel Function — POST /api/contact
 *
 * Sends the project-inquiry form to your inbox through Resend.
 * Secrets stay on the server: set RESEND_API_KEY, CONTACT_TO_EMAIL and
 * CONTACT_FROM_EMAIL in Vercel → Settings → Environment Variables.
 *
 * If they are not set, the function answers 501 and the form tells the
 * visitor the form is not configured yet (it never pretends to send).
 */

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return json({ message: "The contact form is not configured yet." }, 501);
  }

  let body: { name?: string; email?: string; projectType?: string; message?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const projectType = (body.projectType ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2 || name.length > 100) return json({ message: "Please enter your name." }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200)
    return json({ message: "Please enter a valid email address." }, 422);
  if (message.length < 10 || message.length > 4000)
    return json({ message: "Please write between 10 and 4000 characters." }, 422);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}${projectType ? ` — ${projectType}` : ""}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
             ${projectType ? `<p>Project type: ${escapeHtml(projectType)}</p>` : ""}
             <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) return json({ message: "The message could not be sent. Please try again." }, 502);
  return json({ ok: true });
}

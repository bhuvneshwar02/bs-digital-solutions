import { env } from '../config/env.js'

// Sends a notification email via the Resend API (https://resend.com).
// If RESEND_API_KEY is not set the call is a no-op that just logs — submissions
// are always still stored in the database.
export async function sendMail({ subject, text, replyTo }) {
  const { resendApiKey, mailFrom, mailTo } = env
  if (!resendApiKey || !mailFrom || !mailTo) {
    console.log(`[mailer] skipped (not configured): ${subject}`)
    return { skipped: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: mailFrom,
        to: mailTo.split(',').map((s) => s.trim()),
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error(`[mailer] Resend error ${res.status}: ${body}`)
      return { ok: false }
    }
    console.log(`[mailer] sent: ${subject}`)
    return { ok: true }
  } catch (err) {
    console.error('[mailer] send failed:', err.message)
    return { ok: false }
  }
}

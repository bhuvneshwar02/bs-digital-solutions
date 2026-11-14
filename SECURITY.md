# Security

What's in place, and what you need to do at deploy time.

## Backend (Express API)

| Area | Protection |
| --- | --- |
| Transport headers | `helmet` (CSP, `nosniff`, `frame-ancestors 'none'`, `no-referrer`); HSTS in production; `x-powered-by` removed |
| CORS | Strict allow-list from `CORS_ORIGIN`; unknown browser origins get no `Access-Control-Allow-Origin` |
| Rate limiting | Global 400 req / 15 min per IP, plus tighter limits on `/auth/login` (10 / 15 min), `/contact` (10 / hr), `/applications` (8 / hr), `/job-board` (6 / hr) |
| Body size | JSON capped at 512 KB → `413` |
| Input validation | Every write body is parsed with a `zod` schema; unknown keys are stripped; string/array lengths capped |
| NoSQL injection | `express-mongo-sanitize` strips `$`/`.` from keys; query params coerced to strings; Mongoose `strictQuery` |
| Parameter pollution | `hpp` collapses duplicated query params |
| Auth | JWT (HS256) with `iss`/`aud`; login tokens expire **5 minutes** after issue (`/auth/me` and other API-issued tokens keep the 7-day default); `bcrypt` cost 12; constant-time login (dummy hash on unknown account → no user enumeration); a password change re-stamps the user and invalidates every existing token |
| Admin session cap | The admin panel signs out automatically 5 minutes after sign-in regardless of activity — enforced client-side (a timer in `AuthContext` plus a pre-request check) and server-side (the short token lifetime above). A password change from **Account** issues a fresh 5-minute token |
| Account lockout | 3 consecutive failed logins lock that account for 24 hours (rejects even the correct password); the account email is notified. Another admin can clear it from **Users & roles**, or run `npm run unlock -- <email>` on the server |
| Roles | `editor` = content only; `admin` = users, site settings, deletes. Last-admin cannot be demoted or deleted |
| Passwords | Minimum 10 characters (enforced server-side); new password must differ from current |
| Image URLs | Only site-relative (`/…`) or `http(s)://` accepted — blocks `javascript:` / `data:` in `<img src>` |
| Public job board | Honeypot + rate limit + **moderation queue** (nothing is public until an admin approves it); poster contact details are not returned in the public list until approved |
| Error responses | No stack traces or internal messages leak; generic `500` body |

### Deploy-time requirements (enforced — the server refuses to start in production without them)

- `JWT_SECRET` — set, and at least 32 chars. Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `MONGODB_URI` — set
- `CORS_ORIGIN` — set to your real frontend origin(s)
- `SEED_ADMIN_PASSWORD` — change from the documented default, then sign in and change it again from **Admin → Account** (which also rotates your token)
- MongoDB Atlas: use a strong DB-user password; restrict network access as far as your host allows

## Frontend (Vercel)

| Area | Protection |
| --- | --- |
| Response headers (`vercel.json`) | CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS |
| XSS | React escapes all rendered values; the only `dangerouslySetInnerHTML` is JSON-LD, run through an escaper that neutralises `</script>` and JS line separators |
| External links | All `target="_blank"` links carry `rel="noopener noreferrer"` |
| Admin token | Stored in `localStorage`; a `401`, or the 5-minute session cap, clears it and drops to the login screen. Losing the token to XSS is the main residual risk — the CSP, the lack of any HTML-injection sink, and the 5-minute token lifetime are what keep that shut |
| Dependencies | `npm audit` clean on both packages |

## Reporting

Email security concerns to the address on the contact page.

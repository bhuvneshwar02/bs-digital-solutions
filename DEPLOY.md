# Deploying BS Innovation Solutions

Current setup: **frontend on Hostinger**, **API on Render**, **database on MongoDB
Atlas**. Do the steps in this order. (A Vercel alternative for the frontend is at
the bottom.)

---

## 1. MongoDB Atlas — the database

1. Create a free account at <https://www.mongodb.com/cloud/atlas> and a free **M0** cluster.
2. **Database Access** → add a database user (username + a strong password). Save it.
3. **Network Access** → Add IP Address → **Allow access from anywhere** (`0.0.0.0/0`).
   Render's IPs are dynamic, so this is required on the free tier.
4. **Clusters → Connect → Drivers** → copy the connection string and insert your
   password + the DB name before the `?`:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/bs-innovation?retryWrites=true&w=majority
   ```
   This is `MONGODB_URI`.

---

## 2. Render — the API

1. <https://render.com> → **New → Web Service** → connect
   `github.com/bhuvneshwar02/bsinnovationsolutions`.
2. Settings:
   - **Name:** `bsinnovationsolutions` (this makes the URL `https://bsinnovationsolutions.onrender.com`)
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Instance Type:** Free
3. **Environment** → add:
   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` (**required** — the API refuses to start in prod without the keys below) |
   | `MONGODB_URI` | the Atlas string from step 1 |
   | `JWT_SECRET` | `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` — paste the output (32+ chars) |
   | `CORS_ORIGIN` | `https://bsinnovationsolutions.com,https://www.bsinnovationsolutions.com` |
   | `SEED_ADMIN_EMAIL` | your admin email |
   | `SEED_ADMIN_PASSWORD` | a strong password (you'll change it again after first login) |
   | `SEED_ADMIN_NAME` | `Bhuvneshwar Sharma` |
   | `RESEND_API_KEY` | from step 4 (optional — blank = no email, submissions still saved) |
   | `MAIL_FROM` | `BS Innovation Solutions <onboarding@resend.dev>` (until your domain is verified in Resend) |
   | `MAIL_TO` | the inbox that should receive enquiries |
4. Deploy. When live, open the Render **Shell** and run once:
   ```
   npm run seed
   ```
5. The service URL is `https://bsinnovationsolutions.onrender.com` — this is
   `VITE_API_URL` for the frontend (already set in `frontend/.env.production.example`).

> Free Render services sleep after 15 min idle; the first request then takes
> ~30 s to wake. The site shows its bundled fallback content during that cold start.

---

## 3. Frontend — build with the API URL, upload to Hostinger

The API URL is baked in at **build time**, so you build on your PC and upload the
result.

1. In `frontend/`, create `.env.production` (copy `.env.production.example`):
   ```
   VITE_API_URL=https://bsinnovationsolutions.onrender.com
   ```
2. Build:
   ```
   cd frontend
   npm install
   npm run build
   ```
   This produces `frontend/dist/` — **including a `.htaccess`** that fixes SPA
   routing (so `/jobs`, `/services`, `/admin` etc. work on refresh) and sets
   security headers.
3. In **Hostinger → hPanel → Files → File Manager**, open `public_html/` for
   `bsinnovationsolutions.com`. **Delete everything currently in it**, then upload
   **the entire contents of `frontend/dist/`** (not the `dist` folder itself — its
   contents: `index.html`, `assets/`, `.htaccess`, `favicon.svg`, `robots.txt`,
   `sitemap.xml`, `assets/…`).
   - The File Manager hides dotfiles by default — enable "show hidden files" so
     `.htaccess` uploads, or upload the zip and extract.
4. Visit `https://bsinnovationsolutions.com/jobs` — it should now load (not 404).

Every time you change site **code**, repeat steps 2–3. Site **content** (services,
pricing, blog, jobs, images, SEO text…) is edited in the admin panel with no
rebuild.

---

## 4. Email notifications (Resend) — optional

1. <https://resend.com> → free account → **API Keys → Create** → set as `RESEND_API_KEY` on Render.
2. **Domains → Add Domain** → `bsinnovationsolutions.com` → add the DNS records it
   shows at Hostinger (**hPanel → Domains → DNS / Nameservers**). Once verified, set
   `MAIL_FROM=BS Innovation Solutions <notify@bsinnovationsolutions.com>` and redeploy.
3. Until verified, keep `MAIL_FROM=…<onboarding@resend.dev>` — it only delivers to
   your own Resend account email.

---

## 5. "Site can't be reached" after a domain migration

If the site loads for others (check <https://dnschecker.org> for
`bsinnovationsolutions.com`) but not for you, your device/router/ISP is still
caching the old DNS. Fix on your machine:

- **Windows:** `ipconfig /flushdns` in Command Prompt
- **Restart your Wi-Fi router** (clears its DNS cache)
- Try it on **mobile data** — if it works there, it's your router/ISP; wait a few hours
- Or set your DNS to `1.1.1.1` / `8.8.8.8` (Wi-Fi adapter → IPv4 properties)
- Full propagation can take up to 24–48 h but is usually much faster

---

## 6. Check it works

- `https://bsinnovationsolutions.com` and a deep link like `/pricing` both load.
- `/admin` → sign in with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.
- **Admin → Account** → change your password.
- Edit a service, save, refresh the public page — the change shows.
- Submit the contact form → it appears in **Admin → Contact inbox** (and emails you if Resend is set).
- **Admin → Gallery** → replace the placeholder images.
- Submit **Post a job** on `/jobs` → approve it in **Admin → Job board** → it shows publicly.
- Submit the sitemap in **Google Search Console**; verify a **Google Business Profile**
  for local search.

See **[SECURITY.md](SECURITY.md)** for what's protected and the deploy-time requirements.

---

## Alternative: frontend on Vercel instead of Hostinger

If you'd rather not rebuild-and-upload each time:

1. <https://vercel.com> → **Add New → Project** → import the repo → **Root Directory:** `frontend`.
2. Env var `VITE_API_URL` = the Render URL.
3. Deploy. `frontend/vercel.json` handles routing + security headers automatically.
4. **Vercel → Domains** → add `bsinnovationsolutions.com`; at Hostinger set the DNS
   records Vercel shows (an `A` record to `76.76.21.21` and a `CNAME` `www` →
   `cname.vercel-dns.com`), or point the domain's nameservers at Vercel.
5. `git push` now redeploys the frontend automatically — no manual upload.

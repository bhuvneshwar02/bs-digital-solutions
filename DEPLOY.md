# Deploying BS Innovation Solutions

Three free services: **MongoDB Atlas** (database), **Render** (API), **Vercel**
(website). Do them in this order.

---

## 1. MongoDB Atlas — the database

1. Create an account at <https://www.mongodb.com/cloud/atlas> and create a free
   **M0** cluster.
2. **Database Access** → add a database user (username + password). Save the password.
3. **Network Access** → Add IP Address → **Allow access from anywhere**
   (`0.0.0.0/0`). Render's IPs are dynamic, so this is required on the free tier.
4. **Clusters → Connect → Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Insert your password and add the database name before the `?`:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/bs-innovation?retryWrites=true&w=majority
   ```
   Keep this — it's `MONGODB_URI`.

---

## 2. Render — the API

1. Push this repo to GitHub (it already has a remote).
2. <https://render.com> → **New → Web Service** → connect the repo.
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Instance Type:** Free
4. **Environment** → add:
   | Key | Value |
   | --- | --- |
   | `MONGODB_URI` | the Atlas string from step 1 |
   | `JWT_SECRET` | run `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` and paste the output |
   | `CORS_ORIGIN` | your Vercel URL, e.g. `https://bs-innovation-solutions.vercel.app` (add it after step 3; comma-separate a custom domain later) |
   | `SEED_ADMIN_EMAIL` | your admin email |
   | `SEED_ADMIN_PASSWORD` | a strong password |
   | `SEED_ADMIN_NAME` | `Bhuvneshwar Sharma` |
   | `NODE_ENV` | `production` |
   | `RESEND_API_KEY` | from step 5 below (optional — leave blank to skip email) |
   | `MAIL_FROM` | `BS Innovation Solutions <notify@bsinnovationsolutions.com>` |
   | `MAIL_TO` | where enquiry emails should land (your inbox) |
5. Deploy. When it's live, open the Render **Shell** tab and run once:
   ```
   npm run seed
   ```
   This creates the admin user and imports the starter content into Atlas.
6. Note the service URL, e.g. `https://bs-innovation-api.onrender.com` — this is
   `VITE_API_URL` for the frontend.

> Free Render services sleep after 15 min idle; the first request then takes
> ~30 s. The site's fallback content covers that cold start.

---

## 3. Vercel — the website

1. <https://vercel.com> → **Add New → Project** → import the repo.
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` · **Output:** `dist` (defaults are fine)
3. **Environment Variables** → add:
   | Key | Value |
   | --- | --- |
   | `VITE_API_URL` | the Render URL from step 2, no trailing slash |
4. Deploy. `frontend/vercel.json` already routes all paths to `index.html` so the
   client-side router works on refresh.
5. Copy the final Vercel URL back into Render's `CORS_ORIGIN` env var and let
   Render redeploy.

---

## 4. Email notifications (Resend)

Contact-form and application submissions are always saved to the database and
visible in the admin panel. To also get them emailed:

1. Create a free account at <https://resend.com>.
2. **API Keys → Create** → copy the key into Render as `RESEND_API_KEY`.
3. **Domains → Add Domain** → `bsinnovationsolutions.com` → add the DNS records it
   shows to your domain registrar. Once verified, set
   `MAIL_FROM=BS Innovation Solutions <notify@bsinnovationsolutions.com>`.
   - Until the domain is verified you can test with
     `MAIL_FROM=BS Innovation Solutions <onboarding@resend.dev>`, which only
     delivers to your own account email.
4. Set `MAIL_TO` to the inbox that should receive enquiries, and redeploy.

---

## 5. Connect the domain — bsinnovationsolutions.com

1. **Vercel → Project → Settings → Domains** → add `bsinnovationsolutions.com`
   and `www.bsinnovationsolutions.com`; follow the DNS instructions at your
   registrar.
2. Update Render's `CORS_ORIGIN` to `https://bsinnovationsolutions.com` (comma-add
   the Vercel `*.vercel.app` URL too if you still use it).
3. The site's canonical URLs, `robots.txt`, `sitemap.xml` and structured data are
   already set to `bsinnovationsolutions.com`.
4. Submit the sitemap in **Google Search Console** (add the domain property,
   verify via DNS, then Sitemaps → `https://bsinnovationsolutions.com/sitemap.xml`).
   Also create/verify a **Google Business Profile** for the local-search ranking —
   the "Leave a Google review" button already points at your Maps listing.

---

## 6. Check it

- Open the Vercel URL — the site should load content from the API.
- Go to `/admin`, sign in with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.
- Edit a service title, save, refresh the public page — the change shows.
- Submit the contact form and the **Start a project** / **Work with me** forms —
  each appears in **Admin → Contact inbox** / **Admin → Applications** and, if
  Resend is configured, arrives in your email.
- In **Admin → Gallery**, swap the placeholder images for real screenshots.
- In **Admin → Users**, change your own password and add any extra editors.

## Updating content later

Everything is in the admin panel — no redeploy needed for content changes
(services, portfolio, gallery, blog, pricing, the home page, SEO text, the
Google-review link, the "how I work" commitments…). Code changes: push to GitHub
and both Render and Vercel redeploy automatically.

Re-running `npm run seed` on Render is safe — it only *adds* newly-shipped
starter content and never overwrites your edits.

# BS Innovation Solutions

Full-stack website + CMS for **BS Innovation Solutions** — the freelance web / AI
studio of Bhuvneshwar Sharma.

```
.
├── frontend/   # React 19 + Vite + Tailwind — public site + /admin panel
└── backend/    # Node + Express + MongoDB — REST API and CMS
```

Every piece of content on the public site (services, portfolio, gallery, blog,
pricing, testimonials, FAQs, the home hero, the About page, SEO text, navigation,
the "how I work" commitments, the Google-review link…) is stored in MongoDB and
edited from the admin panel at `/admin`. If the API is unreachable the site falls
back to a bundled copy of the content so it never renders blank.

The public site includes a Gallery, a **Start a project** brief form and a
**Work with me** collaborator form — both stored in the database and emailed
(via Resend) to the owner. Local + remote SEO is built in: per-page titles and
meta, canonical URLs on `bsinnovationsolutions.com`, `robots.txt`, `sitemap.xml`
and `ProfessionalService` structured data with the Rampur location and
India + worldwide service area.

The top nav is intentionally short (Services · Portfolio · Pricing · About ·
Contact) — every other page is linked from the footer. Where a photo would go
(home hero, About story) the site draws a brand-coloured SVG illustration by
default; paste an image URL into **Admin → Site settings → Home hero / About
page** to use a real photo instead. Pricing has two groups — one-time **builds**
and monthly **care / operations** plans (including a day-to-day operations
retainer) — set per plan in **Admin → Pricing plans**.

## Run it locally

You need MongoDB running locally (or an Atlas URI).

```bash
# 1. API
cd backend
npm install
cp .env.example .env
npm run seed        # first admin + starter content
npm run dev         # http://localhost:4000

# 2. Site (separate terminal)
cd frontend
npm install
npm run dev         # http://localhost:5173  (proxies /api to :4000)
```

Then open `http://localhost:5173` for the site and `http://localhost:5173/admin`
for the CMS. Default admin login is whatever you set in `backend/.env`
(`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

## Deploy

See **[DEPLOY.md](DEPLOY.md)** — Vercel (frontend) + Render (API) + MongoDB Atlas,
all on free tiers.

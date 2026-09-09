# BS Innovation Solutions — Backend

Express + Mongoose REST API and CMS for the BS Innovation Solutions website.
All public site content lives in MongoDB and is edited through the admin panel
(served by the frontend at `/admin`).

## Setup

```bash
cd backend
npm install
cp .env.example .env          # then edit MONGODB_URI, JWT_SECRET, etc.
npm run seed                  # creates the first admin + imports starter content
npm run dev                   # http://localhost:4000
```

`npm run seed -- --fresh` wipes the content collections and reseeds them (the
admin user and contact messages are left alone).

## Environment

| Var | Purpose |
| --- | --- |
| `MONGODB_URI` | connection string (local or Atlas) |
| `JWT_SECRET` | signs admin session tokens — use a long random string |
| `CORS_ORIGIN` | comma-separated list of allowed frontend origins |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | first admin, created by `npm run seed` only when there are no users |

## API shape

Public (no auth):

- `GET /api/health`
- `GET /api/site` — site settings singleton
- `GET /api/bootstrap` — site settings + every published collection, in one call
- `GET /api/<collection>` — published rows, ordered (`services`, `portfolio`, `blog`, `pricing-plans`, `pricing-addons`, `testimonials`, `faqs`, `process-steps`, `tech-stack`, `timeline`, `core-values`, `service-categories`)
- `GET /api/services/:slug`, `/api/portfolio/:slug`, `/api/blog/:slug`
- `POST /api/contact` — enquiry submission (rate-limited, honeypot-protected)

Auth:

- `POST /api/auth/login` → `{ token, user }`
- `GET /api/auth/me`, `POST /api/auth/change-password`

Admin (Bearer token):

- `GET|POST|PUT|PATCH|DELETE /api/admin/<collection>[/:id]`, `POST /api/admin/<collection>/reorder`
- `GET|PUT /api/admin/settings` (PUT is admin-role only)
- `GET|POST|PUT|DELETE /api/admin/users` (admin-role only)
- `GET /api/contact`, `PATCH /api/contact/:id`, `DELETE /api/contact/:id`

## Roles

- **editor** — full CRUD on content collections.
- **admin** — everything, plus users and site settings, plus deletes on taxonomy.

## Structure

```
src/
  config/     env + mongoose connection
  models/     all Mongoose schemas (index.js)
  middleware/ auth (JWT) + central error handler
  lib/        zod validators, slug helpers
  routes/     auth · public · contact · admin/* · crud factory · registry
  seed/       seed.js + data/ (starter content)
```

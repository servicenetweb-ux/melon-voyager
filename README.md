# Melon Travel CMS Starter

Bright, summer-style Travel Agency CMS built with Next.js, TypeScript, Tailwind, PostgreSQL and Prisma.

## Main rule
If it appears on the website, it must be editable from `/melonadmin`.

## Includes
- Public pages: Home, Excursions, Excursion Details, Car Rental, Car Details, About, Contact
- Admin: Dashboard, Settings, Pages, Excursions, Cars, Categories
- Editable company info, theme colors, SEO, menu content structure, pages, excursions and cars
- Homepage with 6 admin-selected featured excursions and editable excursion categories
- Excursions page with search by excursion name
- Excursion detail pages with days, departure time, return time, meeting point, description and gallery
- Car rental grouped by editable car categories, with simple car image/title cards
- Contact page with WhatsApp, phone, email and Google Maps embed
- Optional Instagram and Facebook footer links controlled from Settings
- Prisma schema designed as reusable Travel CMS, not only for Melon
- Local upload API ready at `/api/upload`

## Setup
```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## Vercel
Before deploying, add `DATABASE_URL` in Vercel Environment Variables and make sure the database schema exists:
```bash
npm run db:sync
```

For a hosted database, run the same command locally while `.env` points to the hosted PostgreSQL URL, then deploy again.

In GitHub, the project root must contain `app/`, `prisma/`, `public/` and `package.json` directly. Check that `app/global.css` and `app/globals.css` are both visible in the repository before redeploying.

Do not upload `.env` to GitHub. Add these in Vercel Project Settings > Environment Variables:
```text
DATABASE_URL
ADMIN_SESSION_SECRET
BLOB_READ_WRITE_TOKEN
```

For media uploads on Vercel, create a Vercel Blob store from Project Settings > Storage > Blob. Vercel will add `BLOB_READ_WRITE_TOKEN` automatically when the Blob store is connected to the project.

For this version, if you already have a database from an older zip, run:
```bash
npx prisma migrate dev --name add-excursion-categories-and-times
npx prisma generate
npm run seed
```

For local testing, the quickest repair if you see a missing table error such as
`public.ExcursionCategory does not exist` is:
```bash
npm run db:sync
```

If the dev server is already open, stop it first with `Ctrl+C`, run the commands above, then start it again:
```bash
npm run dev
```

Open:
- Website: http://localhost:3000
- Admin: http://localhost:3000/melonadmin

Default admin login:
```text
Username: admin
Password: melonadmin2026
```

Change the admin username and password from `/melonadmin/settings`.
Change `ADMIN_SESSION_SECRET` in `.env` before using the site publicly.

## Notes
This is the first big starter update. Drag/drop gallery ordering, advanced language editing and Cloudinary can be added next.

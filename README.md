# Aman Jain

Website aur CMS ka structure. Dono Next.js + Tailwind CSS hain. Content ek shared folder se aata hai: `content/`.

## Run

Website: [http://localhost:3000](http://localhost:3000)

```bash
npm run dev:website
```

CMS: [http://localhost:3001](http://localhost:3001)

```bash
npm run dev:cms
```

Login screen: [http://localhost:3001/login](http://localhost:3001/login)

## Folders

```
apps/website     public website
apps/cms         admin panel
content          JSON content (pages, posts, services, work, media, enquiries, site)
packages/shared  types + content readers
```

## Website routes

- `/` Home
- `/about`
- `/services`
- `/work`
- `/blog` and `/blog/[slug]`
- `/contact`

## CMS routes

- `/` Dashboard
- `/pages`
- `/posts` and `/posts/new`
- `/services`
- `/work`
- `/media`
- `/enquiries`
- `/settings`
- `/login`

## Production build (Hostinger)

```bash
npm install
node php/build.mjs
```

Upload the contents of `hosting/` to the site root, or use `sjartistry-site.zip` after building locally.

## CMS

CMS login is enabled. Content is stored in `content/*.json` (and `hosting/storage/content/` on the live server).

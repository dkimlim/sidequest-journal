# Sidequest Journal

A personal journal/blog built with [Astro](https://astro.build).

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build the production site to `./dist/`        |
| `npm run preview`   | Preview the build locally before deploying    |

## Project structure

- `src/content/blog/` — journal entries (Markdown/MDX), validated against the schema in `src/content.config.ts`
- `src/components/PostCard.astro` — renders a single feed entry
- `src/pages/index.astro` — the home feed (full posts)
- `src/pages/blog/index.astro` — the compact archive list
- `src/layouts/BlogPost.astro` — single-post page layout

## Writing posts via the CMS

`/admin` runs [Decap CMS](https://decapcms.org) against the `github` backend
configured in `public/admin/config.yml`. See that file's header comment for
the one-time OAuth setup steps (GitHub OAuth App + a Netlify site to proxy
the auth handshake, since this site itself is static).

For local editing without GitHub auth, run `npx decap-server` in a second
terminal and uncomment `local_backend: true` in `public/admin/config.yml`.

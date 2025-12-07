# Om Shah — Portfolio

Personal site built with Next.js 16, React 19, Tailwind, and MDX. Navigation and social links are driven from JSON for easy updates.

## Quick start

```bash
bun install
bun run dev
# open http://localhost:3000
```

## Project structure

- `app/layout.tsx` — global layout, metadata, theme provider.
- `app/page.tsx` — home page sections (About via MDX, Projects, Vault, Kind Words).
- `app/guestbook/page.tsx` — guestbook route.
- `content/about.mdx` — About copy in MDX.
- `content/navigation.json` — sidebar/nav link config.
- `content/social.json` — social links + light/dark icons.
- `components/SideNav.tsx` / `components/Navbar.tsx` — render nav using JSON.
- `components/KindWords.tsx`, `components/VaultList.tsx`, `components/ProjectList.tsx` — section content.

## Content updates

- About: edit `content/about.mdx` (Markdown/MDX supported).
- Navigation: edit `content/navigation.json`.
- Social links: edit `content/social.json`.
- Vault/Kudos data: `content/vault.json`, `content/kind-words.json`.

## Scripts

- `bun run dev` — start dev server.
- `bun run build` — production build.
- `bun run start` — serve built app.
- `bun run lint` — eslint.

## Metadata / SEO

Metadata is defined in `app/layout.tsx`. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for correct Open Graph/Twitter URLs. Preview image uses `/pfp.jpg`.

## Notes

- MDX components are styled via `mdx-components.tsx`.
- Smooth scrolling and scroll progress are enabled globally.
- Tailwind is used via Next.js compiled CSS (no separate config needed). 

# @felix/design-system-site

Internal documentation portal for the Felix Pago Design System — the editorial,
brand-facing companion to the technical Storybook. Built with
**Vite, React 19 and Tailwind v4**, consuming the real **`@felix/ui`**
components and the live **`theme.css`** tokens. Bilingual (ES / EN). Access is
restricted to `@felixpago.com` and `@ext.felixpago.com` accounts — see
[Deploy](#deploy).

It mirrors the structure of the reference site (felix-design.vercel.app):
Overview, Principles, Colors, Typography, Illustrations, Iconography,
Components, Design Tokens, Editorial guidelines, Markdown, and MCP.

## Develop

From the repo root (workspaces are installed there):

```bash
npm install                                   # once, at the root
npm run dev -w @felix/design-system-site      # → http://localhost:5173
```

## Build

```bash
npm run build -w @felix/design-system-site    # tsc --noEmit && vite build → dist/
npm run preview -w @felix/design-system-site  # preview the production build
```

## How it consumes the design system

- **Components** come from `@felix/ui` (workspace dependency) — `Button`,
  `Badge`, `Alert`, `Input`, `Switch`, `Checkbox`, `Progress`, `Card`, `Text`.
  The Components section renders the **real** library, not mockups.
- **Tokens** come from `@felix/ui/theme.css` (aliased to source in
  `vite.config.ts` for hot-reload). All colors/spacing/radius reference the
  generated CSS variables.
- **Fonts** (Plain, Saans) live in `public/fonts/`. The `@font-face` rules
  come from `@felix/ui/fonts.css` and the `--font-*` tokens from
  `@felix/ui/theme.css` (both aliased to source in `vite.config.ts`); this app
  does not declare any typeface of its own.
- **Icons** are Phosphor (`@phosphor-icons/react`), per `DESIGN.md`.

## Structure

```
src/
  main.tsx        entry — wraps <App/> in <LangProvider/>
  App.tsx         shell, scroll-spy (IntersectionObserver), mobile menu
  Sidebar.tsx     dark slate sidebar, nav, language toggle, logo
  sections.tsx    one component per portal section
  data.ts         nav config, color swatches, token tables, inventory
  i18n.tsx        ES/EN context + useTr() translator
  styles.css      Tailwind + theme import + portal chrome CSS
```

## Pattern screenshots from Figma

The `do` / `don't` and gallery images on the Conversational guidelines pages
(`/patrones/:slug`) are PNGs exported from the Figma guidelines file and
committed to `public/assets/patterns/`. `src/patterns/content.ts` points at them
by filename; slots still waiting on an export use the shared `PENDING`
placeholder, with a comment naming the file that belongs there.

**The PNG is the WhatsApp screen only.** The card, the green/orange footer bar,
its icon and its translated `Do` / `Don't` label are drawn by `ExampleFigure`
(`src/pages/PatternPage.tsx`) from tokens. The Figma frames bake that bar in, so
it has to be cropped off — otherwise it renders twice.

To add a pair:

1. In Figma, note the frame's `node-id` and, via `get_metadata`, the bounding
   box of the bubbles inside it (the bar is the last child, usually 59px tall).
2. Export the frame as PNG at 2x.
3. Crop off the bar and the card padding — coordinates doubled, since the export
   is 2x. Use one shared rectangle for the `do` and the `don't` of a pair so the
   two line up side by side:

   ```bash
   node scripts/crop-figma-export.mjs raw.png public/assets/patterns/<pattern>-do-1.png 218 10 886 540
   ```

4. If the copy contains a flag emoji, paste it back in — see below.
5. Reference the file from `content.ts` as `` `${ASSETS}/<pattern>-do-1.png` ``.

Aim for a result near 220×150 as rendered (the template caps images at 220px
wide); a frame with a lot of empty padding crops down to something legible.

### Flag emoji do not survive the export

Figma does not rasterise regional-indicator emoji. A bubble whose copy reads
`R$5,85 🇧🇷 reais` exports with a **blank gap** where the flag should be, which
silently guts any example whose point _is_ the flag. The fix is to composite the
platform emoji (Apple Color Emoji) over that gap:

```bash
node scripts/composite-emoji.mjs shot.png scripts/assets/emoji-br.png shot.png 374,139 443,267
```

Positions are the top-left of the glyph, in pixels of the file being written.
To find them: the gap is the run of background pixels between glyphs on the text
line, and the glyph's ink sits ~2px above that line's baseline. Centre the glyph
in the gap.

`scripts/assets/emoji-br.png` is 🇧🇷 at 26×19 — drawn at `font-size: 28px`, which
matches an 18px cap height, the size the bubble copy uses in these frames. Node
cannot rasterise Apple Color Emoji, so a glyph for another flag has to come from
a browser: draw it on a canvas with `font: '28px "Apple Color Emoji"'`, crop to
its alpha bounds, and save the PNG next to this one.

## Deploy

Production is **`plaza.felixpago.com`**, on GKE behind Google SSO. Only
`@felixpago.com` and `@ext.felixpago.com` accounts get in; anyone without a
session is redirected to `/login`.

| Piece                                   | File                                               |
| --------------------------------------- | -------------------------------------------------- |
| Image (node build → nginx)              | `Dockerfile`                                       |
| The gate: routing, auth, headers        | `nginx/nginx.conf`                                 |
| Security headers (included per block)   | `nginx/security-headers.conf`                      |
| Login page, the only HTML served openly | `public/login/index.html`                          |
| CSP hash check for the login script     | `scripts/login-csp-hash.mjs`                       |
| Deployment + `oauth2-proxy` sidecar     | `../../.deploy/dev/values-design-system.yaml`      |
| Build & deploy pipeline                 | `../../.github/workflows/deploy-design-system.yml` |
| End-to-end gate test (needs Docker)     | `../../scripts/verify-auth-gate.sh`                |

### How the gate works

`nginx` is the only port the service exposes. It carries a server-level
`auth_request /oauth2/auth` — **every** route asks the `oauth2-proxy` sidecar
for a verdict before anything is served, and a `401` becomes a `302` to
`/login?rd=<original path>`. A new `location` is protected without doing
anything; the open routes are an explicit allow-list, each with `auth_request
off` and a comment saying why:

- `/login` — the login page itself
- `/oauth2/*` — start, callback, sign-out (the login flow)
- `/healthz` — the kubelet probe
- `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/robots.txt` —
  requested by the browser before there is a session

`oauth2-proxy` runs in auth-only mode (`upstream static://202`): it never
proxies content, so reaching it directly on the pod IP shows nothing.
`OAUTH2_PROXY_EMAIL_DOMAINS` is the authorization — Google authenticates
anyone with an account, that list decides who is let in. A Google account
outside the two domains comes back as `403`, which nginx turns into
`/login?error=denied` with a message.

### Why the login page is self-contained

`public/login/index.html` is the one HTML document served without a session,
so it cannot depend on anything protected:

- The app bundle (`assets/index-*.js`) **embeds `DESIGN.md` and
  `components.md`** via `?raw` — that is the content the gate protects.
- Plain and Saans are commercially licensed fonts; serving them openly would
  hand them to anyone. The page uses the system stack.
- Its single inline script is pinned by SHA-256 in the `Content-Security-Policy`
  nginx sends for `/login`. Editing the script changes the hash: run
  `npm run login:csp-hash -- --write` to update `nginx.conf`. The Dockerfile
  runs the check and fails the build if they disagree, and the file is in
  `.prettierignore` because the hash covers exact bytes.

The script only reads `?rd=` to build the "continue" link, and accepts nothing
but a same-site path (`/…`, never `//host`, `/\host` or a scheme).
`oauth2-proxy` validates `rd` again server-side.

### Verifying the gate

Neither `nginx` nor Docker may be on a laptop, so two checks run at image
build time: `nginx -t`, and the CSP hash check above. For behaviour, run

```bash
scripts/verify-auth-gate.sh
```

from the repo root on a machine with Docker. It builds the real image, stands
in a stub for `oauth2-proxy`, and asserts ~35 cases: nothing protected is
served without a `202` (bundle, fonts, SPA routes, `index.html`), the public
routes are, redirects carry the original path, `/oauth2/auth` is not reachable
from outside, and every security header arrives.

Unlike the Storybook — deployed on `@felix/ui` releases — the portal deploys
when the content it renders changes (`apps/design-system/**`, `packages/ui/**`,
and the two root `.md` files).

### First-time setup (DevOps)

The pipeline is inert until these exist:

1. DNS and TLS for `plaza.felixpago.com`, and the ingress for it. The values
   file sets `hostname: plaza.felixpago.com`; the Storybook uses a short name
   the chart suffixes with `.dev.fpago.com`, so confirm how the chart takes a
   full domain.
2. Secret `design-system-felix-ui-oauth2-client-secret`, key
   `design-system-felix-ui_oauth2_client_secret`.
3. Secret `design-system-felix-ui-oauth2-cookie-secret`, key
   `design-system-felix-ui_oauth2_cookie_secret` — a fresh 32-byte value, **not**
   the Storybook's, or a session on one app would be valid on the other.
4. `https://plaza.felixpago.com/oauth2/callback` added to the redirect URIs of
   the Google OAuth client. The values file reuses the Storybook's client id;
   to isolate the apps instead, create a new client and swap both the id and
   the secret.

### Vercel

`vercel.json` at the repo root still builds the site for **preview deployments
per PR**. The production Vercel domain must be removed in the project settings
once GKE is live — otherwise it keeps serving a public, unauthenticated copy and
the SSO gate protects nothing.

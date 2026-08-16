# Asymmetry

## Setup

Requires Node 18+.

```bash
npm install
npm approve-scripts puppeteer   # allows Chromium download (~170 MB, one-time)
npm install                     # re-run after approving
```

## Dev

```bash
npm run dev      # local dev server → http://localhost:5173
```

## Build

```bash
npm run build    # Vite build + pre-renders 9 routes with puppeteer
```

Pre-rendering requires Chromium (installed above). If it fails the build still succeeds — the site falls back to client-side rendering.

---

## TODOs

### Domain
- [ ] **grena.ge domain transfer** — if ownership of the `asymmetry.ge` domain needs to move between registrant accounts, initiate a transfer through [grena.ge](https://grena.ge). Requires auth code from current owner + ~5 day propagation window.

### Pending security
- [ ] **HSTS preload** — once the site has been stable on `includeSubDomains` for a few weeks, add `; preload` to the `Strict-Transport-Security` header in `netlify.toml` and submit to [hstspreload.org](https://hstspreload.org). This is a one-way commitment.

### Netlify (if team grows)
- [ ] **Paid plan for team members** — adding collaborators to the Netlify project requires a paid plan.
- [ ] **Build triggers from non-owners** — currently fine because the repo is public. If the repo ever goes private, collaborators won't be able to trigger Netlify builds without a paid plan.

### If a backend is added
- [ ] **Netlify WAF** — enables OWASP ruleset against SQLi, XSS, etc.
- [ ] **Rate limiting** — protects API endpoints from abuse.
- [ ] **Firewall traffic rules** — IP/country-level blocking.
None of these are needed while the site is purely static.

# BizCrush — 2BR apartment comparison UI

Static **HTML + CSS + JavaScript** app: at-a-glance 2-bedroom unit table, property detail cards, and a “Pick” bar for shortlisting.

## Files

| File | Role |
|------|------|
| `index.html` | Page structure and content |
| `styles.css` | Layout, typography, components |
| `app.js` | Pick buttons, toast, bottom picks bar |
| `APARTMENT_OPTIONS.md` | Source notes (same story as the UI) |
| `vite.config.js` | Dev server & production build for Bolt / hosting |

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Bolt.new

1. Push this folder to GitHub as its **own** repository (see below), or zip the folder and import if Bolt supports it.
2. In Bolt, **Import from GitHub** and select this repo (root should contain `package.json` and `index.html`).
3. Run **`npm install`** then **`npm run dev`** (Bolt usually does this automatically).
4. No API keys or environment variables are required.

## Deploy (static)

```bash
npm run build
```

Upload the `dist/` folder to any static host (Netlify, Vercel static, Cloudflare Pages, S3, etc.).

## Push to GitHub

From **this directory** (`webapp1/`):

```bash
git init
git add .
git commit -m "Initial commit: BizCrush 2BR apartment UI"

# Create an empty repo on GitHub, then:
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git branch -M main
git push -u origin main
```

With [GitHub CLI](https://cli.github.com/) (`gh auth login` first):

```bash
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push
```

---

*Seattle-area apartment search — Bizcrush.*

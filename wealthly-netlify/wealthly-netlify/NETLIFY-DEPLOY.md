# Deploy to Netlify

## Option A — drag & drop the ZIP (easiest)

1. Unzip `wealthly-netlify.zip`.
2. Go to https://app.netlify.com → **Add new site → Deploy manually**… if you prefer
   zero build setup, use Option B instead (recommended, because this app needs a build step).

## Option B — Netlify builds it for you (recommended)

1. Unzip the file and push the folder to a GitHub repo (or use `netlify deploy` CLI).
2. In Netlify: **Add new site → Import from Git** → pick the repo.
3. Netlify reads `netlify.toml` automatically:
   - Build command: `bun run build`
   - Publish directory: `dist`
   - Env: `NITRO_PRESET=netlify` + the public backend keys
4. Click **Deploy**. Done.

CLI alternative:

```bash
npm i -g netlify-cli
bun install
NITRO_PRESET=netlify bun run build
netlify deploy --prod --dir=dist
```

## One required step after the first deploy

The login/signup emails and OAuth redirects must know your new domain.
Send me your Netlify URL (e.g. `https://wealthly-xyz.netlify.app`) and I'll add it to the
backend's allowed redirect URLs — otherwise password reset / email links will bounce back
to the old domain.

## Notes

- Only publishable (public) keys are in `netlify.toml`. No secret keys are included.
- The database, auth and storage stay on the same backend, so all existing accounts and
  data keep working from the Netlify site.
- Node 22 is required (already pinned in `netlify.toml`).

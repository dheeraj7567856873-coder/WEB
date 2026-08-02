# Deploy Wealthly on Netlify

1. `npm install`
2. In Netlify → Site settings → Environment variables, add:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_PUBLISHABLE_KEY
   - VITE_SUPABASE_PROJECT_ID
   (same values as the included .env)
3. Build command: `npm run build` — Publish directory: `dist/client`
   `netlify.toml` already sets these plus `NITRO_PRESET=netlify` so SSR/server
   functions are emitted as Netlify functions.
4. Push the folder to GitHub and "Import from Git" in Netlify, or run
   `npx netlify deploy --build --prod` from this folder.

Notes
- The backend (database, auth, storage) stays on the existing hosted project;
  nothing to move.
- Add your Netlify URL to the auth provider's allowed redirect URLs so
  sign-in / password reset links come back to the right domain.

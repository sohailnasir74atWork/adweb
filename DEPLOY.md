# Deploy Adopt Me Values to Firebase Hosting

## Prerequisites

- Node.js 18+ installed
- Firebase CLI installed: `npm install -g firebase-tools`
- Logged in: `firebase login`

## Step 1: Initialize Firebase Hosting (one-time)

```bash
firebase init hosting
```

When prompted:
- **Project**: Select `adoptme-7b50c`
- **Public directory**: `out`
- **Single-page app**: No
- **GitHub deploys**: No

## Step 2: Configure Next.js for Static Export

Add `output: 'export'` to `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [ ... ] // keep existing
  },
};
```

## Step 3: Build & Export

```bash
npm run build
```

This generates the `out/` folder with all static HTML/CSS/JS.

## Step 4: Deploy

```bash
firebase deploy --only hosting
```

Your site will be live at:
- `https://adoptme-7b50c.web.app`
- `https://adoptme-7b50c.firebaseapp.com`

## Share with Friends

After deploying, share the URL:
```
https://adoptme-7b50c.web.app
```

## Custom Domain (Optional)

To use `adoptmevalues.app`:
1. Go to Firebase Console > Hosting > Add custom domain
2. Enter `adoptmevalues.app`
3. Follow DNS verification steps
4. Add the provided DNS records to your domain registrar

## Preview Before Deploying

To test the static export locally:
```bash
npm run build
npx serve out
```

## Quick Deploy Script

Add to `package.json` scripts:
```json
"deploy": "next build && firebase deploy --only hosting"
```

Then just run:
```bash
npm run deploy
```

## Troubleshooting

- **Images not loading?** Make sure `images.unoptimized: true` is set in next.config.ts (required for static export)
- **Dynamic routes 404?** Firebase Hosting serves static files. Dynamic routes like `/values/[slug]` work because `generateStaticParams` pre-renders them at build time.
- **API routes?** Static export doesn't support API routes. All data is fetched client-side from Firebase directly.

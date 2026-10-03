# Deploying the Co-op Tracker to Vercel

## What You'll Get

- Live URL for Ali to access from any device
- Cross-device progress persistence (phone, laptop, desktop all sync)
- Automatic backups to Vercel KV
- Falls back to local storage if KV unavailable

## Step-by-Step

### 1. Prepare Your Files

You have 3 files:
- `index.html` — the main tracker
- `api/progress.js` — serverless function that talks to Vercel KV
- `package.json` — declares the @vercel/kv dependency


### 2. Create a GitHub Repo (if you don't have one)

```bash
git init
git add .
git commit -m "Initial co-op tracker"
git remote add origin https://github.com/mpiantella/ali-reminder.git
git push -u origin main
```

### 3. Connect to Vercel

1. Go to https://vercel.com and sign in (GitHub, GitLab, or Bitbucket)
2. Click "New Project"
3. Select your repo
4. Framework: "Other" (it's mostly static)
5. Deploy

### 4. Set Up Vercel KV

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database** → **KV Store**
3. Name it `coop-tracker-kv` (or whatever you want)
4. The environment variables are automatically added to your project

### 5. Deploy

Vercel auto-deploys when you push to GitHub. Your app is live at a URL like:
```
https://coop-tracker.vercel.app
```

That's it. Ali can now:
- Visit the URL on any device
- Check off tasks (saves locally + syncs to KV)
- Come back a week later on a different device, see his progress intact

## How It Works

1. **On load**: Checks localStorage first (instant), then fetches from Vercel KV
2. **On task change**: Saves to localStorage immediately (instant feedback), then syncs to KV in the background
3. **Sync indicator**: Shows "Synced" when connected, "Local storage only" if KV is down
4. **Offline**: Works fine offline, syncs when internet returns

## Troubleshooting

### "Syncing..." stays forever
- Check that KV environment variables are set in Vercel dashboard
- Redeploy: `git push` to trigger a fresh deploy

### Progress not persisting across devices
- Make sure you're using the same URL on both devices
- Check browser console for errors (F12 → Console tab)

### API errors
- Vercel logs available in dashboard under "Logs" tab
- Check that `api/progress.js` deployed successfully

## Updates

If you want to update the tracker:
1. Edit `index.html` locally
2. `git add . && git commit -m "Update message" && git push`
3. Vercel auto-deploys within 30 seconds

No need to redeploy manually or touch the serverless function.

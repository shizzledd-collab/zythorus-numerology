# Zythorus Numerology - Vercel Deployment

## Quick Deploy (5 minutes)

### Option 1: Vercel CLI (Easiest)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to this folder in terminal/command prompt

3. Run:
   ```bash
   npm install
   vercel
   ```

4. Follow the prompts (just hit Enter for defaults)

5. Done! You'll get a live URL like `zythorus.vercel.app`

---

### Option 2: Vercel Dashboard (No Terminal)
1. Go to **vercel.com** and sign up
2. Click "Add New" → "Project"
3. Import this folder (or upload to GitHub first)
4. Click "Deploy"
5. Done!

---

## Updating the Live Site
After making changes:
```bash
vercel --prod
```

---

## Custom Domain
1. Buy domain (Namecheap, Google Domains, etc)
2. In Vercel dashboard → Settings → Domains
3. Add your domain
4. Update DNS records (Vercel tells you exactly what to do)

---

## File Structure
```
vercel-deploy/
├── src/
│   ├── App.jsx          ← Your numerology app
│   ├── main.jsx         ← Entry point
│   └── index.css        ← Base styles
├── index.html           ← HTML template
├── package.json         ← Dependencies
├── vite.config.js       ← Build config
└── README.md            ← This file
```

---

## Troubleshooting
- **"Command not found"**: Install Node.js first from nodejs.org
- **Build fails**: Make sure you ran `npm install` first
- **Page is blank**: Check browser console for errors

---

## Need Help?
- Vercel Docs: vercel.com/docs
- This project uses: React 18 + Vite + Tailwind CSS

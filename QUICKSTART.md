# Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: CI/CD Runs Automatically
GitHub Actions will:
- ✅ Check code quality
- ✅ Validate all files
- ✅ Run performance tests

### Step 3: Auto-Deploy to Vercel
Once CI passes, Vercel automatically deploys your site.

### Step 4: View Live Site
```
https://YOUR-PROJECT.vercel.app
```

---

## 🔧 First Time Setup

### 1. Clone & Install
```bash
git clone https://github.com/YOUR-USERNAME/cake-shop.git
cd cake-shop
npm install
```

### 2. Setup Vercel Secrets
In GitHub: Settings → Secrets → Add:
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Get these from:
```bash
vercel login
vercel link
```

### 3. Update WhatsApp Number
Edit `js/script.js`:
```javascript
const WHATSAPP_NUMBER = '919876543210'; // Your number
```

### 4. Push Changes
```bash
git add .
git commit -m "Setup: Add WhatsApp number"
git push origin main
```

✅ **Done!** Site deploys automatically.

---

## 📊 Workflow

```
Local Changes
    ↓ (npm start to test)
    ↓
git push origin main
    ↓
GitHub Actions CI/CD
    ↓
✅ Tests Pass → Vercel Deploy
❌ Tests Fail → Check logs, fix, retry
    ↓
Live at vercel.app
```

---

## 🎯 Daily Operations

### Add New Cake Product
```bash
git checkout -b feature/add-cheesecake
# Edit js/products.js
git add .
git commit -m "Add: Cheesecake to menu"
git push origin feature/add-cheesecake
# Create PR on GitHub → Merge to main
# ✨ Automatically deploys to Vercel
```

### Update Prices
```bash
git checkout -b fix/update-pricing
# Edit js/products.js (change prices)
git add .
git commit -m "Fix: Update pricing for 2024"
git push origin fix/update-pricing
# Create PR → Review → Merge
# ✨ Live in seconds
```

---

## 📖 Documentation

- **Full DevOps Guide**: See [DEVOPS.md](DEVOPS.md)
- **Project Details**: See [README.md](README.md)

---

## ⚠️ Troubleshooting

**Deployment shows old content?**
- Hard refresh: `Ctrl+Shift+Delete` then `Ctrl+F5`
- Check Vercel Dashboard → Deployments

**CI/CD Failed?**
- Check GitHub Actions logs
- Look for red ❌ in workflow
- Fix errors and push again

**WhatsApp links not working?**
- Verify phone number format in `js/script.js`
- Should be: `91` + number (no spaces)

---

## 🎓 Learn More

- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Static Site Deployment](https://vercel.com/docs/concepts/deployments/static-and-dynamic)

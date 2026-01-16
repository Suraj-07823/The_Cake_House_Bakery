# DevOps Setup Guide

## Prerequisites
- GitHub Account
- Vercel Account (https://vercel.com)
- Node.js 18+

## 1. Setup GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cake-shop.git
git push -u origin main
```

## 2. Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Import GitHub repository: `YOUR-USERNAME/cake-shop`
3. Vercel auto-detects configuration from `vercel.json`
4. Click **Deploy**

## 3. Setup Deployment Secrets

In GitHub repository settings → Secrets and variables → Actions:

```
VERCEL_TOKEN       = Your Vercel API token (from vercel.com/account/tokens)
VERCEL_ORG_ID      = Your Vercel Organization ID
VERCEL_PROJECT_ID  = Your Vercel Project ID
```

### Get Vercel Credentials:
```bash
vercel login
vercel link  # Links project and shows IDs
```

## 4. CI/CD Pipeline Flow

```
git push main
    ↓
GitHub Actions (lint-and-test)
    ↓
File integrity check
    ↓
Performance validation
    ↓
Deploy to Vercel (if main branch)
    ↓
Live at vercel.app
```

## 5. Local Development

```bash
npm install
npm start
# Open http://localhost:8000
```

## 6. Making Changes

```bash
git checkout -b feature/new-feature
# Make your changes
npm test
git add .
git commit -m "Add: description of changes"
git push origin feature/new-feature
# Create Pull Request on GitHub
# After PR approval, merge to main
git push origin main  # Automatic deployment to Vercel
```

## 7. Monitor Deployments

- **GitHub**: https://github.com/YOUR-USERNAME/cake-shop/actions
- **Vercel**: https://vercel.com/dashboard

## 8. Rollback (if needed)

In Vercel Dashboard:
1. Go to Deployments
2. Select previous stable deployment
3. Click "Promote to Production"

## Monitoring & Alerts

- GitHub Actions sends deployment status to commits
- Vercel sends emails on deployment success/failure
- Check logs in GitHub Actions tab
- Monitor performance in Vercel Analytics

## Troubleshooting

### Deployment Failed
- Check GitHub Actions logs: Actions tab → Failed workflow
- Check Vercel logs: Deployments tab
- Verify `vercel.json` is valid JSON
- Ensure all required files exist

### Site Shows Old Content
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check Vercel Deployments - ensure latest is "Production"

### Environment Variables Not Working
- Add to Vercel Project Settings → Environment Variables
- Redeploy: `vercel --prod`

## Commands Reference

```bash
# Local development
npm start              # Start local server

# Testing
npm test              # Run tests

# Vercel CLI (optional)
vercel                # Preview deployment
vercel --prod         # Deploy to production
vercel env list       # Check environment variables
```

## Best Practices

1. ✅ Always test locally before pushing
2. ✅ Use meaningful commit messages
3. ✅ Create pull requests for review
4. ✅ Keep `main` branch stable
5. ✅ Monitor GitHub Actions logs
6. ✅ Don't commit `.env` file
7. ✅ Use `.env.example` for documentation

## Security

- Never expose VERCEL_TOKEN in code
- Keep GitHub secrets confidential
- Review all PRs before merging to main
- Use branch protection rules on main

# 🔧 Command Reference

Quick reference for all common commands.

## Initial Setup

```bash
# Navigate to project
cd c:\Users\VICTUS\OneDrive\Desktop\The_Cake_House_Bakery

# Initialize Git (first time only)
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Cake House with CI/CD"

# Create main branch
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/cake-shop.git

# First push
git push -u origin main
```

## Development

```bash
# Install dependencies
npm install

# Start local server
npm start
# Access at: http://localhost:8000

# Run tests
npm test

# Build (static - not needed)
npm run build
```

## Git Workflow

```bash
# Check status
git status

# Create feature branch
git checkout -b feature/add-new-cake
# OR
git checkout -b fix/bug-name
# OR
git checkout -b docs/add-guide

# Make changes to files
# Edit js/products.js, etc.

# Stage changes
git add .
# OR
git add path/to/file.js

# Commit
git commit -m "feature: Add chocolate lava cake"

# Push to GitHub
git push origin feature/add-new-cake

# Switch back to main
git checkout main

# Pull latest
git pull origin main

# Delete feature branch (after merge)
git branch -d feature/add-new-cake
git push origin --delete feature/add-new-cake
```

## Vercel Deployment (Local)

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# Show deployment logs
vercel logs

# List all deployments
vercel list

# Remove old deployment
vercel rm <url>
```

## GitHub Management

```bash
# Clone repo
git clone https://github.com/YOUR-USERNAME/cake-shop.git

# Add upstream (if you forked)
git remote add upstream https://github.com/ORIGINAL-OWNER/cake-shop.git

# Fetch from upstream
git fetch upstream

# Merge upstream changes
git merge upstream/main

# View all remotes
git remote -v

# Change remote URL
git remote set-url origin https://github.com/NEW-USERNAME/cake-shop.git
```

## Common Workflows

### Adding a New Cake

```bash
# Step 1: Create branch
git checkout -b feature/add-cheesecake

# Step 2: Edit products
# Open: js/products.js
# Add to cakes array:
# {
#     id: 13,
#     name: 'Cheesecake Delight',
#     description: 'Rich creamy cheesecake',
#     price: 500,
#     emoji: '🧀'
# }

# Step 3: Test locally
npm start
# Visit: http://localhost:8000/pages/cakes.html

# Step 4: Commit
git add .
git commit -m "feature: Add cheesecake to menu"

# Step 5: Push
git push origin feature/add-cheesecake

# Step 6: Create Pull Request on GitHub
# → Describe changes
# → Submit PR
# → Wait for checks to pass
# → Merge to main
# → Watch auto-deployment
```

### Updating Prices

```bash
git checkout -b fix/update-pricing
# Edit js/products.js (change price fields)
git add .
git commit -m "fix: Update Q1 2024 pricing"
git push origin fix/update-pricing
# Create PR → Merge → Deploy ✨
```

### Fixing a Bug

```bash
git checkout -b fix/whatsapp-format
# Edit js/script.js (fix the issue)
git add .
git commit -m "fix: Correct WhatsApp number formatting"
git push origin fix/whatsapp-format
# Create PR → Merge → Deploy ✨
```

### Changing Colors

```bash
git checkout -b style/new-theme
# Edit css/style.css (change colors)
git add .
git commit -m "style: Update theme to warm gold"
git push origin style/new-theme
# Create PR → Merge → Deploy ✨
```

## Checking Status

```bash
# Git status
git status

# View recent commits
git log --oneline -5

# View changes (uncommitted)
git diff

# View changes (staged)
git diff --staged

# View branch
git branch

# View remote branches
git branch -r

# View all branches (local & remote)
git branch -a
```

## Undoing Changes

```bash
# Undo changes to file (before staging)
git checkout -- filename.js

# Unstage file
git reset HEAD filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
# ⚠️ Be careful! This deletes changes.

# Revert to previous commit
git revert <commit-hash>

# View commit history
git log --oneline
```

## Handling Merge Conflicts

```bash
# Start merge
git merge origin/main

# If conflicts occur:
# 1. Open conflicted files
# 2. Fix conflicts (look for <<<<<<, ======, >>>>>>>>)
# 3. Stage fixes
git add .

# 4. Continue merge
git merge --continue

# Or abort if needed
git merge --abort
```

## Environment Variables

```bash
# View environment variables
cat .env.example

# Create .env from template
cp .env.example .env

# Edit .env
# (Add your WhatsApp number)

# Verify .env is in .gitignore
cat .gitignore | grep .env

# Test environment variable loading
node -e "console.log(process.env.WHATSAPP_NUMBER)"
```

## Debugging

```bash
# View full error logs
npm test

# Check syntax
node -c js/products.js
node -c js/script.js
node -c js/customCake.js

# View all files being tracked
git ls-files

# Check file size
ls -lh css/style.css

# Count lines of code
wc -l js/*.js css/style.css
```

## Performance Check

```bash
# Check build size
du -sh .

# Check CSS size
wc -c css/style.css

# Check JS size
wc -c js/*.js | tail -1

# Test local server speed
curl -w '@curl-format.txt' http://localhost:8000
```

## Advanced

```bash
# Rebase instead of merge (cleaner history)
git rebase origin/main

# Cherry-pick specific commit
git cherry-pick <commit-hash>

# View blame (who changed what)
git blame filename.js

# Stash changes temporarily
git stash

# Apply stashed changes
git stash pop

# View diff between branches
git diff main feature/new-feature

# View diff with stats
git diff --stat main feature/new-feature

# Force push (⚠️ use carefully)
git push --force origin branch-name
```

## Useful Aliases

```bash
# Add these to Git config for shortcuts:

git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'

# Now use:
git st         # instead of git status
git co main    # instead of git checkout main
git ci -m "msg" # instead of git commit -m "msg"
```

## CI/CD Commands

```bash
# Check GitHub Actions status
gh action-run list

# View workflow file syntax
cat .github/workflows/deploy.yml

# Test GitHub Actions locally (optional)
# Install: npm install -g act
act

# View Vercel deployments
vercel list

# Check Vercel logs
vercel logs

# Monitor deployment
vercel --prod --watch
```

## Cleanup

```bash
# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Prune deleted branches
git fetch --prune

# Clean untracked files
git clean -fd

# Remove from Git (but keep local)
git rm --cached filename

# Global .gitignore
git config --global core.excludesfile ~/.gitignore_global
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Check status | `git status` |
| Create branch | `git checkout -b feature/name` |
| Commit | `git commit -m "msg"` |
| Push | `git push origin branch-name` |
| Pull | `git pull origin main` |
| View log | `git log --oneline` |
| Switch branch | `git checkout main` |
| Undo changes | `git checkout -- file.js` |
| Test locally | `npm start` |
| Run tests | `npm test` |
| Deploy | `vercel --prod` |

---

**Pro Tip:** Use `git status` frequently to see what changed!

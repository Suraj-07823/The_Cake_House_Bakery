# Contributing

Thank you for contributing to The Cake House! This guide explains how to contribute effectively.

## Code of Conduct

- Be respectful to all contributors
- Focus on code quality and user experience
- Test before submitting pull requests

## How to Contribute

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR-USERNAME/cake-shop.git
cd cake-shop
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# OR
git checkout -b fix/your-bug-fix
# OR
git checkout -b docs/your-documentation
```

### 3. Make Changes
- Edit relevant files (HTML, CSS, JS)
- Update product data in `js/products.js`
- Keep code clean and readable
- Follow existing code style

### 4. Test Locally
```bash
npm install
npm start
# Open http://localhost:8000
# Test all pages and features
npm test
```

### 5. Commit Changes
```bash
git add .
git commit -m "Type: Description of changes"
```

**Commit message format:**
- `feature: Add new cake product`
- `fix: Correct WhatsApp link format`
- `style: Update button colors`
- `docs: Add deployment guide`
- `perf: Optimize CSS loading`

### 6. Push & Create Pull Request
```bash
git push origin feature/your-feature-name
```

1. Go to GitHub repository
2. Click "Compare & pull request"
3. Fill in description
4. Submit for review

### 7. CI/CD Checks
Your PR will automatically:
- ✅ Run code quality checks
- ✅ Validate HTML/CSS/JavaScript
- ✅ Check performance metrics
- ✅ Preview deployment

Fix any failures and push again.

### 8. Merge & Deploy
Once approved:
1. Maintainer merges PR to main
2. GitHub Actions auto-deploys to Vercel
3. Your changes are live! 🎉

## What to Contribute

### 🎂 Add Products
- Edit `js/products.js`
- Add cake or cupcake to appropriate array
- Include: id, name, description, price, emoji

Example:
```javascript
{
    id: 7,
    name: 'Lemon Drizzle Cake',
    description: 'Zesty lemon cake with glaze',
    price: 420,
    emoji: '🍋'
}
```

### 🎨 Improve Design
- Update colors in `css/style.css`
- Enhance mobile responsiveness
- Add smooth animations
- Improve accessibility

### 🐛 Fix Bugs
- Found an issue? Create an issue first
- Describe the problem
- Propose a solution
- Submit PR with fix

### 📝 Documentation
- Update README.md
- Add deployment guides
- Improve comments in code
- Fix typos

### ⚡ Performance
- Optimize CSS
- Reduce file sizes
- Improve load times
- Enhance animations

## Style Guide

### HTML
```html
<!-- Use semantic tags -->
<section>
<header>
<nav>
<article>
<footer>

<!-- Use meaningful class names -->
class="product-card"
class="btn-primary"

<!-- Keep indentation consistent (2 spaces) -->
```

### CSS
```css
/* Group related styles */
/* Use comments for sections */
/* ===== Button Styles ===== */

/* Keep selectors specific */
.product-card .btn-primary { }

/* Use consistent naming (kebab-case) */
.category-grid { }
```

### JavaScript
```javascript
// Use clear variable names
const customCakeSelection = {};

// Use camelCase for functions
function renderProducts() { }

// Add comments for complex logic
// Calculate total price including discounts
let totalPrice = basePrice + taxes;

// Use const/let, avoid var
const products = [ ];
```

## PR Review Process

1. **Automated Checks** (GitHub Actions)
   - Code quality ✅
   - Tests pass ✅
   - Performance OK ✅

2. **Code Review** (Maintainer)
   - Check code quality
   - Verify functionality
   - Test changes
   - Request changes if needed

3. **Approval & Merge**
   - Approve PR
   - Merge to main
   - Auto-deploy to Vercel

## Common Contributions

### Add a Cake Product
1. Edit `js/products.js`
2. Add new object to `cakes` array
3. Test on cakes.html page
4. Commit and push
5. Create PR

### Update Pricing
1. Edit `js/products.js`
2. Update `price` field
3. Test custom cake builder
4. Commit and push
5. Create PR

### Change Theme Colors
1. Edit `css/style.css`
2. Find color variables (lines ~110-130)
3. Change hex values
4. Test all pages
5. Commit and push
6. Create PR

### Fix WhatsApp Integration
1. Edit `js/script.js` or `js/customCake.js`
2. Fix the issue
3. Test on actual device
4. Commit and push
5. Create PR

## Need Help?

- Check [README.md](README.md) for overview
- Read [DEVOPS.md](DEVOPS.md) for infrastructure
- See [QUICKSTART.md](QUICKSTART.md) for setup
- Open an issue to discuss improvements

## Recognition

All contributors are recognized in:
- GitHub Contributors page
- Project documentation
- Commit history

Thank you for making The Cake House better! 🍰

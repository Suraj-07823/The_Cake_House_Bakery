# The Cake House - Website

A responsive bakery website with WhatsApp order integration and custom cake builder.

## Setup

1. Update WhatsApp number in `js/script.js`:
   ```javascript
   const WHATSAPP_NUMBER = 'YOUR_NUMBER'; // Format: 91XXXXXXXXXX
   ```

2. Update products in `js/products.js` as needed

3. Customize colors in `css/style.css`

## Development

```bash
# Run locally
python -m http.server 8000
# OR
npx http-server
```

Visit: `http://localhost:8000`

## Deployment

**GitHub Pages:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cake-shop.git
git push -u origin main
```

**Netlify:** Drag & drop project folder at netlify.com

**Vercel:** Import GitHub repo at vercel.com

## File Structure

```
├── index.html              # Home
├── pages/
│   ├── cakes.html
│   ├── cupcakes.html
│   └── custom.html        # Custom cake builder
├── css/style.css
└── js/
    ├── products.js        # Product data
    └── script.js          # Functionality
```

## Features

- Mobile-first responsive design
- Dynamic product rendering
- WhatsApp order integration
- Custom cake builder
- No backend/database required

## Customization

**Add products:** Edit `js/products.js`

**Change theme:** Modify color codes in `css/style.css`
- Primary: `#d4745f`
- Secondary: `#fff5f0`

**Update copy:** Edit HTML files directly

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## License

Free to use and modify.

# 🍰 The Cake House - Website

A simple, mobile-first website for a local cake shop. Built with clean HTML, CSS, and vanilla JavaScript.

## Features

✨ **Clean & Simple Design**
- Warm, bakery-themed colors
- Mobile-first responsive layout
- Easy to navigate

📱 **Mobile Optimized**
- Perfect on phones, tablets, and desktops
- Touch-friendly buttons
- Fast loading times

🛒 **Product Showcase**
- Dynamic product rendering
- Cakes and cupcakes categories
- Product cards with images, names, and prices

💬 **WhatsApp Integration**
- One-click ordering via WhatsApp
- Pre-filled order messages
- No need for payment gateway

📊 **Easy to Maintain**
- Static HTML (no database needed)
- Product data in JavaScript file
- No backend required

## Project Structure

```
The_Cake_House_Bakery/
│
├── index.html                 # Home page
├── pages/
│   ├── cakes.html            # Cakes category page
│   └── cupcakes.html         # Cupcakes category page
│
├── css/
│   └── style.css             # All styling
│
├── js/
│   ├── products.js           # Product data
│   └── script.js             # Functionality & WhatsApp links
│
├── images/                    # (Optional) for product images
└── README.md                  # This file
```

## How to Customize

### 1. Update WhatsApp Number

Edit `js/script.js` and replace the example number with your WhatsApp number:

```javascript
const WHATSAPP_NUMBER = '919876543210'; // Replace with your number
```

**Format:** Include country code, no spaces or special characters
- India: 91XXXXXXXXXX
- USA: 1XXXXXXXXXX
- UK: 441XXXXXXXXX

### 2. Edit Shop Name & Details

Edit `index.html` and update:
- Logo in navbar
- Shop name in hero section
- Contact information in footer

### 3. Add/Edit Products

Edit `js/products.js`:

```javascript
{
    id: 1,
    name: 'Your Cake Name',
    description: 'Brief description',
    price: 450,
    emoji: '🍰'  // Use any cake emoji
}
```

### 4. Change Colors

Edit `css/style.css` and modify these color variables:

```css
Primary color: #d4745f (coral/rust)
Secondary: #fff5f0 (cream)
Background: #fdfbf7 (off-white)
Text: #4a4a4a (dark gray)
```

## How to Add Product Images

Currently, products use emojis. To add real images:

1. Place images in `images/` folder
2. Update `js/products.js` to include image path:
   ```javascript
   image: 'images/chocolate-cake.jpg'
   ```
3. Update `js/script.js` to render image instead of emoji:
   ```javascript
   <img src="${product.image}" alt="${product.name}" class="product-image">
   ```

## How to Run Locally

### Using VS Code Live Server
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Website opens automatically in browser

### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: http://localhost:8000

### Using Node.js (http-server)
```bash
npm install -g http-server
http-server
```

## How to Deploy

### GitHub Pages (Free & Easy)

1. **Create GitHub account** (if you don't have one)
2. **Create new repository:**
   - Name: `username.github.io` (for personal site)
   - OR any name like `cake-shop`
3. **Upload files:**
   - Push your project files to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/cake-shop.git
   git push -u origin main
   ```
4. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select `main` branch as source
   - Save
5. **Access your site:**
   - `https://username.github.io/cake-shop`
   - Or if named `username.github.io`: `https://username.github.io`

### Netlify (Drag & Drop)

1. **Go to netlify.com** → Sign up for free
2. **Deploy:**
   - Drag and drop your project folder to Netlify
   - OR connect GitHub repo for automatic updates
3. **Custom domain:**
   - Buy domain and connect in Netlify settings
   - Your site is live!

### Traditional Hosting (GoDaddy, Bluehost, etc.)

1. Buy hosting plan
2. Upload files via FTP
3. Your site is live on your domain

## WhatsApp Order Flow

1. Customer clicks **"Order Now"** button
2. WhatsApp opens with pre-filled message:
   ```
   Hi! I would like to order 1 of "Chocolate Cake" for ₹450. 
   Please confirm availability and delivery date.
   ```
3. You receive message and confirm manually
4. Customer pays via Cash on Delivery or UPI

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS & macOS)
- ✅ Edge
- ✅ Samsung Internet
- ✅ All modern browsers

## Performance

- **Page Load Time:** < 1 second
- **Mobile Friendly:** 100% responsive
- **SEO Friendly:** Basic SEO tags included
- **Accessibility:** Semantic HTML

## Tips for Success

1. **Keep it updated:** Update products regularly
2. **Professional photos:** Use high-quality cake images
3. **Quick responses:** Reply to WhatsApp messages quickly
4. **Mobile first:** Test on actual phones
5. **Simple messaging:** Keep order process simple

## Troubleshooting

**WhatsApp link not working?**
- Check the phone number format (with country code)
- Ensure number is valid and has WhatsApp installed

**Styling looks broken?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check that CSS file path is correct

**Products not showing?**
- Check browser console for errors (F12)
- Verify products.js is properly formatted

## Support

For issues or questions:
1. Check this README
2. Review browser console (F12) for error messages
3. Verify all file paths are correct
4. Test on different browser/device

## License

Free to use and modify for your business.

---

**Happy selling! 🍰💕**

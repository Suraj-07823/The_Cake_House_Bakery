# The Cake House

A mobile-first bakery website with WhatsApp integration and custom cake builder. Designed for local cake shops to showcase products and enable direct ordering.

## Features

✨ **Responsive Design** - Mobile-first, works on all devices  
🎂 **Product Showcase** - Display cakes and cupcakes dynamically  
🎨 **Custom Cake Builder** - Users design their own cakes with pricing  
💬 **WhatsApp Integration** - One-click ordering with pre-filled messages  
⚡ **Fast & Lightweight** - No backend, pure HTML/CSS/JavaScript  
🔧 **Easy to Maintain** - Simple product data structure  

## Getting Started

### Prerequisites
- Git
- Node.js (for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/cake-shop.git
cd cake-shop
```

2. Install dependencies:
```bash
npm install
```

3. Update WhatsApp number in `js/script.js`:
```javascript
const WHATSAPP_NUMBER = 'YOUR_NUMBER'; // Format: 91XXXXXXXXXX
```

4. Run locally:
```bash
npm start
```

### Deployment

Push to main branch - Vercel deploys automatically:
```bash
git add .
git commit -m "Update cakes"
git push origin main
```

## How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/new-feature`)
3. **Commit** changes (`git commit -m 'Add new feature'`)
4. **Push** to branch (`git push origin feature/new-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Update `js/products.js` to add/modify cakes
- Edit `css/style.css` for style changes
- Test locally before pushing
- Keep commits clear and descriptive
- No direct pushes to main - use pull requests

## Project Usage

### Add Products
Edit `js/products.js` and add to the cakes/cupcakes array:
```javascript
{
    id: 1,
    name: 'Cake Name',
    description: 'Description',
    price: 450,
    emoji: '🍫'
}
```

### Customize Theme
Colors in `css/style.css`:
- Primary: `#d4745f`
- Secondary: `#fff5f0`
- Background: `#fdfbf7`

### File Structure
```
├── index.html              # Home
├── pages/
│   ├── cakes.html
│   ├── cupcakes.html
│   └── custom.html
├── css/style.css
├── js/
│   ├── products.js
│   ├── script.js
│   └── customCake.js
├── vercel.json
└── package.json
```

## License

MIT License

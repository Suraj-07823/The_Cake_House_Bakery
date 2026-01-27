# 📷 How to Add Product Images

Your Cake House now displays product images! Here's how to use them.

## Current Setup

All products now have image references in `js/products.js`:

```javascript
{
    id: 1,
    name: 'Chocolate Delight Cake',
    description: 'Rich chocolate cake with creamy frosting',
    price: 450,
    image: 'images/chocolate-delight-cake.jpg',  // Image path
    emoji: '🍫'  // Fallback emoji if image not found
}
```

## How It Works

✅ **If image exists**: Displays the actual image  
✅ **If image missing**: Falls back to emoji automatically  

No errors if images aren't uploaded yet!

---

## 📸 Adding Product Images

### Step 1: Create Image Files

Save your cake photos in the `images/` folder:

```
The_Cake_House_Bakery/
└── images/
    ├── chocolate-delight-cake.jpg
    ├── strawberry-dream.jpg
    ├── vanilla-classic.jpg
    ├── red-velvet-elegance.jpg
    ├── carrot-cake-special.jpg
    ├── eggless-chocolate.jpg
    ├── chocolate-cupcake.jpg
    ├── vanilla-delight.jpg
    ├── strawberry-bliss.jpg
    ├── caramel-crunch.jpg
    ├── red-velvet-cupcake.jpg
    └── lemon-zest.jpg
```

### Step 2: Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: 600x400px (recommended)
- **File Size**: < 100KB (optimized)
- **Naming**: Use lowercase, hyphens instead of spaces

### Step 3: Upload to GitHub

```bash
# Add your images to the images/ folder
git add images/
git commit -m "Add: Product images"
git push origin main
```

### Step 4: Auto-Deploy!

GitHub Actions → CI/CD validates → Vercel deploys  
Your images go live! 🎉

---

## 🎨 Image Naming Convention

Match the product name to the image filename:

| Product Name | Image File |
|------|------|
| Chocolate Delight Cake | chocolate-delight-cake.jpg |
| Strawberry Dream | strawberry-dream.jpg |
| Vanilla Classic | vanilla-classic.jpg |
| Red Velvet Elegance | red-velvet-elegance.jpg |
| Carrot Cake Special | carrot-cake-special.jpg |
| Eggless Chocolate | eggless-chocolate.jpg |
| Chocolate Cupcake | chocolate-cupcake.jpg |
| Vanilla Delight | vanilla-delight.jpg |
| Strawberry Bliss | strawberry-bliss.jpg |
| Caramel Crunch | caramel-crunch.jpg |
| Red Velvet Cupcake | red-velvet-cupcake.jpg |
| Lemon Zest | lemon-zest.jpg |

---

## ✏️ If You Rename a Product

Update the image path in `js/products.js`:

```javascript
{
    id: 1,
    name: 'New Cake Name',
    description: 'Description',
    price: 450,
    image: 'images/new-cake-name.jpg',  // Update filename
    emoji: '🍫'
}
```

---

## 🖼️ Image Optimization Tips

### Compress Images Before Uploading

**Using TinyPNG** (https://tinypng.com):
1. Upload image
2. Download compressed version
3. Save to `images/` folder

**Using Vercel Image Optimization**:
- Images are automatically optimized on Vercel
- Served with next-gen formats (WebP)
- Cached globally for fast loading

### Recommended Image Specs

```
Format:      JPG or WebP
Dimensions:  600x400px (3:2 aspect ratio)
Size:        50-100KB max
Quality:     80-90% compression
```

---

## 🎬 How to Add Images Step-by-Step

### Quick Example: Add Chocolate Cake Image

1. **Take/Get the image**
   - Photo of your chocolate cake

2. **Resize to 600x400px**
   - Use online tool (pixlr.com, photopea.com)

3. **Compress the image**
   - Use TinyPNG or similar
   - Reduce to < 100KB

4. **Save with correct name**
   - `chocolate-delight-cake.jpg`

5. **Add to images folder**
   - Place in `images/` directory

6. **Commit and push**
   ```bash
   git add images/chocolate-delight-cake.jpg
   git commit -m "Add: Chocolate delight cake image"
   git push origin main
   ```

7. **Done!** ✨
   - Auto-deployed to Vercel in 2 minutes
   - Image goes live

---

## 🐛 Troubleshooting

### Image Not Showing (but no errors)

**Cause**: Image file not found  
**Solution**: 
1. Check filename matches exactly (case-sensitive)
2. Verify file is in `images/` folder
3. Check image format (JPG, PNG, WebP)

### Only Emoji Shows

**Cause**: Image path is broken  
**Solution**:
1. Verify image filename in `js/products.js`
2. Check image exists in `images/` folder
3. Hard refresh browser (Ctrl+Shift+Delete)

### Image Quality is Poor

**Cause**: Image not optimized  
**Solution**:
1. Compress image (TinyPNG)
2. Use correct dimensions (600x400px)
3. Re-upload and push again

---

## 📊 All Product Image Paths

```javascript
// Cakes
'images/chocolate-delight-cake.jpg'
'images/strawberry-dream.jpg'
'images/vanilla-classic.jpg'
'images/red-velvet-elegance.jpg'
'images/carrot-cake-special.jpg'
'images/eggless-chocolate.jpg'

// Cupcakes
'images/chocolate-cupcake.jpg'
'images/vanilla-delight.jpg'
'images/strawberry-bliss.jpg'
'images/caramel-crunch.jpg'
'images/red-velvet-cupcake.jpg'
'images/lemon-zest.jpg'
```

---

## ✅ You're Ready!

Your website supports images and will:
- ✅ Show actual images when available
- ✅ Fallback to emoji if image missing
- ✅ Auto-optimize images on Vercel
- ✅ Serve from global CDN
- ✅ Auto-deploy when you push new images

**Start adding images now and watch them go live! 🎉**

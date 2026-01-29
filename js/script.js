// WhatsApp Configuration
// IMPORTANT: Replace with your actual WhatsApp number (with country code, no spaces or symbols)
const WHATSAPP_NUMBER = '919822316064'; // Example: India +91 number

// Update cart count display
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (!cartCountEl) return;

    // If cartManager instance is available, use it
    if (typeof cartManager !== 'undefined') {
        try {
            const totalItems = cartManager.getTotalItems();
            cartCountEl.textContent = totalItems;
            return;
        } catch (e) {
            console.warn('cartManager exists but failed to read items', e);
        }
    }

    // Fallback: read from localStorage so homepage (which may not load cart.js) shows correct count
    try {
        const saved = localStorage.getItem('cakeHouseOrders');
        if (!saved) {
            cartCountEl.textContent = '0';
            return;
        }
        const orders = JSON.parse(saved);
        const total = Array.isArray(orders) ? orders.reduce((sum, o) => sum + (Array.isArray(o.items) ? o.items.length : 0), 0) : 0;
        cartCountEl.textContent = total;
    } catch (err) {
        console.error('Error reading cart from localStorage', err);
        cartCountEl.textContent = '0';
    }
}

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navCenter = document.querySelector('.nav-center');
    
    // Update cart count on page load
    updateCartCount();
    
    // Listen for storage changes (cart updates from other tabs/windows)
    window.addEventListener('storage', updateCartCount);
    
    if (hamburger && navCenter) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navCenter.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navCenter.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navCenter.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navCenter.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navCenter.classList.contains('active')) {
                hamburger.classList.remove('active');
                navCenter.classList.remove('active');
            }
        });
    }
});

// Function to create WhatsApp message link
function createWhatsAppLink(productName, price, quantity = 1) {
    const message = `Hi! I would like to order ${quantity} of "${productName}" for ₹${price * quantity}. Please confirm availability and delivery date.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Function to render products dynamically
function renderProducts(category, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }

    if (!products[category]) {
        console.error(`Category "${category}" not found in products`);
        return;
    }

    const categoryProducts = products[category];
    
    // Clear container
    container.innerHTML = '';

    // Create product cards
    categoryProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">₹${product.price}</p>
                <a href="${createWhatsAppLink(product.name, product.price)}" 
                   class="btn btn-primary" 
                   target="_blank"
                   rel="noopener noreferrer">
                   Order Now
                </a>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Function to render products with cart buttons
function renderProductsWithCart(category, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }

    if (!products[category]) {
        console.error(`Category "${category}" not found in products`);
        return;
    }

    const categoryProducts = products[category];
    
    // Clear container
    container.innerHTML = '';

    // Create product cards
    categoryProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">₹${product.price}</p>
                <button class="btn btn-primary add-to-cart-btn" data-product-name="${product.name}" data-product-price="${product.price}" data-product-emoji="${product.emoji}" data-product-category="${category}">
                   🛒 Add to Cart
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Add delegated event listener once per container
    container.removeEventListener('click', handleAddToCart);
    container.addEventListener('click', handleAddToCart);
}

function handleAddToCart(event) {
    const addBtn = event.target.closest('.add-to-cart-btn');
    if (!addBtn) return;
    
    // Prevent multiple clicks
    if (addBtn.disabled) return;
    addBtn.disabled = true;
    
    const productData = {
        name: addBtn.dataset.productName,
        price: parseInt(addBtn.dataset.productPrice),
        emoji: addBtn.dataset.productEmoji,
        category: addBtn.dataset.productCategory,
        quantity: 1
    };
    
    if (!cartManager) {
        alert('Cart system loading... please try again');
        addBtn.disabled = false;
        return;
    }
    
    // Create a new order block if none exists
    if (cartManager.orders.length === 0) {
        currentOrderId = cartManager.addOrderBlock();
    } else {
        currentOrderId = cartManager.orders[0].id;
    }
    
    // Add the product to the cart
    cartManager.addItemToOrder(currentOrderId, productData);
    
    // Show toast notification
    if (typeof Toast !== 'undefined') {
        Toast.success(`"${productData.name}" added to cart!`);
    }
    
    // Re-enable button after animation
    setTimeout(() => {
        addBtn.disabled = false;
    }, 300);
}

// Home page - Set up WhatsApp CTA
document.addEventListener('DOMContentLoaded', function() {
    const whatsappCTA = document.getElementById('whatsapp-cta');
    if (whatsappCTA) {
        const message = 'Hi! I would like to know more about your cakes and place an order.';
        const encodedMessage = encodeURIComponent(message);
        whatsappCTA.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        whatsappCTA.target = '_blank';
        whatsappCTA.rel = 'noopener noreferrer';
    }
});

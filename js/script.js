// WhatsApp Configuration
// IMPORTANT: Replace with your actual WhatsApp number (with country code, no spaces or symbols)
const WHATSAPP_NUMBER = '919822316064'; // Example: India +91 number

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
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
                <button class="btn btn-primary add-to-cart-btn" data-product='${JSON.stringify({name: product.name, price: product.price, emoji: product.emoji, category: category})}'>
                   🛒 Add to Cart
                </button>
            </div>
        `;
        container.appendChild(productCard);

        // Add event listener to the add to cart button
        const addBtn = productCard.querySelector('.add-to-cart-btn');
        addBtn.addEventListener('click', function() {
            const productData = JSON.parse(this.dataset.product);
            if (!cartManager) {
                alert('Cart system loading... please try again');
                return;
            }
            
            // Create a new order block if none exists
            if (cartManager.orders.length === 0) {
                currentOrderId = cartManager.addOrderBlock();
            } else {
                currentOrderId = cartManager.orders[0].id;
            }
            
            // Add the product to the cart
            cartManager.addItemToOrder(currentOrderId, {
                ...productData,
                quantity: 1
            });
            
            // Show toast notification
            if (typeof Toast !== 'undefined') {
                Toast.success(`"${productData.name}" added to cart!`);
            }
        });
    });
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

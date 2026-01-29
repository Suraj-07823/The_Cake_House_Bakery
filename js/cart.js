// Toast Notification System
class Toast {
    static show(message, type = 'success', duration = 3000) {
        // Create container if it doesn't exist
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;

        // Add to container
        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });

        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    }

    static success(message, duration = 3000) {
        this.show(`✅ ${message}`, 'success', duration);
    }

    static error(message, duration = 3000) {
        this.show(`❌ ${message}`, 'error', duration);
    }

    static info(message, duration = 3000) {
        this.show(`ℹ️ ${message}`, 'info', duration);
    }

    static warning(message, duration = 3000) {
        this.show(`⚠️ ${message}`, 'warning', duration);
    }
}

// Cart Management System
class CartManager {
    constructor() {
        this.orders = this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = localStorage.getItem('cakeHouseOrders');
        return saved ? JSON.parse(saved) : [];
    }

    saveToStorage() {
        localStorage.setItem('cakeHouseOrders', JSON.stringify(this.orders));
        // Update cart count in navbar with requestAnimationFrame for better performance
        if (typeof updateCartCount !== 'undefined') {
            requestAnimationFrame(updateCartCount);
        }
    }

    addOrderBlock() {
        const newOrder = {
            id: Date.now(),
            items: [],
            createdAt: new Date().toLocaleString()
        };
        this.orders.push(newOrder);
        this.saveToStorage();
        return newOrder.id;
    }

    addItemToOrder(orderId, item) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.items.push({
                ...item,
                itemId: Date.now()
            });
            this.saveToStorage();
            return true;
        }
        return false;
    }

    updateItemQuantity(orderId, itemId, newQuantity) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            const item = order.items.find(i => i.itemId === itemId);
            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
                this.saveToStorage();
                return true;
            }
        }
        return false;
    }

    removeItemFromOrder(orderId, itemId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.items = order.items.filter(item => item.itemId !== itemId);
            if (order.items.length === 0) {
                this.removeOrderBlock(orderId);
            } else {
                this.saveToStorage();
            }
            return true;
        }
        return false;
    }

    removeOrderBlock(orderId) {
        this.orders = this.orders.filter(o => o.id !== orderId);
        this.saveToStorage();
    }

    clearCart() {
        this.orders = [];
        this.saveToStorage();
    }

    getTotalItems() {
        return this.orders.reduce((total, order) => total + order.items.length, 0);
    }

    getTotalPrice() {
        return this.orders.reduce((total, order) => {
            return total + order.items.reduce((orderTotal, item) => {
                return orderTotal + (item.price * item.quantity);
            }, 0);
        }, 0);
    }

    getAllItems() {
        return this.orders;
    }

    getCartMessage() {
        let message = 'Order Summary:\n\n';
        let orderNum = 1;

        this.orders.forEach(order => {
            message += `📦 Order Block ${orderNum}:\n`;
            order.items.forEach(item => {
                message += `  • ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
            });
            message += '\n';
            orderNum++;
        });

        const totalPrice = this.getTotalPrice();
        message += `Total Amount: ₹${totalPrice}\n`;
        message += `\nPlease confirm availability and delivery date.`;

        return message;
    }
}

// Initialize cart manager
const cartManager = new CartManager();
let currentOrderId = null;

// Get all items (cakes, cupcakes, decorations)
function getAllItemsData() {
    const allItems = [];

    // Add cakes
    if (products.cakes) {
        products.cakes.forEach(cake => {
            allItems.push({
                ...cake,
                type: 'cake',
                category: 'Cakes'
            });
        });
    }

    // Add cupcakes
    if (products.cupcakes) {
        products.cupcakes.forEach(cupcake => {
            allItems.push({
                ...cupcake,
                type: 'cupcake',
                category: 'Cupcakes'
            });
        });
    }

    // Add decorations
    if (products.decorations) {
        products.decorations.forEach(deco => {
            allItems.push({
                ...deco,
                type: 'decoration',
                category: 'Decorations'
            });
        });
    }

    return allItems;
}

// DOM Elements
let emptyCart, cartContent, orderBlocks, modal, modalContent, closeModal, itemSelect, itemQuantity;
let typeButtons, confirmAddBtn, cancelModalBtn, clearCartBtn, sendOrderBtn;
let totalItemsEl, totalPriceEl, previewPrice, previewTotal;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    emptyCart = document.getElementById('empty-cart');
    cartContent = document.getElementById('cart-content');
    orderBlocks = document.getElementById('order-blocks');
    modal = document.getElementById('add-item-modal');
    modalContent = document.querySelector('.modal-content');
    closeModal = document.querySelector('.close-modal');
    itemSelect = document.getElementById('item-select');
    itemQuantity = document.getElementById('item-quantity');
    typeButtons = document.querySelectorAll('.type-btn');
    confirmAddBtn = document.getElementById('confirm-add');
    cancelModalBtn = document.getElementById('cancel-modal');
    clearCartBtn = document.getElementById('clear-cart');
    sendOrderBtn = document.getElementById('send-order');
    totalItemsEl = document.getElementById('total-items');
    totalPriceEl = document.getElementById('total-price');
    previewPrice = document.getElementById('preview-price');
    previewTotal = document.getElementById('preview-total');

    // Event listeners
    typeButtons.forEach(btn => {
        btn.addEventListener('click', handleTypeSelection);
    });

    itemSelect.addEventListener('change', updateItemPreview);
    itemQuantity.addEventListener('input', updateItemPreview);
    confirmAddBtn.addEventListener('click', handleAddItem);
    cancelModalBtn.addEventListener('click', closeItemModal);
    closeModal.addEventListener('click', closeItemModal);
    clearCartBtn.addEventListener('click', handleClearCart);
    sendOrderBtn.addEventListener('click', handleSendOrder);

    // Add event listener for adding new order block
    const addOrderBtn = document.querySelector('.add-order-btn');
    if (addOrderBtn) {
        addOrderBtn.addEventListener('click', handleAddOrderBlock);
    }

    // Add click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeItemModal();
        }
    });

    renderCart();
});

// Render cart
function renderCart() {
    const orders = cartManager.getAllItems();
    
    if (orders.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';
    orderBlocks.innerHTML = '';

    orders.forEach((order, index) => {
        const orderBlock = createOrderBlockElement(order, index + 1);
        orderBlocks.appendChild(orderBlock);
    });

    // Add button to create new order block
    const addBlockBtn = document.createElement('button');
    addBlockBtn.className = 'btn btn-secondary add-new-block';
    addBlockBtn.innerHTML = '➕ Add New Order Block';
    addBlockBtn.addEventListener('click', handleAddOrderBlock);
    orderBlocks.appendChild(addBlockBtn);

    updateCartSummary();
}

// Create order block element
function createOrderBlockElement(order, blockNumber) {
    const block = document.createElement('div');
    block.className = 'order-block';
    block.innerHTML = `
        <div class="block-header">
            <h3>Order Block ${blockNumber}</h3>
            <button class="btn-delete-block" data-order-id="${order.id}" title="Delete entire order block">
                🗑️ Delete Block
            </button>
        </div>
        <div class="block-items">
            ${order.items.map(item => `
                <div class="block-item" data-item-id="${item.itemId}">
                    <div class="item-details">
                        <span class="item-emoji">${item.emoji}</span>
                        <div class="item-info">
                            <p class="item-name">${item.name}</p>
                            <p class="item-category">${item.category}</p>
                            <div class="item-editing">
                                <div class="quantity-editor">
                                    <label>Qty:</label>
                                    <button class="qty-btn qty-minus" data-order-id="${order.id}" data-item-id="${item.itemId}">−</button>
                                    <input type="number" class="qty-input" value="${item.quantity}" min="1" data-order-id="${order.id}" data-item-id="${item.itemId}">
                                    <button class="qty-btn qty-plus" data-order-id="${order.id}" data-item-id="${item.itemId}">+</button>
                                </div>
                                <p class="item-pricing">
                                    ₹${item.price} × <span class="qty-display">${item.quantity}</span> = <strong class="total-display">₹${item.price * item.quantity}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <button class="btn-remove-item" data-order-id="${order.id}" data-item-id="${item.itemId}" title="Remove item">
                        ✕
                    </button>
                </div>
            `).join('')}
        </div>
        <button class="btn-add-item" data-order-id="${order.id}">
            ➕ Add Item to This Block
        </button>
    `;

    // Add event listeners
    const deleteBlockBtn = block.querySelector('.btn-delete-block');
    const removeItemBtns = block.querySelectorAll('.btn-remove-item');
    const addItemBtn = block.querySelector('.btn-add-item');
    const qtyInputs = block.querySelectorAll('.qty-input');
    const qtyMinusBtns = block.querySelectorAll('.qty-minus');
    const qtyPlusBtns = block.querySelectorAll('.qty-plus');

    deleteBlockBtn.addEventListener('click', (e) => {
        const orderId = parseInt(e.target.dataset.orderId);
        const blockEl = block.querySelector('.block-header h3').textContent;
        showConfirmation(`Delete ${blockEl}?`, () => {
            cartManager.removeOrderBlock(orderId);
            Toast.info('Order block deleted');
            renderCart();
        });
    });

    removeItemBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const itemId = parseInt(e.target.dataset.itemId);
            const itemName = block.querySelector(`[data-item-id="${itemId}"] .item-name`).textContent;
            
            const itemEl = block.querySelector(`[data-item-id="${itemId}"]`);
            itemEl.classList.add('removing');
            
            setTimeout(() => {
                cartManager.removeItemFromOrder(orderId, itemId);
                Toast.info(`"${itemName}" removed`);
                renderCart();
            }, 300);
        });
    });

    qtyInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const itemId = parseInt(e.target.dataset.itemId);
            const newQty = parseInt(e.target.value);
            
            if (newQty > 0) {
                cartManager.updateItemQuantity(orderId, itemId, newQty);
                updateItemDisplay(block, itemId);
                Toast.success('Quantity updated');
            } else {
                e.target.value = cartManager.orders.find(o => o.id === orderId).items.find(i => i.itemId === itemId).quantity;
                Toast.error('Quantity must be at least 1');
            }
        });
    });

    qtyMinusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const itemId = parseInt(e.target.dataset.itemId);
            const currentOrder = cartManager.orders.find(o => o.id === orderId);
            const currentItem = currentOrder.items.find(i => i.itemId === itemId);
            const newQty = currentItem.quantity - 1;
            
            if (newQty > 0) {
                cartManager.updateItemQuantity(orderId, itemId, newQty);
                updateItemDisplay(block, itemId);
                Toast.info('Quantity decreased');
            } else {
                Toast.warning('Quantity must be at least 1');
            }
        });
    });

    qtyPlusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const itemId = parseInt(e.target.dataset.itemId);
            const currentOrder = cartManager.orders.find(o => o.id === orderId);
            const currentItem = currentOrder.items.find(i => i.itemId === itemId);
            const newQty = currentItem.quantity + 1;
            
            cartManager.updateItemQuantity(orderId, itemId, newQty);
            updateItemDisplay(block, itemId);
            Toast.success('Quantity increased');
        });
    });

    addItemBtn.addEventListener('click', (e) => {
        currentOrderId = parseInt(e.target.dataset.orderId);
        openItemModal();
    });

    return block;
}

// Helper function to update item display without re-rendering
function updateItemDisplay(blockEl, itemId) {
    const itemEl = blockEl.querySelector(`[data-item-id="${itemId}"]`);
    const order = cartManager.orders.find(o => {
        return o.items.some(i => i.itemId === itemId);
    });
    
    if (!order) return;
    
    const item = order.items.find(i => i.itemId === itemId);
    if (!item) return;
    
    // Update quantity input
    itemEl.querySelector('.qty-input').value = item.quantity;
    
    // Update quantity display
    itemEl.querySelector('.qty-display').textContent = item.quantity;
    
    // Update total
    itemEl.querySelector('.total-display').textContent = `₹${item.price * item.quantity}`;
    
    // Update summary
    updateCartSummary();
}

// Confirmation dialog function
function showConfirmation(message, onConfirm, onCancel = null) {
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="confirmation-content">
            <p>${message}</p>
            <div class="confirmation-buttons">
                <button class="btn btn-secondary confirm-cancel">Cancel</button>
                <button class="btn btn-primary confirm-ok">Yes, Delete</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.confirm-ok').addEventListener('click', () => {
        modal.remove();
        onConfirm();
    });
    
    modal.querySelector('.confirm-cancel').addEventListener('click', () => {
        modal.remove();
        if (onCancel) onCancel();
    });
    
    setTimeout(() => modal.classList.add('show'), 10);
}

// Update cart summary
function updateCartSummary() {
    totalItemsEl.textContent = cartManager.getTotalItems();
    totalPriceEl.textContent = '₹' + cartManager.getTotalPrice();
}

// Handle type selection
let selectedType = null;
function handleTypeSelection(e) {
    selectedType = e.target.dataset.type;
    
    // Update button styles
    typeButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update item select dropdown
    populateItemSelect(selectedType);
}

// Populate item select dropdown
function populateItemSelect(type) {
    const allItems = getAllItemsData();
    const filteredItems = allItems.filter(item => item.type === type);

    itemSelect.innerHTML = '<option value="">Choose an item...</option>';

    filteredItems.forEach(item => {
        const option = document.createElement('option');
        option.value = JSON.stringify({
            name: item.name,
            price: item.price,
            emoji: item.emoji,
            category: item.category
        });
        option.textContent = `${item.emoji} ${item.name} - ₹${item.price}`;
        itemSelect.appendChild(option);
    });

    itemSelect.value = '';
    updateItemPreview();
}

// Update item preview
function updateItemPreview() {
    if (!itemSelect.value) {
        previewPrice.textContent = 'Price: ₹0';
        previewTotal.textContent = 'Total: ₹0';
        return;
    }

    const item = JSON.parse(itemSelect.value);
    const quantity = parseInt(itemQuantity.value) || 1;
    const total = item.price * quantity;

    previewPrice.textContent = `Price: ₹${item.price}`;
    previewTotal.textContent = `Total: ₹${total}`;
}

// Handle add item
function handleAddItem() {
    if (!itemSelect.value) {
        Toast.warning('Please select an item');
        return;
    }

    if (!currentOrderId) {
        currentOrderId = cartManager.addOrderBlock();
    }

    const item = JSON.parse(itemSelect.value);
    const quantity = parseInt(itemQuantity.value) || 1;

    cartManager.addItemToOrder(currentOrderId, {
        ...item,
        quantity: quantity
    });

    Toast.success(`"${item.name}" added to cart!`);
    closeItemModal();
    renderCart();
}

// Open item modal
function openItemModal() {
    itemQuantity.value = 1;
    itemSelect.value = '';
    selectedType = null;
    typeButtons.forEach(btn => btn.classList.remove('active'));
    modal.style.display = 'block';
}

// Close item modal
function closeItemModal() {
    modal.style.display = 'none';
    currentOrderId = null;
}

// Handle add order block
function handleAddOrderBlock() {
    currentOrderId = cartManager.addOrderBlock();
    openItemModal();
}

// Handle clear cart
function handleClearCart() {
    if (confirm('Clear entire cart? This cannot be undone.')) {
        cartManager.clearCart();
        renderCart();
    }
}

// Handle send order
function handleSendOrder() {
    const message = cartManager.getCartMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
}

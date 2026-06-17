// Custom Cake Builder Data
const cakeResources = {
    size: [
        { id: 1, name: '250 gm', price: 200, emoji: '🎂', desc: 'Perfect for a small treat' },
        { id: 2, name: '500 gm', price: 350, emoji: '🎂', desc: 'Ideal for small celebrations' },
        { id: 3, name: '750 gm', price: 500, emoji: '🎂', desc: 'Great for family parties' },
        { id: 4, name: '1 kg', price: 700, emoji: '🎂', desc: 'Large party size' }
    ],
    flavor: [
        { id: 1, name: 'Chocolate', price: 0, emoji: '🍫' },
        { id: 2, name: 'Vanilla', price: 0, emoji: '🤎' },
        { id: 3, name: 'Strawberry', price: 50, emoji: '🍓' },
        { id: 4, name: 'Red Velvet', price: 100, emoji: '❤️' },
        { id: 5, name: 'Carrot Cake', price: 80, emoji: '🥕' }
    ],
    frosting: [
        { id: 1, name: 'Buttercream', price: 0, emoji: '🧈' },
        { id: 2, name: 'Cream Cheese', price: 50, emoji: '🤍' },
        { id: 3, name: 'Chocolate Ganache', price: 100, emoji: '🍫' },
        { id: 4, name: 'Whipped Cream', price: 40, emoji: '☁️' }
    ],
    toppings: [
        { id: 1, name: 'Sprinkles', price: 30, emoji: '✨' },
        { id: 2, name: 'Fresh Berries', price: 80, emoji: '🫐' },
        { id: 3, name: 'Chocolate Chips', price: 40, emoji: '🍫' },
        { id: 4, name: 'Nuts', price: 50, emoji: '🥜' },
        { id: 5, name: 'Edible Flowers', price: 100, emoji: '🌸' }
    ],
    filling: [
        { id: 1, name: 'Jam', price: 30, emoji: '🍓' },
        { id: 2, name: 'Chocolate', price: 40, emoji: '🍫' },
        { id: 3, name: 'Caramel', price: 50, emoji: '🍯' },
        { id: 4, name: 'Custard', price: 35, emoji: '🥛' },
        { id: 5, name: 'None', price: 0, emoji: '✔️' }
    ],
    decoration: [
        { id: 1, name: 'Simple', price: 0, emoji: '🎨' },
        { id: 2, name: 'Name Written', price: 100, emoji: '✍️' },
        { id: 3, name: 'Happy Birthday', price: 120, emoji: '🎉' },
        { id: 4, name: 'Custom Message', price: 150, emoji: '💬' }
    ]
};

// Store selected options
let customCakeSelection = {
    size: null,
    flavor: null,
    frosting: null,
    filling: null,
    toppings: [],
    decoration: null,
    message: ''
};

// Render custom cake builder sections
function renderCustomCakeBuilder() {
    const builder = document.getElementById('custom-cake-builder');
    if (!builder) return;

    builder.innerHTML = `
        <div class="custom-builder-layout">
            <div class="builder-columns">
                <!-- Left: Options -->
                <div class="builder-options-panel">
                    <div class="step-card fade-in show" id="step-1">
                        <div class="step-header">
                            <span class="step-number">01</span>
                            <h3>Select Cake Size</h3>
                        </div>
                        <div class="options-grid" id="size-options"></div>
                    </div>

                    <div class="step-card fade-in show" id="step-2">
                        <div class="step-header">
                            <span class="step-number">02</span>
                            <h3>Choose Base Flavor</h3>
                        </div>
                        <div class="options-grid" id="flavor-options"></div>
                    </div>

                    <div class="step-card fade-in show" id="step-3">
                        <div class="step-header">
                            <span class="step-number">03</span>
                            <h3>Pick Frosting</h3>
                        </div>
                        <div class="options-grid" id="frosting-options"></div>
                    </div>

                    <div class="step-card fade-in show" id="step-4">
                        <div class="step-header">
                            <span class="step-number">04</span>
                            <h3>Select Filling</h3>
                        </div>
                        <div class="options-grid" id="filling-options"></div>
                    </div>

                    <div class="step-card fade-in show" id="step-5">
                        <div class="step-header">
                            <span class="step-number">05</span>
                            <h3>Add Toppings</h3>
                            <p class="step-subtitle">Select as many as you like</p>
                        </div>
                        <div class="options-grid" id="toppings-options"></div>
                    </div>

                    <div class="step-card fade-in show" id="step-6">
                        <div class="step-header">
                            <span class="step-number">06</span>
                            <h3>Special Decoration</h3>
                        </div>
                        <div class="options-grid" id="decoration-options"></div>
                    </div>

                    <div class="step-card fade-in show" id="step-7">
                        <div class="step-header">
                            <span class="step-number">07</span>
                            <h3>Final Details</h3>
                        </div>
                        <div class="message-input-wrapper">
                            <label for="custom-message">Message on Cake</label>
                            <textarea id="custom-message" placeholder="e.g., Happy 25th Birthday Sarah!" maxlength="50"></textarea>
                            <div class="char-count"><span id="current-char">0</span>/50</div>
                        </div>
                    </div>
                </div>

                <!-- Right: Summary Sidebar -->
                <div class="builder-summary-panel">
                    <div class="summary-card-sticky">
                        <div class="summary-card">
                            <div class="summary-header">
                                <h3>Order Summary</h3>
                                <span class="badge">Custom Cake</span>
                            </div>
                            
                            <div id="selection-summary" class="selection-summary">
                                <p class="empty-summary-msg">Start selecting options to build your cake</p>
                            </div>

                            <div class="price-breakdown">
                                <div class="price-row total">
                                    <span>Estimated Total</span>
                                    <span>₹<span id="total-price-display">0</span></span>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-full" id="order-custom-btn" disabled>
                                <span>Place Custom Order</span>
                            </button>
                            <p class="summary-note">Prices are subject to final confirmation via WhatsApp.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Render all options
    renderOptions('size', 'size-options', false);
    renderOptions('flavor', 'flavor-options', false);
    renderOptions('frosting', 'frosting-options', false);
    renderOptions('filling', 'filling-options', false);
    renderOptions('toppings', 'toppings-options', true);
    renderOptions('decoration', 'decoration-options', false);

    // Initial price update
    updateSummary();

    // Event listener for message input
    const messageInput = document.getElementById('custom-message');
    const charCount = document.getElementById('current-char');
    messageInput.addEventListener('input', function() {
        customCakeSelection.message = this.value;
        charCount.textContent = this.value.length;
        updateSummary();
    });

    // Order button listener
    const orderBtn = document.getElementById('order-custom-btn');
    orderBtn.addEventListener('click', orderCustomCake);
}

// Render options for each category
function renderOptions(category, containerId, isMultiple) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const options = cakeResources[category];
    container.innerHTML = '';

    options.forEach(option => {
        const choiceCard = document.createElement('div');
        choiceCard.className = `choice-card ${isMultiple ? 'checkbox' : 'radio'}`;
        
        choiceCard.innerHTML = `
            <input type="${isMultiple ? 'checkbox' : 'radio'}" 
                   name="${category}" 
                   id="${category}-${option.id}"
                   value="${option.id}"
                   data-category="${category}"
                   data-name="${option.name}"
                   data-price="${option.price}"
                   data-emoji="${option.emoji}">
            <label for="${category}-${option.id}">
                <div class="choice-content">
                    <div class="choice-emoji">${option.emoji}</div>
                    <div class="choice-info">
                        <span class="choice-name">${option.name}</span>
                        <span class="choice-price">${option.price > 0 ? '+₹' + option.price : 'Included'}</span>
                    </div>
                    ${option.desc ? `<p class="choice-desc">${option.desc}</p>` : ''}
                    <div class="choice-check-mark">✓</div>
                </div>
            </label>
        `;

        const input = choiceCard.querySelector('input');
        input.addEventListener('change', function() {
            handleOptionChange(this, category, isMultiple);
            
            // Add visual active class to the card for single choice
            if (!isMultiple) {
                container.querySelectorAll('.choice-card').forEach(card => card.classList.remove('active'));
                choiceCard.classList.add('active');
            } else {
                choiceCard.classList.toggle('active', this.checked);
            }
        });

        container.appendChild(choiceCard);
    });
}

// Handle option selection
function handleOptionChange(input, category, isMultiple) {
    if (isMultiple) {
        const selectedOptions = [];
        document.querySelectorAll(`input[name="${category}"]:checked`).forEach(checkbox => {
            selectedOptions.push({
                id: checkbox.value,
                name: checkbox.dataset.name,
                price: parseInt(checkbox.dataset.price),
                emoji: checkbox.dataset.emoji
            });
        });
        customCakeSelection[category] = selectedOptions;
    } else {
        customCakeSelection[category] = {
            id: input.value,
            name: input.dataset.name,
            price: parseInt(input.dataset.price),
            emoji: input.dataset.emoji
        };
    }

    updateSummary();
}

// Update summary and price
function updateSummary() {
    const summary = document.getElementById('selection-summary');
    const totalPriceEl = document.getElementById('total-price-display');
    const orderBtn = document.getElementById('order-custom-btn');
    
    if (!summary) return;

    let totalPrice = 0;
    let hasSelections = false;
    let summaryHTML = `<div class="summary-list">`;

    const categories = [
        { key: 'size', label: 'Size', icon: '📏' },
        { key: 'flavor', label: 'Flavor', icon: '🍫' },
        { key: 'frosting', label: 'Frosting', icon: '🧈' },
        { key: 'filling', label: 'Filling', icon: '🍓' },
        { key: 'toppings', label: 'Toppings', icon: '✨', isMultiple: true },
        { key: 'decoration', label: 'Decoration', icon: '🎨' }
    ];

    categories.forEach(cat => {
        const selection = customCakeSelection[cat.key];
        
        if (cat.isMultiple) {
            if (selection && selection.length > 0) {
                hasSelections = true;
                selection.forEach(item => {
                    summaryHTML += createSummaryItem(cat.label, item, item.emoji);
                    totalPrice += item.price;
                });
            }
        } else if (selection) {
            hasSelections = true;
            summaryHTML += createSummaryItem(cat.label, selection, selection.emoji);
            totalPrice += selection.price;
        }
    });

    if (customCakeSelection.message) {
        summaryHTML += `
            <div class="summary-item">
                <span class="item-label">💬 Message</span>
                <span class="item-value">"${customCakeSelection.message}"</span>
            </div>
        `;
    }

    summaryHTML += `</div>`;
    
    if (!hasSelections) {
        summary.innerHTML = `<p class="empty-summary-msg">Start selecting options to build your cake</p>`;
    } else {
        summary.innerHTML = summaryHTML;
    }

    totalPriceEl.textContent = totalPrice;

    // Enable order button only if essential selections are made
    const isComplete = customCakeSelection.size && customCakeSelection.flavor && 
                       customCakeSelection.frosting && customCakeSelection.filling && 
                       customCakeSelection.decoration;
    
    orderBtn.disabled = !isComplete;
}

function createSummaryItem(label, item, icon) {
    return `
        <div class="summary-item animate-in">
            <div class="item-main">
                <span class="item-label">${label}</span>
                <span class="item-value">${icon} ${item.name}</span>
            </div>
            <span class="item-price">₹${item.price}</span>
        </div>
    `;
}

// Order custom cake
function orderCustomCake() {
    let orderDetails = `*Custom Cake Order Request* 🎂\n\n`;
    orderDetails += `📏 *Size:* ${customCakeSelection.size.name}\n`;
    orderDetails += `🍫 *Flavor:* ${customCakeSelection.flavor.name}\n`;
    orderDetails += `🧈 *Frosting:* ${customCakeSelection.frosting.name}\n`;
    orderDetails += `🍓 *Filling:* ${customCakeSelection.filling.name}\n`;

    if (customCakeSelection.toppings && customCakeSelection.toppings.length > 0) {
        orderDetails += `✨ *Toppings:* ${customCakeSelection.toppings.map(t => t.name).join(', ')}\n`;
    }

    orderDetails += `🎨 *Decoration:* ${customCakeSelection.decoration.name}\n`;

    if (customCakeSelection.message) {
        orderDetails += `💬 *Message:* "${customCakeSelection.message}"\n`;
    }

    const price = document.getElementById('total-price-display').textContent;
    orderDetails += `\n💰 *Total Price:* ₹${price}`;
    
    const encodedMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

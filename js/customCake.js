// Custom Cake Builder Data
const cakeResources = {
    size: [
        { id: 1, name: '6 inch', price: 200, emoji: '🎂' },
        { id: 2, name: '8 inch', price: 350, emoji: '🎂' },
        { id: 3, name: '10 inch', price: 500, emoji: '🎂' }
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
        { id: 5, name: 'Edible Flowers', price: 100, emoji: '🌸' },
        { id: 6, name: 'None', price: 0, emoji: '✔️' }
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
        <div class="builder-section">
            <h3>Step 1: Select Size</h3>
            <div class="options-grid" id="size-options"></div>
        </div>

        <div class="builder-section">
            <h3>Step 2: Choose Flavor</h3>
            <div class="options-grid" id="flavor-options"></div>
        </div>

        <div class="builder-section">
            <h3>Step 3: Pick Frosting</h3>
            <div class="options-grid" id="frosting-options"></div>
        </div>

        <div class="builder-section">
            <h3>Step 4: Select Filling</h3>
            <div class="options-grid" id="filling-options"></div>
        </div>

        <div class="builder-section">
            <h3>Step 5: Add Toppings (Multiple Choice)</h3>
            <div class="options-grid" id="toppings-options"></div>
        </div>

        <div class="builder-section">
            <h3>Step 6: Choose Decoration</h3>
            <div class="options-grid" id="decoration-options"></div>
        </div>

        <div class="builder-section">
            <h3>Step 7: Add Special Message (Optional)</h3>
            <input type="text" id="custom-message" placeholder="e.g., Happy Birthday! or Congratulations!" maxlength="50" class="message-input">
            <small>Maximum 50 characters</small>
        </div>

        <div class="builder-summary">
            <div class="summary-box">
                <h3>Your Custom Cake</h3>
                <div id="selection-summary"></div>
                <div class="total-price">
                    Base Price: ₹<span id="base-price">0</span>
                </div>
                <button class="btn btn-primary" id="order-custom-btn">Order Custom Cake</button>
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

    // Add event listener for message input
    const messageInput = document.getElementById('custom-message');
    messageInput.addEventListener('change', function() {
        customCakeSelection.message = this.value;
        updateSummary();
    });

    // Add order button listener
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
        const label = document.createElement('label');
        label.className = 'option-label';

        const input = document.createElement('input');
        input.type = isMultiple ? 'checkbox' : 'radio';
        input.name = category;
        input.value = option.id;
        input.dataset.category = category;
        input.dataset.name = option.name;
        input.dataset.price = option.price;

        input.addEventListener('change', function() {
            handleOptionChange(this, category, isMultiple);
        });

        const span = document.createElement('span');
        span.className = 'option-box';
        span.innerHTML = `
            <div class="option-emoji">${option.emoji}</div>
            <div class="option-text">
                <div class="option-name">${option.name}</div>
                <div class="option-price">₹${option.price}</div>
            </div>
        `;

        label.appendChild(input);
        label.appendChild(span);
        container.appendChild(label);
    });
}

// Handle option selection
function handleOptionChange(input, category, isMultiple) {
    if (isMultiple) {
        // For toppings (multiple choice)
        const selectedToppings = [];
        document.querySelectorAll(`input[name="${category}"]:checked`).forEach(checkbox => {
            selectedToppings.push({
                id: checkbox.value,
                name: checkbox.dataset.name,
                price: parseInt(checkbox.dataset.price)
            });
        });
        customCakeSelection[category] = selectedToppings;
    } else {
        // For single choice options
        const selectedOption = {
            id: input.value,
            name: input.dataset.name,
            price: parseInt(input.dataset.price)
        };
        customCakeSelection[category] = selectedOption;
    }

    updateSummary();
}

// Update summary and price
function updateSummary() {
    const summary = document.getElementById('selection-summary');
    const basePrice = 200; // Base price for 6 inch cake
    let totalPrice = basePrice;

    let summaryHTML = `<ul class="summary-list">`;

    // Size
    if (customCakeSelection.size) {
        summaryHTML += `<li>${customCakeSelection.size.name} - ₹${customCakeSelection.size.price}</li>`;
        totalPrice = customCakeSelection.size.price; // Size replaces base price
    }

    // Flavor
    if (customCakeSelection.flavor) {
        summaryHTML += `<li>${customCakeSelection.flavor.emoji} ${customCakeSelection.flavor.name} - ₹${customCakeSelection.flavor.price}</li>`;
        totalPrice += customCakeSelection.flavor.price;
    }

    // Frosting
    if (customCakeSelection.frosting) {
        summaryHTML += `<li>${customCakeSelection.frosting.emoji} ${customCakeSelection.frosting.name} - ₹${customCakeSelection.frosting.price}</li>`;
        totalPrice += customCakeSelection.frosting.price;
    }

    // Filling
    if (customCakeSelection.filling) {
        summaryHTML += `<li>${customCakeSelection.filling.emoji} ${customCakeSelection.filling.name} - ₹${customCakeSelection.filling.price}</li>`;
        totalPrice += customCakeSelection.filling.price;
    }

    // Toppings
    if (customCakeSelection.toppings.length > 0) {
        customCakeSelection.toppings.forEach(topping => {
            summaryHTML += `<li>${topping.emoji} ${topping.name} - ₹${topping.price}</li>`;
            totalPrice += topping.price;
        });
    }

    // Decoration
    if (customCakeSelection.decoration) {
        summaryHTML += `<li>${customCakeSelection.decoration.emoji} ${customCakeSelection.decoration.name} - ₹${customCakeSelection.decoration.price}</li>`;
        totalPrice += customCakeSelection.decoration.price;
    }

    // Message
    if (customCakeSelection.message) {
        summaryHTML += `<li>💬 Message: "${customCakeSelection.message}"</li>`;
    }

    summaryHTML += `</ul>`;
    summary.innerHTML = summaryHTML;

    // Update price
    document.getElementById('base-price').textContent = totalPrice;
}

// Order custom cake
function orderCustomCake() {
    // Validate selections
    if (!customCakeSelection.size || !customCakeSelection.flavor || 
        !customCakeSelection.frosting || !customCakeSelection.filling || 
        !customCakeSelection.decoration) {
        alert('Please complete all steps before ordering! 🎂');
        return;
    }

    let orderDetails = `*Custom Cake Order* 🎂\n\n`;
    orderDetails += `📏 Size: ${customCakeSelection.size.name}\n`;
    orderDetails += `🍫 Flavor: ${customCakeSelection.flavor.name}\n`;
    orderDetails += `🧈 Frosting: ${customCakeSelection.frosting.name}\n`;
    orderDetails += `🍓 Filling: ${customCakeSelection.filling.name}\n`;

    if (customCakeSelection.toppings.length > 0) {
        orderDetails += `✨ Toppings: ${customCakeSelection.toppings.map(t => t.name).join(', ')}\n`;
    }

    orderDetails += `🎨 Decoration: ${customCakeSelection.decoration.name}\n`;

    if (customCakeSelection.message) {
        orderDetails += `💬 Message: ${customCakeSelection.message}\n`;
    }

    // Calculate total price
    let totalPrice = customCakeSelection.size.price;
    totalPrice += customCakeSelection.flavor.price;
    totalPrice += customCakeSelection.frosting.price;
    totalPrice += customCakeSelection.filling.price;
    totalPrice += customCakeSelection.decoration.price;
    customCakeSelection.toppings.forEach(topping => {
        totalPrice += topping.price;
    });

    orderDetails += `\n💰 Total Price: ₹${totalPrice}`;

    const encodedMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

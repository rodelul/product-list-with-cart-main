const gridLi = document.querySelector('.hero-grid');
let data = []; // Initialize the data array

// Fetch the data from the JSON file
fetch('./data.json')
    .then(res => res.json())
    .then(fetchedData => {
        data = fetchedData; // Store the fetched data globally
        data.forEach((product, i) => {
            const card = `
                <div class="product">
                    <img src="${product.image.desktop}" />
                    <button class="add-to-cart" data-index="${i}">Add to Cart</button>
                    <h2>${product.category}</h2>
                    <h1>${product.name}</h1>
                    <p>${product.price}</p>
                </div>
            `;
            gridLi.innerHTML += card;
        });

        // Add event listeners to the buttons after they are created
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                addtocart(index);
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));

var cart = [];

function addtocart(index){
    cart.push({...data[index]}); // Use the global data array
    console.log('Item added to cart:', cart);
    displaycart(); // Update the cart display
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the given index
    console.log('Item removed from cart:', cart);
    displaycart(); // Update the cart display
}

function displaycart(){
    const cartItemContainer = document.getElementById('cartItem');
    const confirmOrderButton = document.getElementById('confirmOrder');
    const itemCount = cart.length;

    console.log('Number of items in cart:', itemCount);

    if (itemCount === 0) {
        cartItemContainer.innerHTML = `
            <div class="count">Your Items</div>
            <div class="head"><p>My Cart</p></div>
            <div class="cartItem">Your cart is empty</div>
            <div class="foot">
                <h3>Order Total</h3>
                <h2 class="total">$0.00</h2>
            </div>
        `;
        confirmOrderButton.style.display = 'none'; // Hide the button if the cart is empty
        console.log('Confirm Order Button hidden because cart is empty');
    } else {
        const itemsHeader = `<h2 class="count">Your Items (${itemCount})</h2>`;
        const cartItems = cart.map((item, i) => {
            return `
            <div class="cart-item">
                <div class="namePrice">
                    <h1 class='itemCartName'>${item.name}</h1>
                    <p class='itemCartPrice'>$${item.price}</p>
                </div>
                <button class="delElement" data-index="${i}">X</button>
            </div>
            `;
        }).join('');

        const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

        cartItemContainer.innerHTML = `
            ${itemsHeader}
            ${cartItems}
            <div class="foot">
                <h3>Order Total</h3>
                <h2 class="total">$${total}</h2>
            </div>
        `;

        confirmOrderButton.style.display = 'block'; // Show the button if the cart is not empty
        console.log('Confirm Order Button shown because cart is not empty');
    }

    console.log('Cart:', cart);
    console.log('Confirm Order Button visibility:', confirmOrderButton.style.display);
}

// Event delegation for removing items from the cart
document.getElementById('cartItem').addEventListener('click', function(event) {
    if (event.target.classList.contains('delElement')) {
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Confirm Order Button click handler
document.getElementById('confirmOrder').addEventListener('click', function() {
    displayOrderPopup();
});

function displayOrderPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    const orderPopup = document.getElementById('orderPopup');
    const orderItemsContainer = document.getElementById('orderItems');

    // Display order items in the pop-up
    const orderItems = cart.map((item) => {
        return `
            <div class="order-item">
                <h1>${item.name}</h1>
                <p>$${item.price}</p>
            </div>
        `;
    }).join('');

    orderItemsContainer.innerHTML = orderItems;

    // Show the pop-up and overlay
    popupOverlay.style.display = 'block';
    orderPopup.style.display = 'block';
}

function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    const orderPopup = document.getElementById('orderPopup');

    // Hide the pop-up and overlay
    popupOverlay.style.display = 'none';
    orderPopup.style.display = 'none';
}

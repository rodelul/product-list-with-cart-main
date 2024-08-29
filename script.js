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
    displaycart(); // Update the cart display
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the given index
    displaycart(); // Update the cart display
}

function displaycart(){
    const cartItemContainer = document.getElementById('cartItem');
    const itemCount = cart.length;

    if(itemCount === 0){
        cartItemContainer.innerHTML = 'Your cart is empty';
    } else {
        const itemsHeader = `<h2 class="count">Your Items (${itemCount})</h2>`;
        const cartItems = cart.map((item, i) => {
            return `
            <div class="cart-item">
                <h1>${item.name}</h1>
                <p>$${item.price}</p>
                <button class="delElement" data-index="${i}">X</button>
            </div>
            `;
        }).join('');

        cartItemContainer.innerHTML = itemsHeader + cartItems;

        // Add event listeners to the delete buttons after they are created
        document.querySelectorAll('.delElement').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }
}

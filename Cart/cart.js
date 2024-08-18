let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems')) || [];

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    let totalAmount = 0;

    cartItemsContainer.innerHTML = '';

    shoppingCartItems.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">Rs ${item.price.toFixed(2)}</p>
            <button class="remove-item-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);

        totalAmount += item.price;
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', removeCartItem);
    });
}

function removeCartItem(event) {
    const index = event.target.dataset.index;
    shoppingCartItems.splice(index, 1);
    localStorage.setItem('shoppingCartItems', JSON.stringify(shoppingCartItems));
    displayCartItems(); // Refresh the cart display
}

// Display the cart items when the page loads
window.onload = displayCartItems;
import { fashionProducts } from "./fashionProducts.js";
const filterBtns = document.querySelectorAll(".filt");
const sortBtns = document.querySelectorAll(".sort-btn");

// Load items
window.addEventListener('DOMContentLoaded', function () {
  displayFashionProducts(fashionProducts);
});

// Filter items
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const category = e.currentTarget.dataset.id;
    const menuCategory = fashionProducts.filter(function (menuItem) {
      return menuItem.keywords.includes(category);
    });
    if (category === 'all') {
      displayFashionProducts(fashionProducts);
    } else {
      displayFashionProducts(menuCategory);
    }
  });
});


// Sort items
sortBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const sortType = e.currentTarget.dataset.sort;
    let sortedProducts = [...fashionProducts];

    if (sortType === 'low-to-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-to-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    displayFashionProducts(sortedProducts);
  });
});


document.querySelector('.toggle-size-chart-btn').addEventListener('click', function() {
  const sizeChart = document.querySelector('.size-chart');
  sizeChart.style.display = sizeChart.style.display === 'none' || sizeChart.style.display === '' ? 'block' : 'none';
});
// Initial cart quantity
let cartQuantity = 0;

document.addEventListener('DOMContentLoaded', function () {
  // Load the initial cart quantity (if needed)
  updateCartQuantity(cartQuantity);
});

// Update the cart quantity display
function updateCartQuantity(quantity) {
  const cartQuantityDisplay = document.querySelector('.cart-quantity');
  if (cartQuantityDisplay) {
    cartQuantityDisplay.textContent = quantity;
  }
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-button')) {
    cartQuantity++;
    updateCartQuantity(cartQuantity);
    e.target.nextElementSibling.style.display = 'block'; // Show "Added to cart" text
    setTimeout(() => {
      e.target.nextElementSibling.style.display = 'none'; // Hide after a short delay
    }, 1500);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems')) || [];
  updateCartInfo(shoppingCartItems);
});
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-button')) {
    const productContainer = e.target.closest('.product-container');
    const productName = productContainer.querySelector('.product-name').textContent;
    const productPrice = productContainer.querySelector('.product-price').textContent;
    const productId = productContainer.dataset.productId; // Assuming you have a data-product-id attribute

    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems')) || [];
    
    shoppingCartItems.push({ 
      id: productId,
      name: productName, 
      price: parseFloat(productPrice.replace('Rs', '').trim())
    });
    
    localStorage.setItem('shoppingCartItems', JSON.stringify(shoppingCartItems));

    updateShoppingCartQuantity(shoppingCartItems.length);

    console.log('Items in cart:', JSON.parse(localStorage.getItem('shoppingCartItems')));
  }
});
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-button')) {
    const productContainer = e.target.closest('.product-container');
    const productName = productContainer.querySelector('.product-name').textContent;
    const productPrice = productContainer.querySelector('.product-price').textContent;
    const productId = productContainer.dataset.productId;

    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems')) || [];
    
    shoppingCartItems.push({ 
      id: productId,
      name: productName, 
      price: parseFloat(productPrice.replace('Rs', '').trim())
    });
    
    localStorage.setItem('shoppingCartItems', JSON.stringify(shoppingCartItems));

    updateCartInfo(shoppingCartItems);

    console.log('Items in cart:', shoppingCartItems);
  }
});

function updateCartInfo(cartItems) {
  const cartQuantity = cartItems.length;
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  document.querySelector('.cart-quantity').textContent = cartQuantity;
  document.getElementById('info-cart').textContent = `My Cart(${cartQuantity})`;
  document.querySelector('.cart-information .para p:last-child').textContent = `Rs ${cartTotal.toFixed(2)}`;
}

function displayFashionProducts(menuItems) {
  const productContainer = document.querySelector('.js-products-grid');

  if (!productContainer) {
    console.error("Product container element not found!");
    return;
  }

  let displayMenu = menuItems.map(function (item) {
    return `
      <div class="product-container" data-product-id="${item.id}">
        <div class="product-image-container">
          <img class="product-image" src="${item.colorOptions ? item.colorOptions[0].image : item.image}" alt="${item.name}">
        </div>
        <div class="product-details">
          <div class="product-brand">${item.brand}</div>
          <div class="product-name limit-text-to-2-lines">${item.name}</div>
          <div class="product-rating-container">
            <div class="product-rating-stars">
              ${renderStars(item.rating.stars)}
            </div>
            <div class="product-rating-count link-primary">${item.rating.count} reviews</div>
          </div>
          <div class="product-price">${item.price}</div>
          ${item.colorOptions ? renderColorOptions(item.colorOptions) : '<div class="color-options-placeholder"></div>'}
          <div class="sizes">
            <button class="size-btn" data-size="S">S</button>
            <button class="size-btn" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
            <button class="size-btn" data-size="XL">XL</button>
          </div>
          <div class="quantity-control">
            <button class="quantity-btn minus">-</button>
            <span class="quantity-display">1</span>
            <button class="quantity-btn plus">+</button>
          </div>
        </div>
        <div class="product-spacer"></div>
        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button">Add to Cart</button>
          <div class="added-to-cart">Added to Cart</div>
      </div>
    `;
  });

  displayMenu = displayMenu.join("");
  productContainer.innerHTML = displayMenu;

  // Attach quantity control listeners after rendering the products
  attachQuantityControlListeners();
}

function renderColorOptions(colorOptions) {
  return `
    <div class="color-options">
      ${colorOptions.map((option, index) => `
        <button class="color-btn ${index === 0 ? 'active' : ''}" 
                style="background-color: ${option.color};" 
                data-color="${option.color}"
                data-image="${option.image}"></button>
      `).join('')}
    </div>
  `;
}

function renderStars(stars) {
  let starHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(stars)) {
      starHTML += `<i class="fas fa-star yellow-star"></i>`;
    }
    else if (i < stars) {
      starHTML += `<i class="fas fa-star-half-alt yellow-star"></i>`;
    } 
    else 
    {
      starHTML += `<i class="far fa-star yellow-star"></i>`;
    }
  }
  return starHTML;
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('color-btn')) {
    const productContainer = e.target.closest('.product-container');
    const productImage = productContainer.querySelector('.product-image');
    
    productContainer.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    

    productImage.src = e.target.dataset.image;
    
    // Optional: add a fade effect
    productImage.style.opacity = '0';
    setTimeout(() => {
      productImage.style.opacity = '1';
    }, 50);

    console.log('Color selected:', e.target.dataset.color);
  }
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('size-btn')) {
    const productContainer = e.target.closest('.product-container');
    const sizeButtons = productContainer.querySelectorAll('.size-btn');
    
    // Remove 'active' class from all size buttons
    sizeButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add 'active' class to the clicked button
    e.target.classList.add('active');
    
    console.log(`Selected size: ${e.target.dataset.size} for product ID: ${productContainer.dataset.productId}`);
  }
});

function attachQuantityControlListeners() {
  document.querySelectorAll('.quantity-control').forEach(control => {
    const minusBtn = control.querySelector('.minus');
    const plusBtn = control.querySelector('.plus');
    const display = control.querySelector('.quantity-display');

    let quantity = parseInt(display.textContent, 10); // Initialize quantity from display

    minusBtn.addEventListener('click', () => {
      if (quantity > 1) { // Prevent quantity from going below 1
        quantity--;
        display.textContent = quantity;
      }
    });

    plusBtn.addEventListener('click', () => {
      quantity++;
      display.textContent = quantity;
    });
  });
}
function viewCart() {
  const cartItems = JSON.parse(localStorage.getItem('shoppingCartItems')) || [];
  let cartHTML = '<h2>Shopping Cart</h2>';
  
  if (cartItems.length === 0) {
    cartHTML += '<p>Your cart is empty.</p>';
  } else {
    cartHTML += '<ul>';
    cartItems.forEach(item => {
      cartHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });
    cartHTML += '</ul>';
  }

  // Assuming you have a div with id "cart-contents" to display the cart
  document.getElementById('cart-contents').innerHTML = cartHTML;
}

// Add an event listener to your "View Cart" button or link
document.getElementById('view-cart-button').addEventListener('click', viewCart);

import { fashionProducts } from "./fashionProducts.js";
const filterBtns = document.querySelectorAll(".filt");

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
          <div class="quantity-control">Qty :
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
        <button class="add-to-cart-button button-primary">Add to Cart</button>
      </div>
    `;
  });

  displayMenu = displayMenu.join("");
  productContainer.innerHTML = displayMenu;

  // Attach event listeners after adding the content to the DOM
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
    
    // Update active color button
    productContainer.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update product image
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
    
    // You can add additional logic here, e.g., updating the product state
    console.log(`Selected size: ${e.target.dataset.size} for product ID: ${productContainer.dataset.productId}`);
  }
});




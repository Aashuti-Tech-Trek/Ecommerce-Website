const banner = [
    {
        id:1,
        img:"/bannerImages/spring-update-banner.jpeg"
    },
    {
        id:2,
        img:"/bannerImages/electronic.webp"
    },
    {
        id:3,
        img:"/bannerImages/narrival.jpg"
    }
]
const img = document.querySelector('.image');
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentItem = 0;
//load initial item
window.addEventListener("DOMContentLoaded", function () {
    showBanner();
})

function showBanner() {
    const item = banner[currentItem];
    img.src = item.img;
}
nextBtn.addEventListener('click', function () {
    currentItem++;
    if (currentItem > banner.length - 1) {
        currentItem = 0;
    }
    showBanner();

});
prevBtn.addEventListener('click', function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = banner.length - 1;
    }
    showBanner();
});
const category = [
    { id: 101, img: "/category-images/clothes.jpeg",
      desc: "Fashion for Men and Women",
    },
    { id: 102, img: "/category-images/Electronics.jpg", desc: "Electronic Items & Gadgets" },
    { id: 103, img: "/category-images/phone.webp", desc: "Smartphones & Headphones" },
    { id: 104, img: "/category-images/toys.jpeg", desc: "Toys"},
    { id: 105, img: "/category-images/Books.webp", desc: "Books" },
    { id: 106, img: "/category-images/home.jpg", desc: "Home & Decor" },
    { id: 105, img: "/category-images/grocery.jpeg", desc: "Grocery" },
    { id: 105, img: "/category-images/cosmetic.jpeg", desc: "Cosmetic & Skincare" },
];
let categoryHTML =''
category.forEach((cat)=>{
    categoryHTML=categoryHTML+`
    <div class="product-category-images">
            <div class="shop-by-click">
                <img class="shop-category-img" src=${cat.img}>
                <p class="desc">${cat.desc}</p>
                <button class="shop-btn">Shop Now</button>
            </div>
    </div>
    `
})
document.getElementById('category-container').innerHTML = categoryHTML;






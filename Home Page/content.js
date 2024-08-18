// // console.clear();

// let contentTitle;

// console.log(document.cookie);
// function dynamicClothingSection(ob) {
//   let boxDiv = document.createElement("div");
//   boxDiv.id = "box";

//   let boxLink = document.createElement("a");
//   // boxLink.href = '#'
//   boxLink.href = "/contentDetails.html?" + ob.id;
//   // console.log('link=>' + boxLink);

//   let imgTag = document.createElement("img");
//   // imgTag.id = 'image1'
//   // imgTag.id = ob.photos
//   imgTag.src = ob.preview;

//   let detailsDiv = document.createElement("div");
//   detailsDiv.id = "details";

//   let h3 = document.createElement("h3");
//   let h3Text = document.createTextNode(ob.name);
//   h3.appendChild(h3Text);

//   let h4 = document.createElement("h4");
//   let h4Text = document.createTextNode(ob.brand);
//   h4.appendChild(h4Text);

//   let h2 = document.createElement("h2");
//   let h2Text = document.createTextNode("rs  " + ob.price);
//   h2.appendChild(h2Text);

//   boxDiv.appendChild(boxLink);
//   boxLink.appendChild(imgTag);
//   boxLink.appendChild(detailsDiv);
//   detailsDiv.appendChild(h3);
//   detailsDiv.appendChild(h4);
//   detailsDiv.appendChild(h2);

//   return boxDiv;
// }

// //  TO SHOW THE RENDERED CODE IN CONSOLE
// // console.log(dynamicClothingSection());

// // console.log(boxDiv)

// let mainContainer = document.getElementById("mainContainer");
// let containerFashion = document.getElementById("containerFashion");
// let containerElectronics = document.getElementById("containerElectronics");
// let containerMobile = document.getElementById("containerMobile");
// let containerToys = document.getElementById("containerToys");
// let containerBooks = document.getElementById("containerBooks");
// let containerHomeDecor = document.getElementById("containerHomeDecor");
// let containerGroceries = document.getElementById("containerGroceries");
// let containerCosmetics = document.getElementById("containerCosmetics");
// // mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// // BACKEND CALLING

// let httpRequest = new XMLHttpRequest();

// httpRequest.onreadystatechange = function() {
//   if (this.readyState === 4) {
//     if (this.status == 200) {
//       // console.log('call successful');
//       contentTitle = JSON.parse(this.responseText);
//       if (document.cookie.indexOf(",counter=") >= 0) {
//         var counter = document.cookie.split(",")[1].split("=")[1];
//         document.getElementById("badge").innerHTML = counter;
//       }
//       for (let i = 0; i < contentTitle.length; i++) {
//         if (contentTitle[i].isFashion) {
//           console.log(contentTitle[i]);
//           containerFashion.appendChild(
//             dynamicClothingSection(contentTitle[i])
//           );
//         } 
//         else if (contentTitle[i].isElectronics) {
//             console.log(contentTitle[i]);
//             containerElectronics.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           } else if (contentTitle[i].isGrocery) {
//             console.log(contentTitle[i]);
//             containerGrocery.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           }
//           else if (contentTitle[i].isToys) {
//             console.log(contentTitle[i]);
//             containerToys.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           }
//           else if (contentTitle[i].isBooks) {
//             console.log(contentTitle[i]);
//             containerBooks.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           }
//           else if (contentTitle[i].isCosmetics) {
//             console.log(contentTitle[i]);
//             containerCosmetics.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           }
//           else if (contentTitle[i].isHomeDecor) {
//             console.log(contentTitle[i]);
//             containerHomeDecor.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           }
//           else if (contentTitle[i].isSmartphones) {
//             console.log(contentTitle[i]);
//             containerSmartphones.appendChild(
//               dynamicClothingSection(contentTitle[i])
//             );
//           }
//       }
//     } else {
//       console.log("call failed!");
//     }
//   }
// };
// httpRequest.open(
//   "GET",
//   "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
//   true
// );
// httpRequest.send();

const category = [
    { id: 101, img: "/category-images/clothes.jpeg", desc: "Fashion for Men and Women", link: "fashion.html" },
    { id: 102, img: "/category-images/Electronics.jpg", desc: "Electronic Items & Gadgets", link: "electronics.html" },
    { id: 103, img: "/category-images/phone.webp", desc: "Smartphones & Headphones", link: "smartphones.html" },
    { id: 104, img: "/category-images/toys.jpeg", desc: "Toys", link: "toys.html" },
    { id: 105, img: "/category-images/Books.webp", desc: "Books", link: "books.html" },
    { id: 106, img: "/category-images/home.jpg", desc: "Home & Decor", link: "home-decor.html" },
    { id: 107, img: "/category-images/grocery.jpeg", desc: "Grocery", link: "grocery.html" },
    { id: 108, img: "/category-images/cosmetic.jpeg", desc: "Cosmetic & Skincare", link: "cosmetics.html" },
];

let categoryHTML = '';

category.forEach((cat) => {
    categoryHTML += `
    <div class="product-category-images">
        <div class="shop-by-click">
            <img class="shop-category-img" src="${cat.img}">
            <p class="desc">${cat.desc}</p>
            <button class="shop-btn" onclick="window.location.href='${cat.link}'">Shop Now</button>
        </div>
    </div>
    `;
});

document.getElementById('category-container').innerHTML = categoryHTML;
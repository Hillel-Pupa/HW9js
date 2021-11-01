"use strict";
import { products, productCategories } from "./products.js";
const categoriesList = document.querySelector(".categories-list");
const productList = document.querySelector(".products-list");
const productInformation = document.querySelector(".product");
function renderCategories(categories) {
  const children = categories.map((c) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    li.appendChild(link);
    link.textContent = c;
    link.href = `#${c}`;
    return li;
  });
  categoriesList.replaceChildren(...children);
}
renderCategories(productCategories);

function renderProducts(products) {
  console.log(products);
  const children = products.map((product) => {
    const el = document.createElement("li");
    el.addEventListener("click", () => {
      selectProduct(product);
    });
    el.textContent = product.name;
    return el;
  });
  productList.replaceChildren(...children);
}
renderProducts(productCategories);

window.addEventListener("hashchange", (event) => {
  //   renderProducts(location.hash);
  const selectedCategory = location.hash.slice(1);
  const selectedProducts = products[selectedCategory];
  renderProducts(selectedProducts);
  productInformation.replaceChildren();
});

function selectProduct(selectedProduct) {
  console.log(selectedProduct);
  const title = document.createElement("h3");
  title.textContent = selectedProduct.name;
  const img = document.createElement("img");
  img.src = "images/" + selectedProduct.image;
  const description = document.createElement("p");
  const price = document.createElement("p");
  price.textContent = `price:${selectedProduct.price}$`;
  description.textContent = `count:${selectedProduct.count}`;
  const btn = document.createElement("button");
  btn.textContent = "Buy";
  btn.addEventListener("click", buyProduct);
  const children = [title, img, description, price, btn];
  productInformation.replaceChildren(...children);
}

function buyProduct() {
  alert("Order completed");
  location.reload();
}

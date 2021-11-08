"use strict";
import { productsObj, productCategories } from "./products.js";
const categoriesList = document.querySelector(".categories-list");
const productList = document.querySelector(".products-list");
const productInformation = document.querySelector(".product");
const overlay = document.querySelector(".overlay");
const mainForm = document.forms[0];
const orderBtn = mainForm.querySelector(".btn-order");
const orderCard = document.querySelector(".order-card");
const cartBtn = document.querySelector(".cart");
const orderList = document.querySelector(".order-list");
console.log(productsObj);
mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

function renderCategories(categories) {
  const children = categories.map((category) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    li.appendChild(link);
    link.textContent = category;
    link.href = `#${category}`;
    return li; //почему это возвращается
  });
  categoriesList.replaceChildren(...children);
}
renderCategories(productCategories);

// откуда берется этот аргумент
function renderProducts(selectedCategory) {
  const selectedCategoryProducts = productsObj[selectedCategory];
  const children = selectedCategoryProducts.map((product) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    li.appendChild(link);
    link.textContent = product.name;
    link.href = `#${selectedCategory}/${product.id}`;
    return li;
  });
  productList.replaceChildren(...children);
}

window.addEventListener("hashchange", () => {
  //   renderProducts(location.hash);
  const [selectedCategory, productId] = location.hash.slice(1).split("/");
  renderProducts(selectedCategory);
  selectProduct(selectedCategory, productId);
});

function selectProduct(selectedCategory, productId) {
  const selectedProduct = productsObj[selectedCategory].find(
    (product) => product.id === productId
  );
  if (!selectedProduct) {
    productInformation.replaceChildren();
    return;
  }

  const title = document.createElement("h3");
  title.textContent = selectedProduct.name;
  const img = document.createElement("img");
  img.src = "images/" + selectedProduct.image;
  const description = document.createElement("p");
  const count = document.createElement("input");
  count.value = 1;
  count.type = "number";
  const price = document.createElement("p");
  price.textContent = `price:${selectedProduct.price}$`;
  description.textContent = `count:${selectedProduct.count}`;
  const btn = document.createElement("button");
  btn.textContent = "Buy";
  btn.addEventListener("click", () => {
    addToCart(selectedProduct, count.value, selectedCategory);
  });
  //   addToCart(selectedProduct, +count.value);
  // });

  const children = [title, img, description, count, price, btn];
  productInformation.replaceChildren(...children);
}

function getOrders() {
  // достаем текущий заказ, парсим его
  let orders = JSON.parse(localStorage.getItem("orders"));
  // если нет ордеров то тогда инициализируем их
  if (!orders) {
    orders = [[]];
  }
  return orders;
}
// function buyProduct() {
//   alert("Order completed");
//   location.reload();
// }
function addToCart(selectedProduct, count, selectedCategory) {
  // записываем в переменную последний заказ по индексу
  let orders = getOrders();
  let currentOrder = orders[orders.length - 1];
  let orderItem = {
    name: selectedProduct.name,
    count: count,
    category: selectedCategory,
  };
  // пушим продукт в заказ
  currentOrder.push(orderItem);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function showOrder() {
  let orders = getOrders();
  let currentOrder = orders[orders.length - 1];

  for (let index = 0; index < currentOrder.length; index++) {
    let item = currentOrder[index];
    const productName = document.createElement("h6");
    orderList.appendChild(productName);
    productName.textContent = item.name;
    const productCount = document.createElement("p");
    orderList.appendChild(productCount);
    productCount.textContent = "count:" + item.count;
    const productPrice = document.createElement("p");
    orderList.appendChild(productPrice);
  }
}
// вывести заказ

cartBtn.addEventListener("click", showOrder);
function showForm() {
  overlay.hidden = false;
}

orderBtn.addEventListener("click", showFilledForm);

function showFilledForm(selectedProduct) {
  overlay.hidden = true;
  orderCard.hidden = false;
  orderCard.querySelector(".ship-to-city").textContent =
    mainForm.elements.city.value;
  document.body.append(
    `Отделение новой почты: ${mainForm.elements.post.value}`
  );
  document.body.append(`Количество товара: ${mainForm.elements.count.value}`);
  document.body.append(
    `Сумма заказа: ${selectedProduct.price * mainForm.elements.count.value}`
  );
}

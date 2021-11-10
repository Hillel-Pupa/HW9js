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
const buyBtn = document.createElement("button");
const placeOrderBtn = document.querySelector(".place-order");
const ordersListBtn = document.querySelector(".orders");
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
  count.min = 1;
  count.max = selectedProduct.count;
  count.type = "number";
  const price = document.createElement("p");
  price.textContent = `price:${selectedProduct.price}$`;
  description.textContent = `count:${selectedProduct.count}`;
  const btn = document.createElement("button");
  btn.textContent = "add to cart";
  btn.addEventListener("click", () => {
    addToCart(selectedProduct, count.value);
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
  if (!orders || orders.length === 0) {
    orders = [[]];
  }
  return orders;
}

function addToCart(selectedProduct, count) {
  // записываем в переменную последний заказ по индексу
  let orders = getOrders();
  let currentOrder = orders[orders.length - 1];
  let orderItem = {
    name: selectedProduct.name,
    count: count,
    price: selectedProduct.price,
  };
  // пушим продукт в заказ
  currentOrder.push(orderItem);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function showOrder() {
  document.querySelector(".shop").innerHTML = "";
  orderCard.hidden = true;
  let orders = getOrders();
  let currentOrder = orders[orders.length - 1];
  orderList.innerHTML = "";

  function deleteItem(index) {
    currentOrder.splice(index, 1);
    renderOrderList();
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  function renderOrderList() {
    document.querySelector(".all-orders-list").innerHTML = "";
    orderList.innerHTML = "";
    for (let index = 0; index < currentOrder.length; index++) {
      let item = currentOrder[index];
      let orderProductCard = document.createElement("div");
      orderProductCard.classList.add("order-product");
      orderList.appendChild(orderProductCard);
      const btnDeleteItem = document.createElement("span");
      btnDeleteItem.classList.add("delete-item");
      orderProductCard.appendChild(btnDeleteItem);
      btnDeleteItem.addEventListener("click", () => deleteItem(index));
      const productName = document.createElement("h4");
      orderProductCard.appendChild(productName);
      productName.textContent = item.name;
      const productCount = document.createElement("p");
      orderProductCard.appendChild(productCount);
      productCount.textContent = "count:" + item.count;
      const productPrice = document.createElement("p");
      orderProductCard.appendChild(productPrice);
      const orderdProductsPrice = item.price * item.count;
      productPrice.textContent = "price:" + orderdProductsPrice;
      orderList.appendChild(buyBtn);
      buyBtn.classList.add("order-buy");
      buyBtn.textContent = "order";
    }
  }
  renderOrderList();
}

cartBtn.addEventListener("click", showOrder);

buyBtn.addEventListener("click", showForm);
function showForm() {
  overlay.hidden = false;
}

orderBtn.addEventListener("click", showFilledForm);

function showFilledForm(selectedProduct) {
  if (!mainForm.checkValidity()) {
    return;
  }
  orderList.innerHTML = "";
  overlay.hidden = true;
  orderCard.hidden = false;
  orderCard.querySelector(".ship-to-city").textContent =
    mainForm.elements.city.value;
  orderCard.querySelector(
    ".post-number"
  ).textContent = `Отделение новой почты: Nr.${mainForm.elements.post.value}`;
  let orders = getOrders();
  let currentOrder = orders[orders.length - 1];
  let totalSum = 0;
  for (let index = 0; index < currentOrder.length; index++) {
    let item = currentOrder[index];
    const orderdProductsPrice = item.price * item.count;
    totalSum += orderdProductsPrice;
  }
  orderCard.querySelector(
    ".order-sum"
  ).textContent = `Сумма заказа: ${totalSum}`;
}

placeOrderBtn.addEventListener("click", placeOrder);

function placeOrder() {
  let orders = getOrders();
  orders.push([]);
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}

ordersListBtn.addEventListener("click", showAllOrders);

function showAllOrders() {
  document.querySelector(".order-list").innerHTML = "";
  document.querySelector(".shop").innerHTML = "";
  const orderItemTemplate = document.querySelector("#order-item-template");
  const orderTmpl = document.querySelector("#order-template");
  const allOrdersList = document.querySelector(".all-orders-list");
  allOrdersList.textContent = "";
  let orders = getOrders();

  orders.forEach((order, index) => {
    const orderFragment = orderTmpl.content.cloneNode(true);
    orderFragment.querySelector(".order-number").textContent = index + 1;
    const btnDeleteItem = orderFragment.querySelector(".delete-item");
    btnDeleteItem.addEventListener("click", () => deleteOrder(index));

    // orderFragment.querySelector(".order-total").textContent = "-";

    const orderItemList = orderFragment.querySelector(".order-item-list");

    order.forEach((item) => {
      const itemTemplateFragment = orderItemTemplate.content.cloneNode(true);
      itemTemplateFragment.querySelector(".item-name").textContent = item.name;
      itemTemplateFragment.querySelector(".item-count").textContent =
        item.count;
      itemTemplateFragment.querySelector(".item-price").textContent =
        item.price;
      orderItemList.appendChild(itemTemplateFragment);
    });
    allOrdersList.appendChild(orderFragment);
  });

  function deleteOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    showAllOrders();
  }
}

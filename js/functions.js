"use strict";
export function Item(name, count, price, image) {
  this.id = (Math.random() * 1e17).toString(16);
  this.name = name;
  this.count = count;
  this.price = price;
  this.image = image;
}

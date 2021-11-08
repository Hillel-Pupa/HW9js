"use strict";
import { rings } from "./categories/rings.js";
import { necklaces } from "./categories/necklaces.js";
import { earrings } from "./categories/earrings.js";
import { bracelets } from "./categories/bracelets.js";

export const productsObj = {
  //полная запись
  rings: rings,
  necklaces: necklaces,
  //сокращенная запись
  earrings,
  bracelets,
};
export let productCategories = Object.keys(productsObj);
// [
//     "rings",
//     "necklaces",
//     "earrings",
//     "bracelets"
//

window.productsObj = productsObj;

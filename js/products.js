"use strict";
import { rings } from "./categories/rings.js";
import { necklaces } from "./categories/necklaces.js";
import { earrings } from "./categories/earrings.js";
import { bracelets } from "./categories/bracelets.js";

export const products = { rings, necklaces, earrings, bracelets };
export let productCategories = Object.keys(products);

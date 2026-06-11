import { FC26_CATEGORIES, getCategoryById } from "./categories.js";
import { PLAYERS } from "./players.js";
import { SBC_SERVICES } from "./sbc.js";
import { PACKS } from "./packs.js";

// Single seam between the UI and the static catalog. The getters are
// Promise-shaped on purpose: when the backend grows endpoints for these
// categories, only this file needs to change (swap to axios calls).
const STATIC_PRODUCTS = {
  players: PLAYERS,
  sbc: SBC_SERVICES,
  packs: PACKS,
};

export { FC26_CATEGORIES, getCategoryById };

export function getCategoryProducts(categoryId, { platform } = {}) {
  const products = STATIC_PRODUCTS[categoryId] || [];
  const filtered = platform
    ? products.filter((product) => product.platforms.includes(platform))
    : products;
  return Promise.resolve(filtered);
}

export function getFeaturedStaticProducts(limit = 3) {
  const all = Object.values(STATIC_PRODUCTS).flat();
  const featured = all.filter((product) => product.badge);
  return Promise.resolve(featured.slice(0, limit));
}

export function getProductById(productId) {
  const all = Object.values(STATIC_PRODUCTS).flat();
  return all.find((product) => product.id === productId) || null;
}

// Resolves { en, zh } catalog text for the active i18n language.
export function resolveCatalogText(value, language) {
  if (!value || typeof value === "string") {
    return value || "";
  }
  const lang = (language || "en").split("-")[0];
  return value[lang] ?? value.en ?? "";
}

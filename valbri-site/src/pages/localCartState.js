import { clampCartQuantity } from "./cartState.js";
import { getProductById } from "../data/catalog.js";

// Local (browser-only) cart for static catalog products (players / sbc /
// packs). The backend cart API only understands coin packageIds, so these
// items live in localStorage and are rendered as a separate section on the
// Cart page. Mutations fire the same window events the server cart uses so
// the header badge stays in sync for free.
const LOCAL_CART_STORAGE_KEY = "valbri-local-cart";

function readStorage() {
  try {
    const raw = window.localStorage.getItem(LOCAL_CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(items) {
  try {
    window.localStorage.setItem(LOCAL_CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (private mode/quota) — cart simply won't persist.
  }
}

function notifyCartChanged() {
  window.dispatchEvent(new Event("cart-changed"));
}

export function localCartKey(productId, platform) {
  return `${productId}:${platform}`;
}

// Returns entries enriched with their catalog product. Entries whose product
// disappeared from the catalog are dropped silently.
export function getLocalCartItems() {
  return readStorage()
    .map((entry) => {
      const product = getProductById(entry.productId);
      if (!product) return null;
      return {
        key: localCartKey(entry.productId, entry.platform),
        productId: entry.productId,
        platform: entry.platform,
        quantity: clampCartQuantity(entry.quantity),
        product,
      };
    })
    .filter(Boolean);
}

export function getLocalCartCount() {
  return getLocalCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

export function addLocalCartItem({ productId, platform, quantity = 1 }) {
  const items = readStorage();
  const existing = items.find(
    (entry) => entry.productId === productId && entry.platform === platform,
  );
  if (existing) {
    existing.quantity = clampCartQuantity(
      Number(existing.quantity || 0) + Number(quantity || 1),
    );
  } else {
    items.push({ productId, platform, quantity: clampCartQuantity(quantity) });
  }
  writeStorage(items);
  notifyCartChanged();
}

export function updateLocalCartQuantity(key, quantity) {
  const items = readStorage().map((entry) =>
    localCartKey(entry.productId, entry.platform) === key
      ? { ...entry, quantity: clampCartQuantity(quantity) }
      : entry,
  );
  writeStorage(items);
  notifyCartChanged();
}

export function removeLocalCartItem(key) {
  const items = readStorage().filter(
    (entry) => localCartKey(entry.productId, entry.platform) !== key,
  );
  writeStorage(items);
  notifyCartChanged();
}

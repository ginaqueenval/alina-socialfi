// FC26 shop categories. `source` marks where products come from:
//   "api"    — backend packages endpoint (coins)
//   "static" — local catalog in src/data (players / sbc / packs)
export const FC26_CATEGORIES = [
  {
    id: "coins",
    slug: "coins",
    route: "/fc26/coins",
    icon: "coins",
    source: "api",
    fromPrice: 4.99,
    currency: "USD",
  },
  {
    id: "players",
    slug: "players",
    route: "/fc26/players",
    icon: "player",
    source: "static",
    fromPrice: 9.99,
    currency: "USD",
  },
  {
    id: "sbc",
    slug: "sbc",
    route: "/fc26/sbc",
    icon: "sbc",
    source: "static",
    fromPrice: 7.99,
    currency: "USD",
  },
  {
    id: "packs",
    slug: "packs",
    route: "/fc26/packs",
    icon: "pack",
    source: "static",
    fromPrice: 5.99,
    currency: "USD",
  },
];

export function getCategoryById(id) {
  return FC26_CATEGORIES.find((category) => category.id === id) || null;
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./motion.jsx";
import ProductCard from "./ProductCard.jsx";
import { getCategoryProducts } from "../data/catalog.js";
import { getStoredPlayerToken } from "../utils/playerAuth.js";
import { addLocalCartItem } from "../pages/localCartState.js";
import {
  getPackageQuantity,
  resetPackageQuantity,
  updatePackageQuantity,
} from "../pages/fc26State";

const PLATFORMS = ["PlayStation", "Xbox", "PC"];

// Shared listing page for static FC26 categories (players / sbc / packs).
// Mirrors the coins page UX: platform tabs, qty stepper, login-gated
// add-to-cart — but writes to the local cart instead of the server cart.
export default function CategoryPage({ categoryId, titleKey, descriptionKey }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [platform, setPlatform] = useState("PlayStation");
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [feedbackState, setFeedbackState] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCategoryProducts(categoryId, { platform })
      .then((items) => {
        setProducts(items);
        setQuantities({});
        setFeedbackState(null);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [categoryId, platform]);

  useEffect(() => {
    if (!feedbackState) return undefined;
    const timeoutId = window.setTimeout(() => setFeedbackState(null), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [feedbackState]);

  const getQty = (id) => getPackageQuantity(quantities, id);
  const setQty = (id, val) => {
    setQuantities((prev) => updatePackageQuantity(prev, id, val));
  };

  const handleAddToCart = (product) => {
    if (!getStoredPlayerToken()) {
      navigate("/login", { state: { redirectTo: location.pathname } });
      return;
    }
    addLocalCartItem({
      productId: product.id,
      platform,
      quantity: getQty(product.id),
    });
    setQuantities((prev) => resetPackageQuantity(prev, product.id));
    setFeedbackState({
      productId: product.id,
      type: "success",
      message: t("category.added"),
    });
    window.dispatchEvent(new Event("cart-feedback"));
  };

  return (
    <main className="mx-auto max-w-6xl overflow-x-hidden px-4 py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-extrabold">{t(titleKey)}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#9AA7BD]">
            {t(descriptionKey)}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/5 bg-[#0B1220]/60 p-6">
        <h2 className="text-lg font-bold">{t("category.selectPlatform")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={
                "rounded-xl px-4 py-2 text-sm font-semibold border " +
                (platform === p
                  ? "border-[#00FF9A]/40 bg-[#00FF9A]/10 text-[#00FF9A]"
                  : "border-white/10 bg-white/5 text-[#E7EDF7] hover:border-[#00FF9A]/30")
              }
            >
              {p}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-8 text-center text-sm text-[#9AA7BD]">
              Loading...
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-8 text-center text-sm text-[#9AA7BD]">
              {t("category.emptyState")}
            </div>
          ) : (
            products.map((product, idx) => (
              <ScrollReveal key={product.id} as="div" delay={idx * 60}>
                <ProductCard
                  product={product}
                  quantity={getQty(product.id)}
                  onQuantityChange={(val) => setQty(product.id, val)}
                  onAddToCart={() => handleAddToCart(product)}
                  feedback={
                    feedbackState?.productId === product.id ? feedbackState : null
                  }
                />
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

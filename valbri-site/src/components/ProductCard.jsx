import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resolveCatalogText } from "../data/catalog.js";
import { formatPrice } from "../utils/orderDisplay";

const BADGE_CLASSES = {
  hot: "badge-ribbon badge-hot",
  bestValue: "badge-ribbon badge-best",
  new: "badge-ribbon badge-new",
};

function ProductBadge({ badge }) {
  const { t } = useTranslation();
  if (!badge || !BADGE_CLASSES[badge]) return null;
  return <span className={BADGE_CLASSES[badge]}>{t(`badges.${badge}`)}</span>;
}

function ProductMeta({ product }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  if (product.category === "players") {
    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00FF9A]/20 bg-[#00FF9A]/[0.07] px-2.5 py-1 text-xs font-black text-[#7BFFCA]">
          {product.rating}
          <span className="font-semibold text-[#7BFFCA]/70">{t("category.rating")}</span>
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-[#C9D3E5]">
          {product.position}
        </span>
        <span className="text-xs text-[#9AA7BD]">
          {resolveCatalogText(product.club, lang)}
        </span>
      </div>
    );
  }
  if (product.category === "sbc") {
    return (
      <div className="mt-3">
        <p className="text-[13px] leading-6 text-[#9AA7BD]">
          {resolveCatalogText(product.description, lang)}
        </p>
        <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#72809A]">
          {t("category.requirements")}:{" "}
          <span className="normal-case tracking-normal text-[#C9D3E5]">
            {resolveCatalogText(product.requirements, lang)}
          </span>
        </div>
      </div>
    );
  }
  if (product.category === "packs") {
    return (
      <p className="mt-3 text-[13px] leading-6 text-[#9AA7BD]">
        {resolveCatalogText(product.contents, lang)}
      </p>
    );
  }
  return null;
}

// Card for static catalog products (players / sbc / packs).
// Full variant: qty stepper + add-to-cart. Compact variant (homepage featured
// strip): price + link into the category page.
export default function ProductCard({
  product,
  quantity = 1,
  onQuantityChange,
  onAddToCart,
  loading = false,
  feedback = null,
  compact = false,
  to,
}) {
  const { t, i18n } = useTranslation();
  const name = resolveCatalogText(product.name, i18n.language);

  if (compact) {
    return (
      <Link
        to={to || "/fc26"}
        className="product-card relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,22,36,0.78),rgba(8,12,20,0.92))] p-5"
      >
        <span className="pkg-card-glow" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3">
          <ProductBadge badge={product.badge} />
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#9AA7BD]">
            {t(`home.categories.items.${product.category}.title`)}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-black tracking-tight text-[#E7EDF7]">
          {name}
        </h3>
        <div className="min-h-0 flex-1">
          <ProductMeta product={product} />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="text-2xl font-black tracking-tight text-[#E7EDF7]">
            {formatPrice(product.price, product.currency)}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00FF9A]">
            {t("home.featured.view")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3.75 10a.75.75 0 0 1 .75-.75h9.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H4.5A.75.75 0 0 1 3.75 10Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div className="product-card relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,22,36,0.78),rgba(8,12,20,0.92))] p-5 sm:p-6">
      <span className="pkg-card-glow" aria-hidden="true" />
      {feedback && (
        <div
          className={`pointer-events-none absolute inset-x-4 top-4 z-20 flex items-center justify-center gap-2 rounded-[18px] border px-3 py-2 text-center text-[11px] font-semibold shadow-[0_16px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 ${
            feedback.type === "success"
              ? "border-[#00FF9A]/24 bg-[linear-gradient(180deg,rgba(7,20,18,0.92),rgba(9,18,24,0.9))] text-[#DFF7EB]"
              : "border-red-400/24 bg-[linear-gradient(180deg,rgba(35,12,18,0.94),rgba(25,10,15,0.9))] text-[#FFD7DE]"
          }`}
        >
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-black ${
              feedback.type === "success"
                ? "bg-[#00FF9A]/14 text-[#00FF9A]"
                : "bg-red-400/14 text-red-300"
            }`}
          >
            {feedback.type === "success" ? "✓" : "!"}
          </span>
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="flex min-h-6 items-start justify-between gap-3">
        <ProductBadge badge={product.badge} />
        <span className="text-[11px] uppercase tracking-[0.18em] text-[#9AA7BD]">
          {t("category.eta", { eta: product.eta })}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-black tracking-tight text-[#E7EDF7]">
        {name}
      </h3>
      <div className="min-h-0 flex-1">
        <ProductMeta product={product} />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <div className="text-[2rem] font-black leading-none tracking-[-0.04em] text-[#E7EDF7]">
            {formatPrice(product.price * quantity, product.currency)}
          </div>
          <div className="mt-1.5 text-[11px] text-[#9AA7BD]">
            {product.currency || "USD"}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 text-[#9AA7BD]">
          <button
            onClick={() => onQuantityChange?.(quantity - 1)}
            className="text-lg hover:text-[#E7EDF7]"
            aria-label="-"
          >
            −
          </button>
          <span className="min-w-[24px] text-center text-sm font-semibold text-[#E7EDF7]">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange?.(quantity + 1)}
            className="text-lg hover:text-[#E7EDF7]"
            aria-label="+"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => onAddToCart?.()}
        disabled={loading}
        className="mt-4 w-full rounded-2xl bg-[#00FF9A] px-4 py-3 text-center text-sm font-black text-[#070A0F] shadow-[0_14px_28px_rgba(0,255,154,0.14)] transition hover:-translate-y-[1px] hover:bg-[#00D47E] disabled:opacity-50"
      >
        {loading ? "..." : t("category.addToCart")}
      </button>
    </div>
  );
}

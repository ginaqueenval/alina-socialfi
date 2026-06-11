import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/motion.jsx";
import CategoryIcon from "../components/CategoryIcons.jsx";
import { FC26_CATEGORIES } from "../data/catalog.js";
import { formatPrice } from "../utils/orderDisplay";

// FC26 storefront hub — entry point to the four product categories.
export default function Fc26Hub() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto max-w-6xl overflow-x-hidden px-4 py-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF9A]/24 bg-[#00FF9A]/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7BFFCA]">
          <span className="h-1 w-1 rounded-full bg-[#00FF9A] shadow-[0_0_8px_rgba(0,255,154,0.6)]" />
          {t("fc26Hub.eyebrow")}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          {t("fc26Hub.title")}
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#9AA7BD] sm:text-base">
          {t("fc26Hub.subtitle")}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FC26_CATEGORIES.map((category, idx) => (
          <ScrollReveal key={category.id} as="div" delay={idx * 80}>
            <Link
              to={category.route}
              className="category-tile group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,22,36,0.78),rgba(8,12,20,0.92))] p-6"
            >
              <span className="pkg-card-glow" aria-hidden="true" />
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#00FF9A]/22 bg-[#00FF9A]/[0.05] text-[#7BFFCA] shadow-[inset_0_0_14px_rgba(0,255,154,0.1)]">
                <CategoryIcon kind={category.icon} />
              </div>
              <h2 className="mt-5 text-lg font-black tracking-tight text-[#E7EDF7]">
                {t(`home.categories.items.${category.id}.title`)}
              </h2>
              <p className="mt-2 flex-1 text-[13px] leading-6 text-[#9AA7BD]">
                {t(`home.categories.items.${category.id}.desc`)}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-[#9AA7BD]">
                  {t("category.from")}{" "}
                  <span className="text-sm font-black text-[#E7EDF7]">
                    {formatPrice(category.fromPrice, category.currency)}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00FF9A] transition-transform group-hover:translate-x-0.5">
                  {t("fc26Hub.browse")}
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
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}

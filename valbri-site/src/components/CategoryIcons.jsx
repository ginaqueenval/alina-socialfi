// Inline SVG icons for the four FC26 shop categories, drawn in the same
// 1.5-stroke style as the guarantee icons on the homepage.
export default function CategoryIcon({ kind, className = "h-7 w-7" }) {
  if (kind === "coins") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <ellipse cx="12" cy="6.5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 6.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 11.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "player") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path
          d="M7 3h10l2.5 3.5L12 21 4.5 6.5 7 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9 13.5a3.5 3.5 0 0 1 6 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "sbc") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M14.5 17h6M17.5 14v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "pack") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path
          d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16V8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 8 12 12.5 20.5 8M12 12.5v8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return null;
}

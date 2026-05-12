export type EditorialAffiliateTone = "on-dark" | "on-light";

type EditorialAffiliateLinkProps = {
  href: string;
  /** Visual context for glass-on-image vs page body */
  tone?: EditorialAffiliateTone;
  className?: string;
};

/**
 * Minimal affiliate exit—editorial caption, not a retail CTA.
 * Renders nothing when `href` is empty.
 */
export function EditorialAffiliateLink({
  href,
  tone = "on-dark",
  className = "",
}: EditorialAffiliateLinkProps) {
  const url = href.trim();
  if (!url) return null;

  const dark = tone === "on-dark";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label="Opens an outside link in a new tab."
      className={`group/aff inline-flex min-h-11 w-full flex-col justify-center gap-1.5 rounded-lg outline-none ring-offset-2 ring-offset-transparent transition-[opacity,transform] duration-500 ease-silk active:opacity-80 sm:min-h-0 sm:w-auto sm:max-w-[14rem] ${className}`}
    >
      <span
        className={`inline-flex w-fit items-baseline gap-2 border-b font-editorial text-[0.8125rem] italic leading-snug transition-[border-color,color] duration-700 ease-silk ${
          dark
            ? "border-white/10 pb-0.5 text-white/55 group-hover/aff:border-white/30 group-hover/aff:text-white/95 group-focus-visible/aff:border-rose-200/45 group-focus-visible/aff:ring-1 group-focus-visible/aff:ring-white/30"
            : "border-taupe-200/35 pb-0.5 text-taupe-300 group-hover/aff:border-taupe-300/80 group-hover/aff:text-softblack group-focus-visible/aff:ring-1 group-focus-visible/aff:ring-taupe-200/50"
        }`}
      >
        <span>Where it crossed my path</span>
        <span
          className={`translate-y-px font-sans text-[10px] font-normal not-italic tracking-normal opacity-45 transition-[opacity,transform] duration-500 group-hover/aff:translate-x-0.5 group-hover/aff:opacity-80`}
          aria-hidden
        >
          ↗
        </span>
      </span>
      <span
        className={`max-w-[14rem] font-sans text-[6.5px] font-medium uppercase leading-relaxed tracking-[0.32em] ${
          dark ? "text-white/25" : "text-taupe-200"
        }`}
      >
        Leaves quietly · new tab
      </span>
    </a>
  );
}

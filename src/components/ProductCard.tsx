"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Product } from "@/lib/types";
import { EditorialAffiliateLink } from "@/components/EditorialAffiliateLink";
import { silk } from "@/lib/motion";

type ProductCardProps = {
  product: Product;
  index?: number;
  variant?: "default" | "featured";
  className?: string;
};

export function ProductCard({
  product,
  index = 0,
  variant = "default",
  className = "",
}: ProductCardProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  const baseDelay = reduce ? 0 : 0.1 * index;
  const displayTags = product.tags.filter((t) => t !== "whisper");

  const isFeatured = variant === "featured";
  const radiusOuter = isFeatured
    ? "rounded-[2.25rem] sm:rounded-[2.5rem]"
    : "rounded-[1.65rem] sm:rounded-[2rem]";
  const radiusInner = isFeatured
    ? "rounded-[1.85rem] sm:rounded-[2.1rem]"
    : "rounded-[1.35rem] sm:rounded-[1.65rem]";
  const aspect = isFeatured ? "aspect-[4/5]" : "aspect-[3/4]";

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-6% 0px" : "-12% 0px" }}
      transition={{ duration: 1.12, ease: silk, delay: baseDelay }}
      className={`relative touch-manipulation ${className}`}
    >
      <motion.div
        className="group/card relative isolate pb-10"
        animate={
          reduce || isMobile
            ? undefined
            : {
                y: [0, -5, 0],
              }
        }
        transition={{
          duration: 7.5 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
      >
        {/* Layered ambient glow — intensifies on hover */}
        <div
          className={`pointer-events-none absolute -inset-6 ${radiusOuter} bg-[radial-gradient(ellipse_at_50%_80%,rgba(237,207,195,0.38)_0%,transparent_58%)] opacity-[0.36] blur-3xl transition-all duration-cine ease-silk group-hover/card:opacity-75 group-hover/card:blur-[2.85rem]`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute -inset-3 ${radiusOuter} bg-gradient-to-br from-white/45 via-rose-50/15 to-transparent opacity-0 blur-2xl transition-opacity duration-cine ease-silk group-hover/card:opacity-100`}
          aria-hidden
        />

        {/* Soft “plinth” shadow for floating depth */}
        <div
          className={`pointer-events-none absolute left-[10%] right-[10%] -bottom-8 h-14 ${radiusOuter} bg-gradient-to-b from-softblack/[0.1] to-transparent opacity-50 blur-2xl transition-all duration-cine ease-silk group-hover/card:opacity-[0.82] group-hover/card:translate-y-1`}
          aria-hidden
        />

        <div
          className={`relative ${radiusOuter} border border-white/50 bg-white/[0.16] p-[1px] shadow-[0_2px_0_0_rgba(255,255,255,0.5)_inset,0_32px_80px_-32px_rgba(110,94,77,0.32),0_14px_40px_-18px_rgba(27,23,20,0.1)] backdrop-blur-[16px] transition-all duration-cine ease-silk will-change-transform active:scale-[0.988] motion-safe:group-hover/card:-translate-y-2 motion-safe:group-hover/card:border-white/72 motion-safe:group-hover/card:bg-white/[0.24] motion-safe:group-hover/card:shadow-[0_2px_0_0_rgba(255,255,255,0.62)_inset,0_0_0_1px_rgba(237,207,195,0.28),0_44px_110px_-40px_rgba(110,94,77,0.38),0_0_90px_-24px_rgba(237,207,195,0.28)] sm:active:scale-100`}
        >
          {/* Inner frosted rim */}
          <div
            className={`relative overflow-hidden ${radiusOuter} bg-gradient-to-b from-white/30 via-ivory-50/10 to-white/[0.07]`}
          >
            <div className={`relative ${aspect} w-full overflow-hidden ${radiusInner}`}>
              <Image
                src={product.image}
                alt=""
                fill
                sizes="(max-width: 768px) 92vw, 40vw"
                className="object-cover transition-[transform,filter] duration-[1550ms] ease-silk will-change-transform group-hover/card:scale-[1.06] group-hover/card:brightness-[1.025] max-md:active:scale-[1.04]"
                priority={isFeatured}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-softblack/72 via-softblack/22 to-transparent opacity-[0.88] transition-opacity duration-cine group-hover/card:opacity-[0.93]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-rose-100/10 mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />

              {/* Collectible marks */}
              <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
                {product.rebought ? (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 font-sans text-[7px] font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm">
                    Repurchased ✦
                  </span>
                ) : null}
                {product.wishlist ? (
                  <span className="rounded-full bg-berry/20 px-2 py-0.5 font-sans text-[7px] font-medium uppercase tracking-[0.28em] text-rose-100/90 backdrop-blur-sm">
                    On the list
                  </span>
                ) : null}
              </div>

              {/* Personal notes — revealed on hover / focus / touch */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-softblack/88 via-softblack/55 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7 sm:pt-28">
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-white/50">
                  {product.category}
                </p>
                <h3
                  className={`mt-1.5 font-display font-medium tracking-[-0.02em] text-white text-balance drop-shadow-sm ${
                    isFeatured
                      ? "text-[1.65rem] leading-[1.05] sm:text-[2rem]"
                      : "text-xl leading-tight sm:text-[1.65rem]"
                  }`}
                >
                  {product.name}
                </h3>
                {product.mood ? (
                  <p className="mt-2 font-editorial text-sm italic leading-snug text-rose-100/90 sm:text-base">
                    {product.mood}
                  </p>
                ) : null}

                {/* Hover / focus / touch / reduced-motion: reveal personal notes */}
                <div
                  className={`grid transition-[grid-template-rows] duration-1000 ease-silk motion-reduce:grid-rows-[1fr] max-lg:grid-rows-[1fr] ${
                    reduce
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr] group-hover/card:grid-rows-[1fr] group-focus-within/card:grid-rows-[1fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="mt-5 space-y-5 border-t border-white/15 pt-5">
                      {displayTags.length > 0 ? (
                        <div>
                          <p className="mb-2.5 font-sans text-[8px] font-medium uppercase tracking-[0.36em] text-white/38">
                            Echoes
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {displayTags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full border border-white/18 bg-white/[0.08] px-2.5 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-white/72 backdrop-blur-sm"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <div>
                        <p className="mb-2 font-sans text-[8px] font-medium uppercase tracking-[0.36em] text-white/38">
                          From my notebook
                        </p>
                        <p className="max-w-md font-editorial text-[0.9375rem] font-light italic leading-relaxed text-white/88 sm:text-base">
                          {product.review}
                        </p>
                      </div>

                      <div className="flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                        <Link
                          href={`/${product.section}`}
                          className="group/room inline-flex min-h-11 w-full max-w-full items-center gap-3 rounded-xl font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-white/50 transition-colors duration-500 ease-silk active:bg-white/10 hover:text-white/90 sm:min-h-0 sm:w-fit sm:max-w-none sm:py-0"
                        >
                          <span className="h-px w-6 shrink-0 bg-white/35 transition-all duration-500 group-hover/room:w-10 group-hover/room:bg-white/60" />
                          Where it lives here
                        </Link>

                        <EditorialAffiliateLink
                          href={product.affiliateLink}
                          tone="on-dark"
                          className="sm:shrink-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

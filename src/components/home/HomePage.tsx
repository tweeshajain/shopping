"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SECTIONS } from "@/lib/sections";
import { productsForHomeWhispers } from "@/lib/products";
import { EditorialAffiliateLink } from "@/components/EditorialAffiliateLink";
import { silk } from "@/lib/motion";
import type { Product } from "@/lib/types";

const homeCurated = productsForHomeWhispers();

const MEMES = [
  {
    tag: "me, every sunday",
    text: "no more skincare purchases.",
    sub: "adds to cart Monday 8am",
    rotate: "-rotate-[1.2deg]",
    size: "lg",
  },
  {
    tag: "my wallet",
    text: "please, I'm begging you.",
    sub: "me: one more serum won't hurt",
    rotate: "rotate-[0.8deg]",
    size: "sm",
  },
  {
    tag: "no spend month day 3",
    text: "it's not an impulse buy if you've been thinking about it for three weeks.",
    sub: null,
    rotate: "-rotate-[0.5deg]",
    size: "lg",
  },
  {
    tag: "me adding to wishlist",
    text: "it's basically mine already.",
    sub: "just waiting on payday",
    rotate: "rotate-[1.4deg]",
    size: "sm",
  },
  {
    tag: "my shelf",
    text: "we don't have space for another one.",
    sub: "me: found a new serum 🤩",
    rotate: "-rotate-[0.9deg]",
    size: "sm",
  },
  {
    tag: "skincare is self care",
    text: "the receipts? we don't discuss those.",
    sub: null,
    rotate: "rotate-[0.6deg]",
    size: "lg",
  },
] as const;

const TICKER_ITEMS = [
  "not sponsored · just obsessed",
  "✦",
  "tested on my actual face",
  "✦",
  "if I repurchase it, it made the list",
  "✦",
  "your unpaid beauty therapist",
  "✦",
  "tried it all so you don't have to",
  "✦",
  "honest always",
  "✦",
];


/* ─── Hero right: an editorial "what's inside" index card ─── */
function HeroIndexCard({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.25, ease: silk, delay: 0.45 }}
      className="overflow-hidden rounded-[2rem] border border-warmgrey-100/70 bg-white/55 backdrop-blur-md sm:rounded-[2.5rem]"
    >
      <div className="border-b border-warmgrey-100/50 px-8 py-5 sm:px-10">
        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.46em] text-taupe-200">
          Inside this edit
        </p>
      </div>
      <div className="divide-y divide-warmgrey-100/40">
        {SECTIONS.map((section, i) => (
          <Link
            key={section.slug}
            href={`/${section.slug}`}
            className="group flex items-center justify-between px-8 py-5 transition-colors duration-400 ease-silk hover:bg-signature-faint sm:px-10 sm:py-6"
          >
            <div className="flex items-baseline gap-5">
              <span className="font-sans text-[10px] tabular-nums text-taupe-200 transition-colors duration-300 group-hover:text-signature">
                0{i + 1}
              </span>
              <div>
                <p className="font-display text-lg font-medium tracking-[-0.02em] text-softblack transition-transform duration-400 ease-silk group-hover:translate-x-0.5 sm:text-xl">
                  {section.label}
                </p>
                <p className="font-sans text-[10px] text-taupe-300">{section.ambient}</p>
              </div>
            </div>
            <span className="text-taupe-200 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-signature">
              →
            </span>
          </Link>
        ))}
      </div>
      <div className="border-t border-warmgrey-100/50 px-8 py-4 sm:px-10">
        <div className="inline-flex items-center gap-2">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signature" />
          <span className="font-sans text-[8px] font-medium uppercase tracking-[0.32em] text-signature/60">
            Updated regularly
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Featured product card for "Lately" section ─── */
function FeaturedProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.95, ease: silk, delay: 0.08 * index }}
      className="group"
    >
      <div className="relative mb-5 aspect-[3/4] overflow-hidden rounded-2xl bg-ivory-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
        />
        {product.rebought && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-white/85 px-2.5 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.26em] text-signature backdrop-blur-sm">
              Repurchased ✦
            </span>
          </div>
        )}
        {product.wishlist && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-signature/90 px-2.5 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.26em] text-white backdrop-blur-sm">
              On the list
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2.5">
        <div className="flex items-baseline justify-between">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-taupe-200">
            {product.category}
          </p>
          <span className="font-sans text-xs tabular-nums text-warmgrey-100">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-softblack sm:text-[1.35rem]">
          {product.name}
        </h3>
        <p className="font-editorial text-[0.9375rem] italic leading-relaxed text-warmgrey-400">
          &ldquo;{product.review}&rdquo;
        </p>
        <div className="pt-1">
          <EditorialAffiliateLink href={product.affiliateLink} tone="on-light" />
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export function HomePage() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="flex min-h-dvh items-center pt-[max(7rem,env(safe-area-inset-top)+5.5rem)] pb-20 safe-x sm:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] lg:gap-14">

            {/* Left */}
            <div className="space-y-8 lg:space-y-9">
<div className="space-y-0">
                {[
                  "I’ve spent way",
                  "too much money",
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: silk, delay: 0.08 + i * 0.1 }}
                  >
                    <h1 className="font-display text-[clamp(2.85rem,7.5vw,5.5rem)] font-medium leading-[0.93] tracking-[-0.04em] text-softblack">
                      {line}
                    </h1>
                  </motion.div>
                ))}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: silk, delay: 0.28 }}
                >
                  <h1 className="font-display text-[clamp(2.85rem,7.5vw,5.5rem)] font-medium leading-[0.93] tracking-[-0.04em] text-signature">
                    finding these.
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: silk, delay: 0.38 }}
                className="max-w-[38ch] font-sans text-[15px] leading-[1.8] text-warmgrey-400"
              >
                Consider me the friend who spent way too much figuring this out.
                You just get the list.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: silk, delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {SECTIONS.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="rounded-full border border-warmgrey-100 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-taupe-300 transition-all duration-500 ease-silk hover:border-signature hover:bg-signature hover:text-white active:scale-95"
                  >
                    {s.label}
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Right — index card, no images */}
            <div className="hidden lg:block">
              <HeroIndexCard reduce={Boolean(reduce)} />
            </div>
          </div>
        </div>
      </section>


      {/* ─── MEMES ────────────────────────────────────────────────── */}
      <section className="safe-x py-20 sm:px-10 sm:py-28 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: silk }}
            className="mb-10 flex items-center gap-5 sm:mb-12"
          >
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.44em] text-taupe-200">
              Painfully relatable
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-warmgrey-100/60 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
            {MEMES.map((meme, i) => {
              const col = meme.size === "lg" ? "lg:col-span-7" : "lg:col-span-5";
              return (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.85, ease: silk, delay: reduce ? 0 : 0.07 * i }}
                  className={col}
                >
                  <div
                    className={`group h-full rounded-2xl border border-warmgrey-100/70 bg-white/50 p-7 backdrop-blur-sm transition-all duration-500 ease-silk hover:border-signature/20 hover:bg-signature-faint hover:shadow-[0_8px_40px_-12px_rgba(196,96,122,0.18)] sm:rounded-[1.5rem] sm:p-8 ${meme.rotate}`}
                  >
                    <p className="mb-4 font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-signature/60">
                      {meme.tag}
                    </p>
                    <p className="font-display text-[clamp(1.25rem,2.8vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.025em] text-softblack">
                      {meme.text}
                    </p>
                    {meme.sub && (
                      <p className="mt-3 font-editorial text-sm italic text-warmgrey-400">
                        — {meme.sub}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-signature py-3.5">
        <motion.div
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="flex w-[200%] whitespace-nowrap"
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup} className="flex shrink-0 items-center">
              {TICKER_ITEMS.map((t, ti) => (
                <span
                  key={`${dup}-${ti}`}
                  className={`px-7 font-sans text-[10px] font-medium uppercase tracking-[0.32em] sm:px-9 ${
                    t === "✦" ? "text-white/35" : "text-white/85"
                  }`}
                >
                  {t}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────────── */}
      <section className="safe-x py-28 sm:px-10 sm:py-36 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: silk }}
            className="mb-16 sm:mb-20"
          >
            <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.44em] text-taupe-200">
              Lately
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-medium tracking-[-0.03em] text-softblack">
              What I keep reaching for.
            </h2>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
            {homeCurated.slice(0, 3).map((product, i) => (
              <FeaturedProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────── */}
      <footer className="safe-x safe-b border-t border-warmgrey-100/40 py-14 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg tracking-[0.22em] text-softblack">ATELIER</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-taupe-200">
            Objects lived with, not staged · {new Date().getFullYear()}
          </p>
        </div>
      </footer>

    </div>
  );
}

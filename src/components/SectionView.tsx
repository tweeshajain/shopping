"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import type { Product, SectionMeta } from "@/lib/types";
import { silk } from "@/lib/motion";

type SectionViewProps = {
  section: SectionMeta;
  products: Product[];
};

export function SectionView({ section, products }: SectionViewProps) {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-dvh scroll-mt-28 pb-36 pt-32 safe-x sm:pb-44 sm:pt-40 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: silk }}
          className="mb-24 max-w-3xl space-y-7 sm:mb-32 sm:space-y-9"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-[3rem] items-center gap-2.5 rounded-xl font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-taupe-300 transition-colors duration-500 ease-silk active:bg-white/45 hover:text-softblack"
          >
            <span aria-hidden>←</span>
            Atelier
          </Link>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400/95">
            {section.ambient}
          </p>
          <h1 className="font-display text-balance text-[clamp(2.25rem,6vw,3.5rem)] font-medium tracking-[-0.035em] text-softblack">
            {section.label}
          </h1>
          <p className="font-editorial text-xl font-light italic leading-[1.55] text-warmgrey-400 sm:text-2xl sm:leading-[1.5]">
            {section.headline}
          </p>
          <p className="max-w-xl font-sans text-sm leading-[1.7] text-warmgrey-400 sm:text-[15px]">
            {section.subline}
          </p>
        </motion.header>

        {products.length === 0 ? (
          <p className="font-editorial text-lg italic leading-relaxed text-taupe-200">
            This room is quiet for now—only what insists will find its way back
            here.
          </p>
        ) : (
          <div className="flex flex-col gap-20 sm:gap-28 lg:gap-32">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 44 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 1.05, ease: silk, delay: reduce ? 0 : 0.07 * i }}
                className={
                  i % 2 === 0
                    ? "lg:mr-[12%] lg:max-w-md lg:self-start"
                    : "lg:ml-[12%] lg:max-w-md lg:self-end"
                }
              >
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

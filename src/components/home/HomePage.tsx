"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SECTIONS } from "@/lib/sections";
import { productsForHomeWhispers } from "@/lib/products";
import { useIsMobile } from "@/hooks/useIsMobile";
import { silk } from "@/lib/motion";

const homeCurated = productsForHomeWhispers();

const HERO_HEADLINE = "Beautiful things I live with.";
const HERO_LINE_2 =
  "Each one earned its place—by touch, by memory, by pleasure repeated until it became home.";
const HERO_LINE_3 =
  "A quiet residence of scent, texture, and light—only what has moved me stays.";

function HeroHeadlineWords({ reduce }: { reduce: boolean }) {
  const words = HERO_HEADLINE.replace(/\.$/, "").split(" ");
  if (reduce) {
    return <span className="block">{HERO_HEADLINE}</span>;
  }
  return (
    <span className="block [perspective:1200px]">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
          <motion.span
            className="inline-block origin-bottom"
            initial={{ opacity: 0, y: "1.05em", rotateX: -14 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1.15,
              ease: silk,
              delay: 0.12 + i * 0.065,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
          {i === words.length - 1 ? (
            <motion.span
              className="inline-block text-rose-300/90"
              initial={{ opacity: 0, scale: 0.15 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: silk, delay: 0.62 }}
            >
              .
            </motion.span>
          ) : null}
        </span>
      ))}
    </span>
  );
}

export function HomePage() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const calmHero = Boolean(reduce) || isMobile;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.96],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.62],
    reduce ? [1, 1] : [1, 0],
  );
  const heroContentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -72],
  );

  return (
    <div className="overflow-x-hidden [overflow-y:visible]">
      <div ref={heroRef} className="relative h-[190vh] sm:h-[178vh]">
        <div className="sticky top-0 flex h-dvh min-h-[640px] flex-col justify-center overflow-hidden pt-[max(5.75rem,env(safe-area-inset-top)+4.5rem)] sm:pt-28">
          {/* Cinematic atmosphere — layered animated gradients */}
          <div className="pointer-events-none absolute inset-0 -z-20 bg-ivory-50" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-[20%] top-[-25%] -z-10 h-[85vmin] w-[85vmin] rounded-full mix-blend-multiply"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(237,207,195,0.55) 0%, rgba(247,242,234,0.15) 45%, transparent 70%)",
            }}
            animate={
              calmHero
                ? undefined
                : {
                    x: [0, 24, 0],
                    y: [0, 18, 0],
                    scale: [1, 1.06, 1],
                    opacity: [0.55, 0.85, 0.55],
                  }
            }
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-[15%] bottom-[-20%] -z-10 h-[75vmin] w-[75vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 60% 50%, rgba(201,185,166,0.35) 0%, rgba(237,207,195,0.2) 40%, transparent 68%)",
            }}
            animate={
              calmHero
                ? undefined
                : {
                    x: [0, -20, 0],
                    y: [0, -14, 0],
                    scale: [1, 1.12, 1],
                    opacity: [0.35, 0.6, 0.35],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-rose-50/25 to-beige-200/30"
            animate={
              calmHero
                ? undefined
                : {
                    opacity: [0.25, 0.55, 0.3, 0.45, 0.25],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.035]"
            aria-hidden
          />

          <motion.div
            style={{
              y: heroContentY,
              scale: heroScale,
              opacity: heroOpacity,
            }}
            className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center safe-x sm:px-10 lg:px-14"
          >
            <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
              {/* Floating visuals — pure light, no objects */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute bottom-[10%] left-[-4%] z-0 hidden h-56 w-56 sm:h-72 sm:w-72 lg:bottom-[14%] lg:left-[2%] lg:block"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: silk, delay: 0.45 }}
              >
                <motion.div
                  animate={
                    calmHero ? undefined : { scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }
                  }
                  transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(237,207,195,0.55)_0%,rgba(247,242,234,0.18)_45%,transparent_72%)] blur-2xl"
                />
              </motion.div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute right-[14%] top-[36%] z-0 hidden lg:block"
                animate={reduce ? undefined : { y: [0, -8, 0], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-200/80 to-transparent sm:w-32" />
              </motion.div>

              {/* Layered typography */}
              <div className="relative z-10 lg:col-span-10 lg:col-start-1">
                <motion.p
                  initial={reduce ? false : { opacity: 0, letterSpacing: "0.6em" }}
                  animate={reduce ? undefined : { opacity: 1, letterSpacing: "0.42em" }}
                  transition={{ duration: 1.2, ease: silk }}
                  className="font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-taupe-300 sm:text-[10px]"
                >
                  Living archive · loved slowly
                </motion.p>

                <div className="relative mt-6 sm:mt-8">
                  <p
                    className="pointer-events-none absolute -left-1 top-1/2 z-0 max-w-[95%] -translate-y-1/2 font-display text-[clamp(3.5rem,14vw,10rem)] font-light leading-none tracking-[-0.04em] text-softblack/[0.045] sm:max-w-none"
                    aria-hidden
                  >
                    Archive
                  </p>

                  <h1 className="relative z-10 max-w-[16ch] font-display text-[clamp(2.75rem,8.2vw,5.75rem)] font-medium leading-[0.92] tracking-[-0.035em] text-softblack">
                    <HeroHeadlineWords reduce={Boolean(reduce)} />
                  </h1>
                </div>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 1.05, ease: silk, delay: 0.55 }}
                  className="relative z-10 mt-8 max-w-lg font-editorial text-lg font-light italic leading-relaxed text-warmgrey-400 sm:mt-10 sm:text-xl"
                >
                  {HERO_LINE_2}
                </motion.p>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: silk, delay: 0.85 }}
                  className="relative z-10 mt-5 max-w-md font-sans text-[13px] font-normal leading-relaxed tracking-[0.02em] text-taupe-300 sm:text-sm"
                >
                  {HERO_LINE_3}
                </motion.p>

                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={reduce ? undefined : { opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1, ease: silk }}
                  className="relative z-10 mt-10 flex flex-wrap items-center gap-8 sm:mt-14"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-taupe-200/90 to-transparent sm:w-28" />
                  <p className="max-w-xs font-sans text-[10px] font-medium uppercase tracking-[0.34em] text-taupe-200">
                    Linger into the rooms
                  </p>
                </motion.div>
              </div>

            </div>
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="pointer-events-none relative z-20 mx-auto flex justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6"
          >
            <div className="flex flex-col items-center gap-3 text-taupe-300">
              <span className="font-sans text-[9px] uppercase tracking-[0.42em]">
                Drift
              </span>
              <motion.span
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="h-12 w-px bg-gradient-to-b from-taupe-200/90 via-rose-200/50 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <section className="scroll-mt-28 border-t border-transparent py-28 safe-x sm:py-36 lg:px-10 lg:py-44">
        <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: silk }}
          className="mb-24 max-w-2xl space-y-6 sm:mb-32 sm:space-y-7"
        >
          <h2 className="font-display text-[clamp(1.875rem,5vw,2.75rem)] font-medium tracking-[-0.03em] text-softblack">
            Rooms in the apartment.
          </h2>
          <p className="font-sans text-sm leading-[1.7] text-warmgrey-400 sm:text-[15px]">
            Each doorway is a feeling first. Objects rest in small constellations
            so texture, light, and language can carry the why—not the what.
          </p>
        </motion.div>

        <div className="grid auto-rows-auto gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
          {SECTIONS.map((room, i) => {
            const tall = i % 3 === 0;
            return (
              <motion.div
                key={room.slug}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.05, ease: silk, delay: reduce ? 0 : 0.08 * i }}
                className={`lg:col-span-6 ${i % 2 === 1 ? "lg:translate-y-14" : ""} ${
                  tall ? "lg:row-span-1" : ""
                }`}
              >
                <Link
                  href={`/${room.slug}`}
                  className="group block h-full"
                >
                  <div className="glass-panel relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-[transform,box-shadow] duration-cine ease-silk active:scale-[0.992] motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-soft sm:min-h-[280px] sm:rounded-[2.25rem] sm:p-11">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.34] transition-opacity duration-cine ease-silk group-hover:opacity-50"
                      style={{
                        background:
                          "radial-gradient(80% 70% at 82% 18%, rgba(237,207,195,0.42), transparent 62%)",
                      }}
                    />
                    <div className="relative space-y-4">
                      <p className="font-sans text-[9px] font-medium uppercase tracking-[0.42em] text-taupe-300">
                        {room.ambient}
                      </p>
                      <h3 className="font-display text-[clamp(1.75rem,4.5vw,2.35rem)] font-medium tracking-[-0.03em] text-softblack">
                        {room.label}
                      </h3>
                    </div>
                    <p className="relative mt-12 max-w-sm font-editorial text-[0.9375rem] italic leading-[1.65] text-warmgrey-400 sm:mt-14 sm:text-base">
                      {room.headline}
                    </p>
                    <span className="relative mt-10 inline-flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-rose-400/95 transition-transform duration-700 ease-silk group-hover:translate-x-1">
                      <span className="h-px w-8 bg-gradient-to-r from-rose-300/80 to-transparent" aria-hidden />
                      Linger here
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        </div>
      </section>

      <div className="border-y border-taupe-100/30 bg-ivory-100/30 py-8 backdrop-blur-sm">
        <motion.div
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: isMobile ? 72 : 64,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-[200%] whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-taupe-200/95"
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup} className="flex shrink-0">
              {[
                "Touched daily",
                "Taste over noise",
                "Glass morning light",
                "Linen & quiet",
                "Scent as memory",
                "Held with intention",
              ].map((t) => (
                <span key={`${dup}-${t}`} className="px-12 sm:px-14">
                  {t}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      <section className="scroll-mt-28 safe-x py-32 sm:py-40 lg:px-10">
        <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.05, ease: silk }}
          className="mb-20 flex flex-col gap-6 sm:mb-28 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
        >
          <div className="space-y-4">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-taupe-300">
              Lately, close to me
            </p>
            <h2 className="font-display text-[clamp(1.875rem,5vw,2.75rem)] font-medium tracking-[-0.03em] text-softblack">
              What I keep reaching for.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-[1.7] text-warmgrey-400 sm:text-[15px]">
            A handful at a time—enough air between them to sense why each one
            matters.
          </p>
        </motion.div>

        {homeCurated.length > 0 ? (
        <div className="flex flex-col gap-20 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:w-[42%]">
            <ProductCard
              product={homeCurated[0]!}
              variant="featured"
              index={0}
            />
          </div>
          <div className="flex flex-1 flex-col gap-16 lg:gap-24 lg:pt-28">
            {homeCurated.slice(1).map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx + 1} />
            ))}
          </div>
        </div>
        ) : null}
        </div>
      </section>

      <footer className="safe-x safe-b border-t border-taupe-100/40 py-20 text-center sm:py-24">
        <p className="font-display text-[1.125rem] tracking-[0.22em] text-taupe-200">
          ATELIER
        </p>
        <p className="mt-4 max-w-md mx-auto font-sans text-[10px] uppercase leading-relaxed tracking-[0.42em] text-taupe-300">
          Objects lived with, not staged · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

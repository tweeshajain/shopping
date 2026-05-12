"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import type { Product } from "@/lib/types";
import type { PerfumeVibeScene } from "@/lib/perfume-vibes";
import { EditorialAffiliateLink } from "@/components/EditorialAffiliateLink";
import { silk as ease } from "@/lib/motion";

function vibeBackground(g: PerfumeVibeScene["gradient"]) {
  return `radial-gradient(ellipse 90% 70% at 75% 15%, ${g.spot} 0%, transparent 52%),
    radial-gradient(ellipse 60% 50% at 10% 80%, ${g.spot} 0%, transparent 45%),
    linear-gradient(168deg, ${g.a} 0%, ${g.b} 48%, ${g.c} 100%)`;
}

function FloatingBottle({
  product,
  index,
  total,
  mx,
  my,
  isDark,
}: {
  product: Product;
  index: number;
  total: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  isDark: boolean;
}) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 0.55 - Math.PI * 0.28;
  const radius = 28 + index * 6;
  const baseLeft = 50 + Math.cos(angle) * radius;
  const baseTop = 42 + Math.sin(angle) * (radius * 0.55);

  const parallaxX = useTransform(mx, [-0.5, 0.5], [-(12 + index * 5), 12 + index * 5]);
  const parallaxY = useTransform(my, [-0.5, 0.5], [-(10 + index * 4), 10 + index * 4]);
  const xSpring = useSpring(parallaxX, { stiffness: 38, damping: 22, mass: 0.4 });
  const ySpring = useSpring(parallaxY, { stiffness: 38, damping: 22, mass: 0.4 });

  const floatDelay = index * 0.35;

  return (
    <motion.div
      className="pointer-events-none absolute z-[5] w-[min(38vw,220px)] sm:w-[min(28vw,260px)]"
      style={{
        left: `${baseLeft}%`,
        top: `${baseTop}%`,
        x: xSpring,
        y: ySpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.86, filter: "blur(12px)" }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        opacity: { duration: 0.9, ease, delay: index * 0.12 },
        scale: { duration: 0.9, ease, delay: index * 0.12 },
        filter: { duration: 1.1, ease, delay: index * 0.12 },
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5.2 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="relative"
      >
        <motion.div
          className="relative aspect-[3/5]"
          animate={{ rotate: [-1.2, 1.2, -1.2] }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          }}
        >
        <div
          className={`absolute -inset-6 rounded-full blur-3xl ${
            isDark ? "bg-rose-400/15" : "bg-rose-200/25"
          }`}
          aria-hidden
        />
        <div
          className={`relative h-full overflow-hidden rounded-[2rem] border shadow-[0_24px_80px_-24px_rgba(0,0,0,0.35)] ${
            isDark
              ? "border-white/15 bg-white/5 shadow-black/40"
              : "border-white/50 bg-white/25 shadow-taupe-200/40"
          } backdrop-blur-md`}
        >
          <Image
            src={product.image}
            alt=""
            fill
            className="object-cover"
            sizes="260px"
          />
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
              isDark ? "from-softblack/70 via-transparent" : "from-softblack/25 via-transparent"
            } to-white/20`}
          />
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}

function VibeDock({
  scenes,
  active,
  onPick,
  isDark,
}: {
  scenes: PerfumeVibeScene[];
  active: number;
  onPick: (i: number) => void;
  isDark: boolean;
}) {
  return (
    <div className="pointer-events-auto relative z-30 mx-auto flex max-w-full justify-center px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-4 sm:pb-10">
      <div
        className={`flex max-w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-py-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2.5 [&::-webkit-scrollbar]:hidden ${
          isDark ? "border-white/10" : "border-taupe-100/30"
        }`}
        role="tablist"
        aria-label="Perfume moods"
      >
        {scenes.map((scene, i) => {
          const on = i === active;
          return (
            <button
              key={scene.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onPick(i)}
              className={`relative min-h-[52px] shrink-0 snap-center rounded-[1.35rem] border px-5 py-3.5 text-left transition-all duration-700 ease-silk active:scale-[0.98] sm:min-h-0 sm:px-5 sm:py-2.5 ${
                isDark
                  ? on
                    ? "border-white/35 bg-white/15 text-white shadow-[0_0_40px_-8px_rgba(255,255,255,0.25)]"
                    : "border-white/10 bg-white/5 text-white/45 hover:border-white/25 hover:text-white/80"
                  : on
                    ? "border-taupe-200/80 bg-white/50 text-softblack shadow-soft"
                    : "border-taupe-100/50 bg-white/25 text-taupe-300 hover:border-taupe-200 hover:text-softblack"
              }`}
            >
              <span className="block max-w-[11rem] font-display text-[0.7rem] font-medium leading-tight tracking-tight sm:text-sm">
                {scene.label}
              </span>
              {on ? (
                <motion.span
                  layoutId="vibe-glow"
                  className={`absolute inset-0 -z-10 rounded-[1.35rem] blur-md ${
                    isDark ? "bg-white/20" : "bg-rose-100/50"
                  }`}
                  transition={{ type: "spring", stiffness: 260, damping: 34 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type PerfumeMoodsInstallationProps = {
  scenes: PerfumeVibeScene[];
};

export function PerfumeMoodsInstallation({ scenes }: PerfumeMoodsInstallationProps) {
  const [active, setActive] = useState(0);
  const scene = scenes[active]!;
  const isDark = scene.tone === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      touchStartX.current = e.clientX;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch" || touchStartX.current === null) {
        touchStartX.current = null;
        return;
      }
      const dx = e.clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < 56 || scenes.length < 2) return;
      const n = scenes.length;
      setActive((i) => {
        if (dx < 0) return ((i + 1) % n + n) % n;
        return ((i - 1) % n + n) % n;
      });
    },
    [scenes.length],
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    touchStartX.current = null;
  }, [mx, my]);

  const spotlightX = useTransform(mx, [-0.5, 0.5], ["24%", "76%"]);
  const spotlightY = useTransform(my, [-0.5, 0.5], ["68%", "32%"]);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.16), transparent 64%)`;

  useEffect(() => {
    const wrap = (n: number) =>
      ((n % scenes.length) + scenes.length) % scenes.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => wrap(i + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => wrap(i - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenes.length]);

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
      className="relative min-h-dvh touch-pan-y overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-[0.04]"
        aria-hidden
      />

      <AnimatePresence mode="sync">
        <motion.div
          key={scene.id}
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.15, ease }}
          style={{ background: vibeBackground(scene.gradient) }}
        />
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
        style={{ background: spotlight }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-black/10" />

      <div className="relative z-20 flex min-h-dvh flex-col pt-[max(5.75rem,env(safe-area-inset-top)+4.5rem)] sm:pt-28">
        <header className="pointer-events-auto safe-x sm:px-10">
          <Link
            href="/"
            className={`inline-flex min-h-11 min-w-[3rem] items-center gap-2 rounded-xl py-2 font-sans text-[9px] font-medium uppercase tracking-[0.35em] transition-colors active:opacity-70 ${
              isDark ? "text-white/40 hover:text-white/85" : "text-taupe-300 hover:text-softblack"
            }`}
          >
            <span aria-hidden>←</span>
            Atelier
          </Link>
          <p
            className={`mt-8 font-sans text-[9px] font-medium uppercase tracking-[0.42em] ${
              isDark ? "text-white/35" : "text-taupe-300"
            }`}
          >
            Perfume moods · scent as atmosphere
          </p>
        </header>

        <div className="relative flex flex-1 flex-col items-center justify-center safe-x pb-10 pt-6 sm:px-10 sm:pb-12">
          <div className="relative mx-auto w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                transition={{ duration: 0.85, ease }}
                className="text-center"
              >
                <h1
                  className={`font-display text-balance text-[clamp(1.75rem,5.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] ${
                    isDark ? "text-white" : "text-softblack"
                  }`}
                >
                  {scene.label}
                </h1>
                <p
                  className={`mx-auto mt-6 max-w-xl font-editorial text-lg font-light italic leading-relaxed sm:text-xl ${
                    isDark ? "text-white/70" : "text-warmgrey-400"
                  }`}
                >
                  {scene.whisper}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Ethereal orbs */}
            <motion.div
              aria-hidden
              className={`pointer-events-none absolute left-[6%] top-[8%] h-40 w-40 rounded-full blur-3xl sm:h-52 sm:w-52 ${
                isDark ? "bg-rose-300/20" : "bg-rose-100/40"
              }`}
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className={`pointer-events-none absolute bottom-[12%] right-[4%] h-36 w-36 rounded-full blur-3xl sm:h-48 sm:w-48 ${
                isDark ? "bg-violet-300/10" : "bg-beige-200/50"
              }`}
              animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`orbit-${scene.id}`}
              className="pointer-events-none absolute inset-0 z-[4]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              {scene.products.map((p, i) => (
                <FloatingBottle
                  key={p.id}
                  product={p}
                  index={i}
                  total={scene.products.length}
                  mx={mx}
                  my={my}
                  isDark={isDark}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto mt-auto border-t border-white/10 bg-white/[0.07] backdrop-blur-2xl"
        >
          <div className="mx-auto max-w-6xl safe-x py-7 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.65, ease }}
                className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
              >
                <div className="space-y-1">
                  <p
                    className={`font-sans text-[9px] font-medium uppercase tracking-[0.35em] ${
                      isDark ? "text-white/35" : "text-taupe-300"
                    }`}
                  >
                    In this atmosphere
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {scene.products.map((p) => (
                      <div
                        key={p.id}
                        className={`rounded-2xl border px-4 py-4 sm:px-5 sm:py-3 ${
                          isDark
                            ? "border-white/15 bg-white/10"
                            : "border-taupe-100/60 bg-white/40"
                        } backdrop-blur-md`}
                      >
                        <p
                          className={`font-sans text-[8px] font-medium uppercase tracking-widest2 ${
                            isDark ? "text-white/40" : "text-taupe-300"
                          }`}
                        >
                          {p.category}
                        </p>
                        <p
                          className={`mt-1 font-display text-lg tracking-tight ${
                            isDark ? "text-white" : "text-softblack"
                          }`}
                        >
                          {p.name}
                        </p>
                        {p.mood ? (
                          <p
                            className={`mt-1 font-editorial text-sm italic ${
                              isDark ? "text-rose-200/80" : "text-rose-400"
                            }`}
                          >
                            {p.mood}
                          </p>
                        ) : null}
                        <EditorialAffiliateLink
                          href={p.affiliateLink}
                          tone={isDark ? "on-dark" : "on-light"}
                          className="mt-4 sm:mt-3"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p
                  className={`max-w-xs font-sans text-xs leading-relaxed ${
                    isDark ? "text-white/45" : "text-warmgrey-400"
                  }`}
                >
                  Use arrow keys to drift between moods. Each vibe is a room—not a
                  category.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <VibeDock
            scenes={scenes}
            active={active}
            onPick={setActive}
            isDark={isDark}
          />
        </motion.div>
      </div>

      <div className="pointer-events-none fixed bottom-28 left-1/2 z-40 hidden -translate-x-1/2 sm:block">
        <motion.div
          aria-hidden
          className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ opacity: [0.35, 0.85, 0.35], scaleX: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

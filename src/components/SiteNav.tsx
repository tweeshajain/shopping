"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { SECTIONS } from "@/lib/sections";
import { silk } from "@/lib/motion";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(237,207,195,0.22), transparent 65%)`;

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <>
      <motion.header
        animate={{ y: scrolled ? 0 : 10 }}
        transition={{ duration: 0.85, ease: silk }}
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6"
      >
        <div
          className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-[1.875rem] border px-4 py-2.5 shadow-soft transition-[background,box-shadow,border-color] duration-cine ease-silk sm:gap-5 sm:px-7 sm:py-3 ${
            scrolled
              ? "border-white/50 bg-white/42 shadow-glass backdrop-blur-2xl"
              : "border-white/32 bg-white/[0.18] backdrop-blur-xl"
          }`}
          onPointerMove={onPointerMove}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[1.875rem] opacity-90"
            style={{ background: spotlight }}
          />
          <Link
            href="/"
            className="relative z-10 flex min-h-11 min-w-[4.5rem] items-center justify-center font-display text-lg tracking-[0.2em] text-softblack sm:min-h-0 sm:min-w-0 sm:text-[1.35rem]"
          >
            ATELIER
          </Link>

          <nav
            className="relative z-10 hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {SECTIONS.map((s) => {
              const href = `/${s.slug}`;
              const active = pathname === href;
              return (
                <Link key={s.slug} href={href} className="group relative px-3.5 py-2.5">
                  <span
                    className={`font-sans text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-500 ease-silk ${
                      active ? "text-softblack" : "text-taupe-300 group-hover:text-softblack"
                    }`}
                  >
                    {s.label}
                  </span>
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 bottom-1.5 h-px bg-gradient-to-r from-transparent via-rose-200/90 to-transparent"
                      transition={{ type: "spring", stiffness: 320, damping: 42 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="relative z-10 flex h-11 min-h-11 w-11 min-w-11 shrink-0 items-center justify-center rounded-2xl border border-white/45 bg-white/28 text-softblack backdrop-blur-md transition-[transform,opacity] duration-500 ease-silk active:scale-[0.96] active:opacity-90 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
                className="block h-px w-5 bg-softblack"
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                className="block h-px w-5 bg-softblack"
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
                className="block h-px w-5 bg-softblack"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: silk }}
            className="fixed inset-0 z-40 touch-manipulation overscroll-contain bg-ivory-50/[0.97] backdrop-blur-2xl md:hidden"
          >
            <nav
              className="flex h-full max-h-dvh flex-col justify-center overflow-y-auto overscroll-y-contain px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(4.5rem,env(safe-area-inset-top))]"
              aria-label="Mobile primary"
            >
              <Link
                href="/"
                className="mb-8 flex min-h-12 items-center font-display text-3xl tracking-tight text-softblack active:opacity-70"
              >
                Home
              </Link>
              {SECTIONS.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: 0.08 * i, duration: 0.62, ease: silk }}
                >
                  <Link
                    href={`/${s.slug}`}
                    className="flex min-h-[52px] items-center border-b border-taupe-100/35 py-5 pl-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-taupe-300 transition-colors duration-500 ease-silk active:bg-white/35 active:text-softblack"
                  >
                    {s.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

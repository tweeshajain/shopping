import Link from "next/link";

export default function NotFound() {
  return (
    <div className="safe-x flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-taupe-300">
        404
      </p>
      <h1 className="mt-6 max-w-md font-display text-[clamp(1.75rem,5vw,2.5rem)] font-medium tracking-[-0.03em] text-softblack">
        This room does not exist.
      </h1>
      <p className="mt-6 max-w-sm font-editorial text-base italic leading-relaxed text-warmgrey-400 sm:text-lg">
        The corridor ends in quiet—return to the apartment.
      </p>
      <Link
        href="/"
        className="mt-12 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-rose-400/95 underline-offset-[6px] transition-opacity duration-500 ease-silk hover:underline hover:opacity-90"
      >
        Back home
      </Link>
    </div>
  );
}

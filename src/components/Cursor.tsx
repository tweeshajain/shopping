"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role=button]")) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role=button]")) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: hovering ? 32 : 12,
          height: hovering ? 32 : 12,
          backgroundColor: hovering ? "rgba(181,41,78,0.15)" : "rgba(181,41,78,0.55)",
          border: hovering ? "1px solid rgba(181,41,78,0.5)" : "1px solid transparent",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-full mix-blend-multiply"
      />
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Revela o conteudo com fade + deslocamento quando entra na viewport.
 * direction: up | down | left | right | none
 */
export default function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  amount = 0.25,
  className = "",
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction];

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, ...offset };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

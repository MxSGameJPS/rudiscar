"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Container que revela os filhos em cascata.
 * Use <StaggerItem> para cada filho animado.
 */
export function Stagger({
  children,
  as = "div",
  className = "",
  stagger = 0.12,
  delayChildren = 0.05,
  once = true,
  amount = 0.2,
  ...props
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className = "",
  distance = 36,
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  const variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag className={className} variants={variants} {...props}>
      {children}
    </MotionTag>
  );
}

"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  scale?: number;
};

/** Aparición elegante al hacer scroll con Framer Motion. */
export function Reveal({ delay = 0, y = 28, scale = 0.98, children, className = "", ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = HTMLMotionProps<"li"> & {
  delay?: number;
  y?: number;
  scale?: number;
};

/** Igual que Reveal pero para elementos de lista <li>. */
export function RevealItem({ delay = 0, y = 20, scale = 0.97, children, className = "", ...rest }: RevealItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.li>
  );
}

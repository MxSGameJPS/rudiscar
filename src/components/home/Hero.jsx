"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ShieldCheck, Star, Wrench, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

const HERO_IMG =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Parallax: a imagem se move mais devagar que o scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 34 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section ref={ref} className={styles.hero}>
      {/* Imagem de fundo com Ken Burns + parallax */}
      <motion.div
        className={styles.bg}
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        aria-hidden="true"
      >
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`${styles.bgImg} ${reduce ? "" : styles.kenburns}`}
        />
      </motion.div>

      {/* Camadas de escurecimento e brilho */}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <motion.div
        className={`container ${styles.inner}`}
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrow} variants={item}>
            <span className={styles.dot} /> Oficina + Revenda de confiança
          </motion.span>

          <motion.h1 className={styles.title} variants={item}>
            Seu carro em
            <span className={styles.highlight}> boas mãos</span>,
            <br />
            do motor à direção.
          </motion.h1>

          <motion.p className={styles.subtitle} variants={item}>
            Mecânica automotiva completa e os melhores veículos seminovos com
            procedência. Qualidade, transparência e paixão por carros em cada
            serviço.
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <Button href="/veiculos" size="lg" variant="primary">
              Ver veículos à venda
            </Button>
            <Button href="/#servicos" size="lg" variant="outline">
              Nossos serviços
            </Button>
          </motion.div>

          <motion.ul className={styles.trust} variants={item}>
            <li>
              <ShieldCheck size={18} /> Peças com garantia
            </li>
            <li>
              <Wrench size={18} /> Diagnóstico preciso
            </li>
            <li>
              <Star size={18} /> Nota 4.9 pelos clientes
            </li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <span>Role para explorar</span>
        <ChevronDown size={18} className={styles.scrollArrow} />
      </motion.div>
    </section>
  );
}

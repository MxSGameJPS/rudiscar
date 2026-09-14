"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Galeria.module.css";

const FALLBACK =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=70";

export default function Galeria({ imagens = [], titulo = "Veículo" }) {
  const fotos = imagens.length ? imagens : [FALLBACK];
  const [ativa, setAtiva] = useState(0);

  const prev = () => setAtiva((i) => (i - 1 + fotos.length) % fotos.length);
  const next = () => setAtiva((i) => (i + 1) % fotos.length);

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <Image
          key={ativa}
          src={fotos[ativa]}
          alt={`${titulo} - foto ${ativa + 1}`}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.mainImg}
        />

        {fotos.length > 1 && (
          <>
            <button
              className={`${styles.nav} ${styles.navPrev}`}
              onClick={prev}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className={`${styles.nav} ${styles.navNext}`}
              onClick={next}
              aria-label="Próxima foto"
            >
              <ChevronRight size={22} />
            </button>
            <span className={styles.counter}>
              {ativa + 1}/{fotos.length}
            </span>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className={styles.thumbs}>
          {fotos.map((f, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === ativa ? styles.thumbActive : ""}`}
              onClick={() => setAtiva(i)}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image
                src={f}
                alt={`Miniatura ${i + 1}`}
                fill
                sizes="120px"
                className={styles.thumbImg}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

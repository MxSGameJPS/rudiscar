import { Check } from "lucide-react";
import Image from "next/image";
import { DIFERENCIAIS } from "@/lib/config";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/motion/Stagger";
import styles from "./Sobre.module.css";

const PONTOS = [
  "Profissionais qualificados e apaixonados por carros",
  "Orçamento transparente, sem surpresas",
  "Peças originais e de primeira linha",
  "Veículos revisados antes da venda",
];

export default function Sobre() {
  return (
    <section id="sobre" className={`section ${styles.wrap}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.media} direction="right">
          <div className={styles.imageBox}>
            <Image
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=900&q=70"
              alt="Mecânico trabalhando em um veículo na oficina Rudi's Car"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.sobreImg}
            />
          </div>
          <div className={styles.floatCard}>
            <span className={styles.floatNum}>15+</span>
            <span className={styles.floatLabel}>anos cuidando de carros</span>
          </div>
        </Reveal>

        <Reveal className={styles.content} direction="left" delay={0.1}>
          <span className={styles.tag}>Sobre a Rudi&apos;s Car</span>
          <h2 className={styles.title}>
            Tradição, confiança e paixão sobre <span>quatro rodas</span>
          </h2>
          <p className={styles.text}>
            A Rudi&apos;s Car nasceu do amor por automóveis e do compromisso em
            oferecer um atendimento honesto. Unimos uma oficina mecânica
            completa a uma revenda de veículos selecionados, para que você
            encontre tudo em um só lugar — com a segurança de quem entende do
            assunto.
          </p>

          <ul className={styles.list}>
            {PONTOS.map((p) => (
              <li key={p}>
                <span className={styles.check}>
                  <Check size={14} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <Button href="/veiculos" variant="primary" size="lg">
            Conheça nosso estoque
          </Button>
        </Reveal>
      </div>

      <div className="container">
        <Stagger className={styles.stats}>
          {DIFERENCIAIS.map((d) => (
            <StaggerItem key={d.label} className={styles.stat}>
              <span className={styles.statNum}>{d.valor}</span>
              <span className={styles.statLabel}>{d.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}


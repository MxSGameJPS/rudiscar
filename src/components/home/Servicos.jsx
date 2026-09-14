import {
  Wrench,
  Gauge,
  Disc3,
  Battery,
  Snowflake,
  Droplets,
} from "lucide-react";
import { SERVICOS } from "@/lib/config";
import Reveal from "@/components/ui/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/motion/Stagger";
import styles from "./Servicos.module.css";

const ICONS = { Wrench, Gauge, Disc3, Battery, Snowflake, Droplets };

export default function Servicos() {
  return (
    <section id="servicos" className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className={styles.tag}>O que fazemos</span>
          <h2 className={styles.title}>
            Serviços de mecânica <span>completa</span>
          </h2>
          <p className={styles.sub}>
            Da revisão preventiva ao reparo complexo, cuidamos do seu veículo
            com equipamentos modernos e profissionais experientes.
          </p>
        </Reveal>

        <Stagger className={styles.grid}>
          {SERVICOS.map((s) => {
            const Icon = ICONS[s.icon] || Wrench;
            return (
              <StaggerItem key={s.titulo} as="article" className={styles.card}>
                <div className={styles.icon}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className={styles.cardTitle}>{s.titulo}</h3>
                <p className={styles.cardDesc}>{s.descricao}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}


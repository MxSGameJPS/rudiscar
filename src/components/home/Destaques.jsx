import { listarDestaques } from "@/services/veiculos";
import VeiculoCard from "@/components/veiculos/VeiculoCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/motion/Stagger";
import styles from "./Destaques.module.css";

export default async function Destaques() {
  let veiculos = [];
  try {
    veiculos = await listarDestaques(6);
  } catch {
    veiculos = [];
  }

  if (!veiculos.length) return null;

  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal className={styles.head}>
          <div>
            <span className={styles.tag}>Estoque selecionado</span>
            <h2 className={styles.title}>
              Veículos em <span>destaque</span>
            </h2>
          </div>
          <Button href="/veiculos" variant="outline">
            Ver todos
          </Button>
        </Reveal>

        <Stagger className={styles.grid}>
          {veiculos.map((v) => (
            <StaggerItem key={v.id}>
              <VeiculoCard veiculo={v} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}


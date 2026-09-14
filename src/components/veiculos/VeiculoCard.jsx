import Link from "next/link";
import Image from "next/image";
import { Gauge, Calendar, Fuel, Settings2 } from "lucide-react";
import { formatCurrency, formatKm, formatAno } from "@/lib/format";
import styles from "./VeiculoCard.module.css";

export default function VeiculoCard({ veiculo }) {
  const capa =
    veiculo.imagem_capa ||
    veiculo.imagens?.[0] ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=70";

  return (
    <Link href={`/veiculos/${veiculo.id}`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={capa}
          alt={`${veiculo.marca} ${veiculo.modelo}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.img}
        />
        {veiculo.destaque && <span className={styles.badge}>Destaque</span>}
        {veiculo.vendido && <span className={styles.sold}>Vendido</span>}
        <div className={styles.gradient} />
      </div>

      <div className={styles.body}>
        <div className={styles.headline}>
          <h3 className={styles.title}>
            {veiculo.marca} {veiculo.modelo}
          </h3>
          {veiculo.versao && <p className={styles.versao}>{veiculo.versao}</p>}
        </div>

        <ul className={styles.specs}>
          <li>
            <Calendar size={15} />
            {formatAno(veiculo.ano_fabricacao, veiculo.ano_modelo)}
          </li>
          <li>
            <Gauge size={15} />
            {formatKm(veiculo.quilometragem)}
          </li>
          {veiculo.cambio && (
            <li>
              <Settings2 size={15} />
              {veiculo.cambio}
            </li>
          )}
          {veiculo.combustivel && (
            <li>
              <Fuel size={15} />
              {veiculo.combustivel}
            </li>
          )}
        </ul>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceLabel}>Por</span>
            {formatCurrency(veiculo.preco)}
          </div>
          <span className={styles.view}>Ver detalhes →</span>
        </div>
      </div>
    </Link>
  );
}

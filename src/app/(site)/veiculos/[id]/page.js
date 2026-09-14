import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  DoorOpen,
  Check,
  MessageCircle,
  Phone,
} from "lucide-react";
import { buscarVeiculo } from "@/services/veiculos";
import { SITE } from "@/lib/config";
import {
  formatCurrency,
  formatKm,
  formatAno,
  whatsappVeiculoUrl,
} from "@/lib/format";
import Galeria from "@/components/veiculos/Galeria";
import Button from "@/components/ui/Button";
import styles from "./detalhe.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const v = await buscarVeiculo(id).catch(() => null);
  if (!v) return { title: "Veículo não encontrado" };
  return {
    title: `${v.marca} ${v.modelo} ${formatAno(v.ano_fabricacao, v.ano_modelo)}`,
    description: v.descricao || `${v.marca} ${v.modelo} à venda na Rudi's Car.`,
  };
}

export default async function VeiculoDetalhe({ params }) {
  const { id } = await params;
  let veiculo;
  try {
    veiculo = await buscarVeiculo(id);
  } catch {
    veiculo = null;
  }
  if (!veiculo) notFound();

  const ficha = [
    { icon: Calendar, label: "Ano", valor: formatAno(veiculo.ano_fabricacao, veiculo.ano_modelo) },
    { icon: Gauge, label: "Quilometragem", valor: formatKm(veiculo.quilometragem) },
    { icon: Settings2, label: "Câmbio", valor: veiculo.cambio },
    { icon: Fuel, label: "Combustível", valor: veiculo.combustivel },
    { icon: Palette, label: "Cor", valor: veiculo.cor },
    { icon: DoorOpen, label: "Portas", valor: veiculo.portas ? `${veiculo.portas} portas` : null },
  ].filter((f) => f.valor);

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/veiculos" className={styles.back}>
          <ArrowLeft size={18} /> Voltar ao estoque
        </Link>

        <div className={styles.layout}>
          <div className={styles.left}>
            <Galeria
              imagens={veiculo.imagens}
              titulo={`${veiculo.marca} ${veiculo.modelo}`}
            />

            {veiculo.descricao && (
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>Descrição</h2>
                <p className={styles.desc}>{veiculo.descricao}</p>
              </section>
            )}

            {veiculo.opcionais?.length > 0 && (
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>Opcionais</h2>
                <ul className={styles.opcionais}>
                  {veiculo.opcionais.map((o) => (
                    <li key={o}>
                      <Check size={15} strokeWidth={3} /> {o}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              {veiculo.destaque && <span className={styles.badge}>Destaque</span>}
              <h1 className={styles.title}>
                {veiculo.marca} {veiculo.modelo}
              </h1>
              {veiculo.versao && <p className={styles.versao}>{veiculo.versao}</p>}

              <div className={styles.price}>{formatCurrency(veiculo.preco)}</div>

              <ul className={styles.ficha}>
                {ficha.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.label}>
                      <span className={styles.fichaIcon}>
                        <Icon size={18} />
                      </span>
                      <span className={styles.fichaLabel}>{f.label}</span>
                      <span className={styles.fichaValor}>{f.valor}</span>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.actions}>
                <Button
                  href={whatsappVeiculoUrl(SITE.whatsapp, veiculo)}
                  external
                  variant="primary"
                  size="lg"
                >
                  <MessageCircle size={18} /> Tenho interesse
                </Button>
                <Button href={`tel:+${SITE.whatsapp}`} variant="outline" size="lg">
                  <Phone size={18} /> {SITE.telefone}
                </Button>
              </div>

              <p className={styles.note}>
                Atendimento de {SITE.horario}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

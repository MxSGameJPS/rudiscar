import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { atualizarVeiculo } from "@/app/painel/actions";
import { buscarVeiculo } from "@/services/veiculos";
import VeiculoForm from "@/components/painel/VeiculoForm";
import styles from "../painel.module.css";

export const metadata = { title: "Editar veículo" };
export const dynamic = "force-dynamic";

export default async function EditarVeiculoPage({ params }) {
  const { id } = await params;
  let veiculo;
  try {
    veiculo = await buscarVeiculo(id);
  } catch {
    veiculo = null;
  }
  if (!veiculo) notFound();

  // Bind do id na server action
  const action = atualizarVeiculo.bind(null, id);

  return (
    <div>
      <Link href="/painel" className={styles.backLink}>
        <ArrowLeft size={16} /> Voltar
      </Link>
      <h1 className={styles.title} style={{ marginBottom: 24 }}>
        Editar: {veiculo.marca} {veiculo.modelo}
      </h1>
      <VeiculoForm action={action} veiculo={veiculo} />
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { criarVeiculo } from "@/app/painel/actions";
import VeiculoForm from "@/components/painel/VeiculoForm";
import styles from "../painel.module.css";

export const metadata = { title: "Novo veículo" };

export default function NovoVeiculoPage() {
  return (
    <div>
      <Link href="/painel" className={styles.backLink}>
        <ArrowLeft size={16} /> Voltar
      </Link>
      <h1 className={styles.title} style={{ marginBottom: 24 }}>
        Adicionar veículo
      </h1>
      <VeiculoForm action={criarVeiculo} />
    </div>
  );
}

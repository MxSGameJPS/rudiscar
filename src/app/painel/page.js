import Link from "next/link";
import { PlusCircle, CarFront } from "lucide-react";
import { listarTodosVeiculos } from "@/services/veiculos";
import VeiculoRow from "@/components/painel/VeiculoRow";
import styles from "./painel.module.css";

export const dynamic = "force-dynamic";

export default async function PainelHome({ searchParams }) {
  const sp = await searchParams;
  let veiculos = [];
  let erro = null;
  try {
    veiculos = await listarTodosVeiculos();
  } catch (e) {
    erro = e.message;
  }

  const totais = {
    total: veiculos.length,
    disponiveis: veiculos.filter((v) => !v.vendido).length,
    destaques: veiculos.filter((v) => v.destaque).length,
    vendidos: veiculos.filter((v) => v.vendido).length,
  };

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Veículos</h1>
          <p className={styles.sub}>Gerencie o estoque da revenda.</p>
        </div>
        <Link href="/painel/novo" className={styles.addBtn}>
          <PlusCircle size={18} /> Adicionar veículo
        </Link>
      </header>

      {sp?.msg && (
        <div className={styles.toast}>
          {sp.msg === "criado" && "Veículo cadastrado com sucesso!"}
          {sp.msg === "atualizado" && "Veículo atualizado com sucesso!"}
        </div>
      )}

      <div className={styles.stats}>
        <Stat label="Total" valor={totais.total} />
        <Stat label="Disponíveis" valor={totais.disponiveis} />
        <Stat label="Destaques" valor={totais.destaques} />
        <Stat label="Vendidos" valor={totais.vendidos} />
      </div>

      {erro ? (
        <div className={styles.empty}>
          <CarFront size={44} />
          <h3>Erro ao carregar</h3>
          <p>Verifique as credenciais do Supabase no arquivo .env.local.</p>
          <code className={styles.code}>{erro}</code>
        </div>
      ) : veiculos.length === 0 ? (
        <div className={styles.empty}>
          <CarFront size={44} />
          <h3>Nenhum veículo cadastrado</h3>
          <p>Comece adicionando o primeiro veículo ao estoque.</p>
          <Link href="/painel/novo" className={styles.addBtn}>
            <PlusCircle size={18} /> Adicionar veículo
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {veiculos.map((v) => (
            <VeiculoRow key={v.id} veiculo={v} />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, valor }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statNum}>{valor}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

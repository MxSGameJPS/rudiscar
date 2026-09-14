import { Suspense } from "react";
import { CarFront } from "lucide-react";
import { listarVeiculos, listarMarcas } from "@/services/veiculos";
import VeiculoCard from "@/components/veiculos/VeiculoCard";
import Filtros from "@/components/veiculos/Filtros";
import styles from "./veiculos.module.css";

export const metadata = {
  title: "Veículos à Venda",
  description:
    "Confira nosso estoque de veículos seminovos com procedência. Encontre o carro ideal na Rudi's Car.",
};

export const dynamic = "force-dynamic";

export default async function VeiculosPage({ searchParams }) {
  const sp = await searchParams;
  const filtros = {
    busca: sp.busca,
    marca: sp.marca,
    combustivel: sp.combustivel,
    cambio: sp.cambio,
    precoMin: sp.precoMin,
    precoMax: sp.precoMax,
    anoMin: sp.anoMin,
    ordenar: sp.ordenar,
  };

  let veiculos = [];
  let marcas = [];
  let erro = null;

  try {
    [veiculos, marcas] = await Promise.all([
      listarVeiculos(filtros),
      listarMarcas(),
    ]);
  } catch (e) {
    erro = e.message;
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container">
          <span className={styles.tag}>Estoque</span>
          <h1 className={styles.title}>Veículos à venda</h1>
          <p className={styles.sub}>
            Seminovos revisados e com procedência. Use os filtros para encontrar
            o carro ideal para você.
          </p>
        </div>
      </header>

      <div className="container">
        <Suspense fallback={<div className={styles.loading}>Carregando filtros…</div>}>
          <Filtros marcas={marcas} />
        </Suspense>

        {erro ? (
          <div className={styles.empty}>
            <CarFront size={48} />
            <h3>Não foi possível carregar o estoque</h3>
            <p>Verifique a conexão com o banco de dados e tente novamente.</p>
          </div>
        ) : veiculos.length === 0 ? (
          <div className={styles.empty}>
            <CarFront size={48} />
            <h3>Nenhum veículo encontrado</h3>
            <p>Ajuste os filtros ou volte em breve — nosso estoque é atualizado com frequência.</p>
          </div>
        ) : (
          <>
            <p className={styles.count}>
              {veiculos.length}{" "}
              {veiculos.length === 1 ? "veículo encontrado" : "veículos encontrados"}
            </p>
            <div className={styles.grid}>
              {veiculos.map((v) => (
                <VeiculoCard key={v.id} veiculo={v} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

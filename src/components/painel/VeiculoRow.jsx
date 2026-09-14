"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Star, Eye, EyeOff, Loader2 } from "lucide-react";
import { removerVeiculo, alternarVendido } from "@/app/painel/actions";
import { formatCurrency, formatKm, formatAno } from "@/lib/format";
import styles from "./VeiculoRow.module.css";

const FALLBACK =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=60";

export default function VeiculoRow({ veiculo }) {
  const [pending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);
  const capa = veiculo.imagem_capa || veiculo.imagens?.[0] || FALLBACK;

  function handleDelete() {
    startTransition(async () => {
      await removerVeiculo(veiculo.id);
      setConfirm(false);
    });
  }

  function toggleVendido() {
    startTransition(async () => {
      await alternarVendido(veiculo.id, !veiculo.vendido);
    });
  }

  return (
    <div className={`${styles.row} ${veiculo.vendido ? styles.sold : ""}`}>
      <div className={styles.thumb}>
        <Image src={capa} alt={veiculo.modelo} fill sizes="80px" className={styles.img} />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          {veiculo.marca} {veiculo.modelo}
          {veiculo.destaque && (
            <span className={styles.tag}>
              <Star size={11} /> Destaque
            </span>
          )}
          {veiculo.vendido && <span className={styles.soldTag}>Vendido</span>}
        </div>
        <div className={styles.meta}>
          {formatAno(veiculo.ano_fabricacao, veiculo.ano_modelo)} ·{" "}
          {formatKm(veiculo.quilometragem)}
          {veiculo.cambio ? ` · ${veiculo.cambio}` : ""}
        </div>
      </div>

      <div className={styles.price}>{formatCurrency(veiculo.preco)}</div>

      <div className={styles.actions}>
        <button
          onClick={toggleVendido}
          disabled={pending}
          className={styles.iconBtn}
          title={veiculo.vendido ? "Marcar como disponível" : "Marcar como vendido"}
        >
          {veiculo.vendido ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
        <Link href={`/painel/${veiculo.id}`} className={styles.iconBtn} title="Editar">
          <Pencil size={17} />
        </Link>
        <button
          onClick={() => setConfirm(true)}
          className={`${styles.iconBtn} ${styles.danger}`}
          title="Remover"
          disabled={pending}
        >
          <Trash2 size={17} />
        </button>
      </div>

      {confirm && (
        <div className={styles.confirm}>
          <span>Remover este veículo?</span>
          <button onClick={handleDelete} disabled={pending} className={styles.confirmYes}>
            {pending ? <Loader2 size={15} className={styles.spin} /> : "Sim, remover"}
          </button>
          <button onClick={() => setConfirm(false)} className={styles.confirmNo}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

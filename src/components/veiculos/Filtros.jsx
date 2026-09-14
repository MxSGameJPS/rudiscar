"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CAMBIOS, COMBUSTIVEIS } from "@/lib/config";
import styles from "./Filtros.module.css";

export default function Filtros({ marcas = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const get = (k) => params.get(k) || "";

  function aplicar(patch) {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v) next.set(k, v);
      else next.delete(k);
    });
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    aplicar({
      busca: fd.get("busca"),
      marca: fd.get("marca"),
      combustivel: fd.get("combustivel"),
      cambio: fd.get("cambio"),
      precoMin: fd.get("precoMin"),
      precoMax: fd.get("precoMax"),
      anoMin: fd.get("anoMin"),
      ordenar: fd.get("ordenar"),
    });
    setOpen(false);
  }

  function limpar() {
    router.push(pathname, { scroll: false });
  }

  const temFiltro = Array.from(params.keys()).length > 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <form onSubmit={onSubmit} className={styles.searchForm}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="search"
            name="busca"
            defaultValue={get("busca")}
            placeholder="Buscar por marca, modelo ou versão..."
            className={styles.search}
          />
          <button type="submit" className={styles.searchBtn}>
            Buscar
          </button>
        </form>

        <div className={styles.controls}>
          <select
            name="ordenar"
            defaultValue={get("ordenar")}
            onChange={(e) => aplicar({ ordenar: e.target.value })}
            className={styles.select}
            aria-label="Ordenar"
          >
            <option value="">Mais recentes</option>
            <option value="preco_asc">Menor preço</option>
            <option value="preco_desc">Maior preço</option>
            <option value="ano_desc">Ano mais novo</option>
            <option value="km_asc">Menor km</option>
          </select>

          <button
            className={styles.toggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            <SlidersHorizontal size={18} /> Filtros
          </button>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
      >
        <div className={styles.field}>
          <label>Marca</label>
          <select name="marca" defaultValue={get("marca")}>
            <option value="">Todas</option>
            {marcas.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Câmbio</label>
          <select name="cambio" defaultValue={get("cambio")}>
            <option value="">Todos</option>
            {CAMBIOS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Combustível</label>
          <select name="combustivel" defaultValue={get("combustivel")}>
            <option value="">Todos</option>
            {COMBUSTIVEIS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Ano a partir de</label>
          <input
            type="number"
            name="anoMin"
            defaultValue={get("anoMin")}
            placeholder="Ex: 2018"
            min="1980"
            max="2030"
          />
        </div>

        <div className={styles.field}>
          <label>Preço mínimo</label>
          <input
            type="number"
            name="precoMin"
            defaultValue={get("precoMin")}
            placeholder="R$"
            min="0"
            step="1000"
          />
        </div>

        <div className={styles.field}>
          <label>Preço máximo</label>
          <input
            type="number"
            name="precoMax"
            defaultValue={get("precoMax")}
            placeholder="R$"
            min="0"
            step="1000"
          />
        </div>

        <div className={styles.panelActions}>
          <button type="submit" className={styles.apply}>
            Aplicar filtros
          </button>
          {temFiltro && (
            <button type="button" onClick={limpar} className={styles.clear}>
              <X size={16} /> Limpar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

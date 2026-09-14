"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, Loader2 } from "lucide-react";
import { CAMBIOS, COMBUSTIVEIS, CORES, OPCIONAIS_COMUNS } from "@/lib/config";
import ImageUploader from "./ImageUploader";
import styles from "./VeiculoForm.module.css";

/**
 * Formulario de criacao/edicao de veiculo.
 * action: server action que recebe FormData.
 */
export default function VeiculoForm({ action, veiculo = null }) {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagens, setImagens] = useState(veiculo?.imagens || []);

  const anoAtual = new Date().getFullYear();
  const v = veiculo || {};

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set("imagens", JSON.stringify(imagens));
    const res = await action(fd);
    if (res && res.ok === false) {
      setErro(res.error || "Erro ao salvar. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Fotos do veículo</h3>
        <ImageUploader value={imagens} onChange={setImagens} />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Dados principais</h3>
        <div className={styles.grid}>
          <Field label="Marca *">
            <input name="marca" defaultValue={v.marca} required placeholder="Ex: Volkswagen" />
          </Field>
          <Field label="Modelo *">
            <input name="modelo" defaultValue={v.modelo} required placeholder="Ex: Golf" />
          </Field>
          <Field label="Versão" full>
            <input name="versao" defaultValue={v.versao || ""} placeholder="Ex: 1.4 TSI Highline" />
          </Field>

          <Field label="Ano fabricação *">
            <input type="number" name="ano_fabricacao" defaultValue={v.ano_fabricacao} required min="1980" max={anoAtual + 1} placeholder={String(anoAtual)} />
          </Field>
          <Field label="Ano modelo *">
            <input type="number" name="ano_modelo" defaultValue={v.ano_modelo} required min="1980" max={anoAtual + 2} placeholder={String(anoAtual)} />
          </Field>
          <Field label="Quilometragem *">
            <input type="number" name="quilometragem" defaultValue={v.quilometragem ?? 0} required min="0" placeholder="Ex: 45000" />
          </Field>

          <Field label="Preço (R$) *">
            <input type="number" name="preco" defaultValue={v.preco} required min="0" step="100" placeholder="Ex: 89900" />
          </Field>
          <Field label="Câmbio">
            <select name="cambio" defaultValue={v.cambio || ""}>
              <option value="">Selecione</option>
              {CAMBIOS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Combustível">
            <select name="combustivel" defaultValue={v.combustivel || ""}>
              <option value="">Selecione</option>
              {COMBUSTIVEIS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Cor">
            <select name="cor" defaultValue={v.cor || ""}>
              <option value="">Selecione</option>
              {CORES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Portas">
            <input type="number" name="portas" defaultValue={v.portas || ""} min="2" max="5" placeholder="Ex: 4" />
          </Field>
          <Field label="Final da placa">
            <input name="placa_final" defaultValue={v.placa_final || ""} maxLength="1" placeholder="0-9" />
          </Field>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Descrição</h3>
        <Field>
          <textarea
            name="descricao"
            defaultValue={v.descricao || ""}
            rows={5}
            placeholder="Detalhes sobre o estado do veículo, histórico, garantia, etc."
          />
        </Field>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Opcionais</h3>
        <div className={styles.opcionais}>
          {OPCIONAIS_COMUNS.map((o) => (
            <label key={o} className={styles.checkbox}>
              <input
                type="checkbox"
                name="opcionais"
                value={o}
                defaultChecked={v.opcionais?.includes(o)}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Status</h3>
        <div className={styles.switches}>
          <label className={styles.switch}>
            <input type="checkbox" name="destaque" defaultChecked={v.destaque} />
            <span>Marcar como destaque</span>
          </label>
          <label className={styles.switch}>
            <input type="checkbox" name="vendido" defaultChecked={v.vendido} />
            <span>Veículo vendido</span>
          </label>
        </div>
      </div>

      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={18} className={styles.spin} /> Salvando…
            </>
          ) : (
            <>
              <Save size={18} /> {veiculo ? "Salvar alterações" : "Cadastrar veículo"}
            </>
          )}
        </button>
        <Link href="/painel" className={styles.cancel}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}

function Field({ label, children, full }) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ""}`}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

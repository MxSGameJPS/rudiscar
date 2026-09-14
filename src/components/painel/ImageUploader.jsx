"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Star, GripVertical } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./ImageUploader.module.css";

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "veiculos";

export default function ImageUploader({ value = [], onChange }) {
  const [imagens, setImagens] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [erro, setErro] = useState("");
  const inputRef = useRef(null);
  const dragIndex = useRef(null);

  function update(next) {
    setImagens(next);
    onChange?.(next);
  }

  async function handleFiles(files) {
    setErro("");
    const lista = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!lista.length) return;

    setUploading(true);
    const supabase = createClient();
    const novas = [];

    for (const file of lista) {
      const ext = file.name.split(".").pop();
      const nome = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(nome, file, { cacheControl: "3600", upsert: false });

      if (error) {
        setErro(`Falha no upload: ${error.message}`);
        continue;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(nome);
      if (data?.publicUrl) novas.push(data.publicUrl);
    }

    update([...imagens, ...novas]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function remover(url) {
    const next = imagens.filter((u) => u !== url);
    update(next);
    // Remove do storage (best-effort)
    try {
      const marker = `/object/public/${BUCKET}/`;
      const idx = url.indexOf(marker);
      if (idx !== -1) {
        const path = decodeURIComponent(url.slice(idx + marker.length));
        const supabase = createClient();
        await supabase.storage.from(BUCKET).remove([path]);
      }
    } catch {
      /* ignore */
    }
  }

  function definirCapa(index) {
    if (index === 0) return;
    const next = [...imagens];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    update(next);
  }

  function onDrop(index) {
    const from = dragIndex.current;
    if (from === null || from === index) return;
    const next = [...imagens];
    const [item] = next.splice(from, 1);
    next.splice(index, 0, item);
    update(next);
    dragIndex.current = null;
  }

  return (
    <div className={styles.wrap}>
      <input type="hidden" name="imagens" value={JSON.stringify(imagens)} />

      <div
        className={styles.dropzone}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <>
            <Loader2 size={30} className={styles.spin} />
            <p>Enviando imagens…</p>
          </>
        ) : (
          <>
            <UploadCloud size={30} />
            <p>
              <strong>Clique para enviar</strong> ou arraste as imagens aqui
            </p>
            <span>PNG, JPG ou WEBP · a primeira imagem é a capa</span>
          </>
        )}
      </div>

      {erro && <p className={styles.erro}>{erro}</p>}

      {imagens.length > 0 && (
        <div className={styles.grid}>
          {imagens.map((url, i) => (
            <div
              key={url}
              className={`${styles.thumb} ${i === 0 ? styles.capa : ""}`}
              draggable
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
            >
              <Image src={url} alt={`Imagem ${i + 1}`} fill sizes="160px" className={styles.thumbImg} />
              <span className={styles.drag}>
                <GripVertical size={16} />
              </span>
              {i === 0 && <span className={styles.capaTag}>Capa</span>}
              <div className={styles.thumbActions}>
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => definirCapa(i)}
                    title="Definir como capa"
                  >
                    <Star size={15} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remover(url)}
                  title="Remover"
                  className={styles.del}
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

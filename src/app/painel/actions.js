"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "veiculos";

/** Garante que ha usuario autenticado antes de qualquer escrita. */
async function requireUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

function parseVeiculo(formData) {
  const opcionais = formData.getAll("opcionais").filter(Boolean);
  const imagens = JSON.parse(formData.get("imagens") || "[]");

  return {
    marca: (formData.get("marca") || "").trim(),
    modelo: (formData.get("modelo") || "").trim(),
    versao: (formData.get("versao") || "").trim() || null,
    ano_fabricacao: Number(formData.get("ano_fabricacao")) || null,
    ano_modelo: Number(formData.get("ano_modelo")) || null,
    quilometragem: Number(formData.get("quilometragem")) || 0,
    preco: Number(formData.get("preco")) || 0,
    cambio: (formData.get("cambio") || "").trim() || null,
    combustivel: (formData.get("combustivel") || "").trim() || null,
    cor: (formData.get("cor") || "").trim() || null,
    portas: Number(formData.get("portas")) || null,
    placa_final: (formData.get("placa_final") || "").trim() || null,
    descricao: (formData.get("descricao") || "").trim() || null,
    opcionais,
    imagens,
    imagem_capa: imagens[0] || null,
    destaque: formData.get("destaque") === "on",
    vendido: formData.get("vendido") === "on",
  };
}

export async function criarVeiculo(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const payload = parseVeiculo(formData);
  const { error } = await supabase.from("veiculos").insert(payload);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/painel");
  revalidatePath("/veiculos");
  redirect("/painel?msg=criado");
}

export async function atualizarVeiculo(id, formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const payload = parseVeiculo(formData);
  const { error } = await supabase
    .from("veiculos")
    .update(payload)
    .eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/painel");
  revalidatePath("/veiculos");
  revalidatePath(`/veiculos/${id}`);
  redirect("/painel?msg=atualizado");
}

export async function removerVeiculo(id) {
  const supabase = await createClient();
  await requireUser(supabase);

  // Remove imagens do storage associadas
  const { data: veiculo } = await supabase
    .from("veiculos")
    .select("imagens")
    .eq("id", id)
    .maybeSingle();

  if (veiculo?.imagens?.length) {
    const paths = veiculo.imagens
      .map((url) => extrairPathStorage(url))
      .filter(Boolean);
    if (paths.length) {
      await supabase.storage.from(BUCKET).remove(paths);
    }
  }

  const { error } = await supabase.from("veiculos").delete().eq("id", id);
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/painel");
  revalidatePath("/veiculos");
  return { ok: true };
}

export async function alternarVendido(id, vendido) {
  const supabase = await createClient();
  await requireUser(supabase);
  const { error } = await supabase
    .from("veiculos")
    .update({ vendido })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/painel");
  revalidatePath("/veiculos");
  return { ok: true };
}

/** Extrai o caminho relativo do arquivo a partir da URL publica. */
function extrairPathStorage(url) {
  try {
    const marker = `/object/public/${BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(url.slice(idx + marker.length));
  } catch {
    return null;
  }
}

export async function sair() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

import { createClient } from "@/lib/supabase/server";

const SELECT_FIELDS = "*";

/**
 * Busca veiculos para a vitrine publica, com filtros opcionais.
 * @param {Object} filtros
 */
export async function listarVeiculos(filtros = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("veiculos")
    .select(SELECT_FIELDS)
    .eq("vendido", false);

  if (filtros.marca) query = query.eq("marca", filtros.marca);
  if (filtros.combustivel) query = query.eq("combustivel", filtros.combustivel);
  if (filtros.cambio) query = query.eq("cambio", filtros.cambio);
  if (filtros.precoMin) query = query.gte("preco", Number(filtros.precoMin));
  if (filtros.precoMax) query = query.lte("preco", Number(filtros.precoMax));
  if (filtros.anoMin) query = query.gte("ano_modelo", Number(filtros.anoMin));
  if (filtros.busca) {
    const termo = `%${filtros.busca}%`;
    query = query.or(`marca.ilike.${termo},modelo.ilike.${termo},versao.ilike.${termo}`);
  }

  // Ordenacao
  switch (filtros.ordenar) {
    case "preco_asc":
      query = query.order("preco", { ascending: true });
      break;
    case "preco_desc":
      query = query.order("preco", { ascending: false });
      break;
    case "ano_desc":
      query = query.order("ano_modelo", { ascending: false });
      break;
    case "km_asc":
      query = query.order("quilometragem", { ascending: true });
      break;
    default:
      query = query
        .order("destaque", { ascending: false })
        .order("criado_em", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function listarDestaques(limite = 6) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veiculos")
    .select(SELECT_FIELDS)
    .eq("vendido", false)
    .order("destaque", { ascending: false })
    .order("criado_em", { ascending: false })
    .limit(limite);
  if (error) throw error;
  return data || [];
}

export async function buscarVeiculo(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veiculos")
    .select(SELECT_FIELDS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Todos os veiculos (para o painel, inclui vendidos). */
export async function listarTodosVeiculos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veiculos")
    .select(SELECT_FIELDS)
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Lista distinta de marcas cadastradas (para filtros). */
export async function listarMarcas() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("veiculos")
    .select("marca")
    .eq("vendido", false);
  if (error) throw error;
  const marcas = [...new Set((data || []).map((v) => v.marca).filter(Boolean))];
  return marcas.sort((a, b) => a.localeCompare(b));
}

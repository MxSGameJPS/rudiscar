import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { type Car } from "../data";

export async function fetchVehicles(): Promise<Car[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("veiculos")
      .select("*")
      .eq("vendido", false)
      .order("destaque", { ascending: false })
      .order("criado_em", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((v: any, index: number) => ({
      id: v.id || String(index + 1),
      name: v.nome || `${v.marca} ${v.modelo}`.trim(),
      version: v.versao || "",
      year: v.ano || (v.ano_fabricacao && v.ano_modelo ? `${v.ano_fabricacao}/${v.ano_modelo}` : ""),
      km: v.km || (v.quilometragem != null ? `${v.quilometragem.toLocaleString("pt-BR")} km` : "Não informado"),
      fuel: v.combustivel || "Não informado",
      gear: v.cambio || "Não informado",
      price: Number(v.preco) || 0,
      category: v.categoria || "SUV",
      img: v.imagem_capa || (v.imagens && v.imagens[0]) || "",
      tag: v.tag || (v.destaque ? "Destaque" : undefined),
    }));
  } catch (err) {
    console.error("Erro ao buscar veículos do Supabase:", err);
    throw err;
  }
}

export async function fetchTestimonials() {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("depoimentos")
      .select("*")
      .eq("ativo", true)
      .order("criado_em", { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data;
  } catch (err) {
    console.error("Erro ao buscar depoimentos do Supabase:", err);
    return null;
  }
}

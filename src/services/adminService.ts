import { supabase, isSupabaseConfigured } from "../lib/supabase";


export interface VehicleDB {
  id?: string;
  nome: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: string;
  ano_fabricacao?: number;
  ano_modelo?: number;
  km: string;
  quilometragem?: number;
  preco: number;
  categoria: string;
  tag?: string;
  cambio?: string;
  combustivel?: string;
  cor?: string;
  portas?: number;
  placa_final?: string;
  descricao?: string;
  opcionais?: string[];
  imagem_capa: string;
  imagens?: string[];
  destaque: boolean;
  vendido: boolean;
  criado_em?: string;
}

export interface TestimonialDB {
  id?: string;
  nome: string;
  cidade: string;
  carro: string;
  texto: string;
  avaliacao: number;
  ativo: boolean;
  criado_em?: string;
}

export interface PropostaDB {
  id?: string;
  veiculo_id?: string;
  nome_cliente: string;
  telefone: string;
  mensagem?: string;
  valor_carro?: number;
  entrada_pct?: number;
  parcelas?: number;
  status: "novo" | "em_atendimento" | "concluido" | "cancelado";
  criado_em?: string;
}

// ---------------- VEHICLES ----------------

export async function fetchVehiclesAdmin(): Promise<VehicleDB[]> {
  if (!supabase) throw new Error("Supabase não configurado");
  const { data, error } = await supabase.from("veiculos").select("*").order("criado_em", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function saveVehicleAdmin(vehicle: Partial<VehicleDB>): Promise<{ data: VehicleDB | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const payload = { ...vehicle };
    if (payload.id) {
      const { data, error } = await supabase
        .from("veiculos")
        .update(Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "id")))
        .eq("id", vehicle.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data, error: null };
    } else {
      delete payload.id;
      const { data, error } = await supabase
        .from("veiculos")
        .insert([payload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data, error: null };
    }
  }

  return { data: null, error: "Supabase não configurado" };
}

export async function deleteVehicleAdmin(id: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { data, error } = await supabase.from("veiculos").delete().eq("id", id).select("id");
    if (error) return { error: error.message };
    if (!data?.length) return { error: "Nenhum veículo foi excluído. Verifique suas permissões." };
  }
  return { error: isSupabaseConfigured ? null : "Supabase não configurado" };
}

export async function toggleVehicleFieldAdmin(id: string, field: "vendido" | "destaque", val: boolean): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { data, error } = await supabase.from("veiculos").update({ [field]: val }).eq("id", id).select("id");
    if (error) return { error: error.message };
    if (!data?.length) return { error: "Nenhum veículo foi atualizado. Verifique suas permissões." };
  }
  return { error: isSupabaseConfigured ? null : "Supabase não configurado" };
}

export async function uploadVehicleImage(file: File): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024) return null;
  try {
    const fileExt = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `veiculos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("veiculos")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Erro no upload do Storage:", uploadError);
      return null;
    }

    const { data } = supabase.storage.from("veiculos").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("Falha no upload de imagem:", err);
    return null;
  }
}

// ---------------- TESTIMONIALS ----------------

export async function fetchTestimonialsAdmin(): Promise<TestimonialDB[]> {
  if (!supabase) throw new Error("Supabase não configurado");
  const { data, error } = await supabase.from("depoimentos").select("*").order("criado_em", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function saveTestimonialAdmin(testimonial: Partial<TestimonialDB>): Promise<{ data: TestimonialDB | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    if (testimonial.id && !testimonial.id.startsWith("demo-")) {
      const { data, error } = await supabase.from("depoimentos").update(testimonial).eq("id", testimonial.id).select().single();
      if (error) return { data: null, error: error.message };
      return { data, error: null };
    } else {
      delete testimonial.id;
      const { data, error } = await supabase.from("depoimentos").insert([testimonial]).select().single();
      if (error) return { data: null, error: error.message };
      return { data, error: null };
    }
  }

  return { data: null, error: "Supabase não configurado" };
}

export async function deleteTestimonialAdmin(id: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { error } = await supabase.from("depoimentos").delete().eq("id", id);
    if (error) return { error: error.message };
  }
  return { error: isSupabaseConfigured ? null : "Supabase não configurado" };
}

// ---------------- PROPOSTAS & LEADS ----------------

export async function fetchPropostasAdmin(): Promise<PropostaDB[]> {
  if (!supabase) throw new Error("Supabase não configurado");
  const { data, error } = await supabase.from("propostas").select("*").order("criado_em", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updatePropostaStatusAdmin(id: string, status: PropostaDB["status"]): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { data, error } = await supabase.from("propostas").update({ status }).eq("id", id).select("id");
    if (error) return { error: error.message };
    if (!data?.length) return { error: "Proposta não alterada. Verifique as permissões." };
  }
  return { error: isSupabaseConfigured ? null : "Supabase não configurado" };
}

export async function savePropostaAdmin(proposta: Partial<PropostaDB>): Promise<{ data: PropostaDB | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("propostas").insert([proposta]).select().single();
    if (!error && data) return { data, error: null };
  }
  return { data: null, error: "Não foi possível registrar a proposta no banco de dados." };
}

export async function deletePropostaAdmin(id: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { data, error } = await supabase.from("propostas").delete().eq("id", id).select("id");
    if (error) return { error: error.message };
    if (!data?.length) return { error: "Proposta não excluída. Verifique suas permissões." };
  }
  return { error: isSupabaseConfigured ? null : "Supabase não configurado" };
}

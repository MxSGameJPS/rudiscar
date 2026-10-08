import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { CARS } from "../data";


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

// Memory fallback cache for local dev / demo mode
let localVehicles: VehicleDB[] = CARS.map((c) => ({
  id: String(c.id),
  nome: c.name,
  marca: c.name.split(" ")[0] || "Seminovo",
  modelo: c.name.split(" ").slice(1).join(" ") || c.name,
  versao: c.version,
  ano: c.year,
  ano_fabricacao: parseInt(c.year.split("/")[0]) || 2021,
  ano_modelo: parseInt(c.year.split("/")[1] || c.year.split("/")[0]) || 2021,
  km: c.km,
  quilometragem: parseInt(c.km.replace(/\D/g, "")) || 0,
  preco: c.price,
  categoria: c.category,
  tag: c.tag,
  cambio: c.gear,
  combustivel: c.fuel,
  cor: "Preto",
  portas: 4,
  imagem_capa: c.img,
  imagens: [c.img],
  destaque: Boolean(c.tag),
  vendido: false,
  criado_em: new Date().toISOString(),
}));

let localTestimonials: TestimonialDB[] = [
  { id: "1", nome: "Juliana Schmitt", cidade: "Dois Irmãos", carro: "Hyundai Creta 2022", texto: "Já conhecia o Rudi da oficina, então comprar com ele foi natural. O carro veio impecável, com relatório de tudo que foi revisado. Confiança total.", avaliacao: 5, ativo: true },
  { id: "2", nome: "Marcos Kunz", cidade: "Morro Reuter", carro: "Nissan Frontier 2020", texto: "Deixei minha picape antiga na troca e fui muito bem avaliado. O financiamento saiu em menos de dois dias. Atendimento nota 10.", avaliacao: 5, ativo: true },
  { id: "3", nome: "Fernanda Rech", cidade: "Ivoti", carro: "Kia Picanto 2020", texto: "Primeiro carro da minha filha e eu queria segurança. Explicaram cada detalhe da revisão, sem enrolação. Recomendo de olhos fechados.", avaliacao: 5, ativo: true },
  { id: "4", nome: "Roberto Hoffmann", cidade: "Novo Hamburgo", carro: "Toyota Corolla 2020", texto: "Rodei várias lojas na região e só aqui senti honestidade de verdade. Seis meses depois, o carro segue perfeito. Voltarei com certeza.", avaliacao: 5, ativo: true },
  { id: "5", nome: "Carla Weber", cidade: "Santa Maria do Herval", carro: "Nissan Sentra 2021", texto: "Preço justo, carro revisado e garantia de motor e câmbio. Ainda ganhei a primeira revisão na oficina deles. Experiência excelente!", avaliacao: 5, ativo: true },
];

let localPropostas: PropostaDB[] = [
  { id: "101", nome_cliente: "Carlos Eduardo Silva", telefone: "(51) 99881-2233", mensagem: "Gostaria de fazer um teste drive no Hyundai Tucson", valor_carro: 129900, entrada_pct: 30, parcelas: 48, status: "novo", criado_em: new Date().toISOString() },
  { id: "102", nome_cliente: "Mariana Souza", telefone: "(51) 99112-4455", mensagem: "Aceitam carro usado como parte do pagamento?", valor_carro: 112900, entrada_pct: 50, parcelas: 36, status: "em_atendimento", criado_em: new Date(Date.now() - 86400000).toISOString() },
];

// ---------------- VEHICLES ----------------

export async function fetchVehiclesAdmin(): Promise<VehicleDB[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("veiculos")
      .select("*")
      .order("criado_em", { ascending: false });

    if (!error && data) {
      return data;
    }
  }
  return localVehicles;
}

export async function saveVehicleAdmin(vehicle: Partial<VehicleDB>): Promise<{ data: VehicleDB | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    if (vehicle.id && !vehicle.id.startsWith("demo-")) {
      const { data, error } = await supabase
        .from("veiculos")
        .update(vehicle)
        .eq("id", vehicle.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data, error: null };
    } else {
      delete vehicle.id;
      const { data, error } = await supabase
        .from("veiculos")
        .insert([vehicle])
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data, error: null };
    }
  }

  // Fallback local memory
  if (vehicle.id) {
    localVehicles = localVehicles.map((v) => (v.id === vehicle.id ? ({ ...v, ...vehicle } as VehicleDB) : v));
    return { data: vehicle as VehicleDB, error: null };
  } else {
    const newV: VehicleDB = {
      ...vehicle,
      id: `demo-${Date.now()}`,
      nome: vehicle.nome || `${vehicle.marca || ''} ${vehicle.modelo || ''}`,
      marca: vehicle.marca || "Marca",
      modelo: vehicle.modelo || "Modelo",
      versao: vehicle.versao || "",
      ano: vehicle.ano || "2022/2022",
      km: vehicle.km || "0 km",
      preco: vehicle.preco || 0,
      categoria: vehicle.categoria || "SUV",
      imagem_capa: vehicle.imagem_capa || CARS[0].img,
      destaque: Boolean(vehicle.destaque),
      vendido: Boolean(vehicle.vendido),
      criado_em: new Date().toISOString(),
    };
    localVehicles.unshift(newV);
    return { data: newV, error: null };
  }
}

export async function deleteVehicleAdmin(id: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { data, error } = await supabase.from("veiculos").delete().eq("id", id).select("id");
    if (error) return { error: error.message };
    if (!data?.length) return { error: "Nenhum veículo foi excluído. Verifique suas permissões." };
  }
  localVehicles = localVehicles.filter((v) => v.id !== id);
  return { error: null };
}

export async function toggleVehicleFieldAdmin(id: string, field: "vendido" | "destaque", val: boolean): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { data, error } = await supabase.from("veiculos").update({ [field]: val }).eq("id", id).select("id");
    if (error) return { error: error.message };
    if (!data?.length) return { error: "Nenhum veículo foi atualizado. Verifique suas permissões." };
  }
  localVehicles = localVehicles.map((v) => (v.id === id ? { ...v, [field]: val } : v));
  return { error: null };
}

export async function uploadVehicleImage(file: File): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `veiculos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("veiculos")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

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
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("depoimentos").select("*").order("criado_em", { ascending: false });
    if (!error && data) return data;
  }
  return localTestimonials;
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

  if (testimonial.id) {
    localTestimonials = localTestimonials.map((t) => (t.id === testimonial.id ? ({ ...t, ...testimonial } as TestimonialDB) : t));
    return { data: testimonial as TestimonialDB, error: null };
  } else {
    const newT: TestimonialDB = {
      ...testimonial,
      id: `demo-${Date.now()}`,
      nome: testimonial.nome || "Cliente",
      cidade: testimonial.cidade || "Dois Irmãos",
      carro: testimonial.carro || "Seminovo",
      texto: testimonial.texto || "",
      avaliacao: testimonial.avaliacao || 5,
      ativo: testimonial.ativo !== false,
      criado_em: new Date().toISOString(),
    };
    localTestimonials.unshift(newT);
    return { data: newT, error: null };
  }
}

export async function deleteTestimonialAdmin(id: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { error } = await supabase.from("depoimentos").delete().eq("id", id);
    if (error) return { error: error.message };
  }
  localTestimonials = localTestimonials.filter((t) => t.id !== id);
  return { error: null };
}

// ---------------- PROPOSTAS & LEADS ----------------

export async function fetchPropostasAdmin(): Promise<PropostaDB[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("propostas").select("*").order("criado_em", { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  return localPropostas;
}

export async function updatePropostaStatusAdmin(id: string, status: PropostaDB["status"]): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { error } = await supabase.from("propostas").update({ status }).eq("id", id);
    if (error) return { error: error.message };
  }
  localPropostas = localPropostas.map((p) => (p.id === id ? { ...p, status } : p));
  return { error: null };
}

export async function savePropostaAdmin(proposta: Partial<PropostaDB>): Promise<{ data: PropostaDB | null; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("propostas").insert([proposta]).select().single();
    if (!error && data) return { data, error: null };
  }
  const newP: PropostaDB = {
    ...proposta,
    id: `demo-${Date.now()}`,
    nome_cliente: proposta.nome_cliente || "Cliente",
    telefone: proposta.telefone || "",
    status: proposta.status || "novo",
    criado_em: new Date().toISOString(),
  };
  localPropostas.unshift(newP);
  return { data: newP, error: null };
}

export async function deletePropostaAdmin(id: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured && supabase && !id.startsWith("demo-")) {
    const { error } = await supabase.from("propostas").delete().eq("id", id);
    if (error) return { error: error.message };
  }
  localPropostas = localPropostas.filter((p) => p.id !== id);
  return { error: null };
}

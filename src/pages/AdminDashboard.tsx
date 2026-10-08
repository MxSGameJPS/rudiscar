import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  LayoutDashboard,
  CarFront,
  MessageSquareQuote,
  Users,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Star,
  MessageCircle,
  Upload,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Sparkles,
  RefreshCw,
  X,
  Filter,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  fetchVehiclesAdmin,
  saveVehicleAdmin,
  deleteVehicleAdmin,
  toggleVehicleFieldAdmin,
  uploadVehicleImage,
  fetchTestimonialsAdmin,
  saveTestimonialAdmin,
  deleteTestimonialAdmin,
  fetchPropostasAdmin,
  updatePropostaStatusAdmin,
  deletePropostaAdmin,
  type VehicleDB,
  type TestimonialDB,
  type PropostaDB,
} from "../services/adminService";
import { brl } from "../data";

type TabType = "overview" | "vehicles" | "testimonials" | "leads";

export function AdminDashboard() {
  const { user, logout, isDemoSession } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Data states
  const [vehicles, setVehicles] = useState<VehicleDB[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialDB[]>([]);
  const [propostas, setPropostas] = useState<PropostaDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [vehSearch, setVehSearch] = useState("");
  const [vehCategory, setVehCategory] = useState("Todas");

  // Vehicle Modal state
  const [vehModalOpen, setVehModalOpen] = useState(false);
  const [editingVeh, setEditingVeh] = useState<Partial<VehicleDB> | null>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [newOptional, setNewOptional] = useState("");

  // Testimonial Modal state
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Partial<TestimonialDB> | null>(null);

  // Initial load
  const loadData = async () => {
    setRefreshing(true);
    const [vData, tData, pData] = await Promise.all([
      fetchVehiclesAdmin(),
      fetchTestimonialsAdmin(),
      fetchPropostasAdmin(),
    ]);
    setVehicles(vData);
    setTestimonials(tData);
    setPropostas(pData);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // --- VEHICLE HANDLERS ---
  const handleOpenVehModal = (veh?: VehicleDB) => {
    if (veh) {
      setEditingVeh({ ...veh });
    } else {
      setEditingVeh({
        nome: "",
        marca: "",
        modelo: "",
        versao: "",
        ano: `${new Date().getFullYear()}/${new Date().getFullYear()}`,
        ano_fabricacao: new Date().getFullYear(),
        ano_modelo: new Date().getFullYear(),
        km: "0 km",
        quilometragem: 0,
        preco: 50000,
        categoria: "SUV",
        tag: "",
        cambio: "Automático",
        combustivel: "Flex",
        cor: "Preto",
        portas: 4,
        placa_final: "0",
        descricao: "",
        opcionais: ["Ar-condicionado", "Direção hidráulica", "Freios ABS", "Airbags"],
        imagem_capa: "https://images.pexels.com/photos/11808155/pexels-photo-11808155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
        imagens: [],
        destaque: false,
        vendido: false,
      });
    }
    setVehModalOpen(true);
  };

  const handleSaveVeh = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVeh) return;
    const res = await saveVehicleAdmin(editingVeh);
    if (!res.error) {
      setVehModalOpen(false);
      setEditingVeh(null);
      loadData();
    } else {
      alert(`Erro ao salvar veículo: ${res.error}`);
    }
  };

  const handleDeleteVeh = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este veículo do estoque?")) {
      await deleteVehicleAdmin(id);
      loadData();
    }
  };

  const handleToggleVehField = async (id: string, field: "vendido" | "destaque", currentVal: boolean) => {
    await toggleVehicleFieldAdmin(id, field, !currentVal);
    loadData();
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    const url = await uploadVehicleImage(file);
    setUploadingImg(false);
    if (url) {
      setEditingVeh((prev) => prev ? { ...prev, imagem_capa: url } : null);
    } else {
      alert("Falha no upload para o Supabase Storage. Verifique se o bucket 'veiculos' está configurado.");
    }
  };

  const handleAddOptional = () => {
    if (!newOptional.trim() || !editingVeh) return;
    const current = editingVeh.opcionais || [];
    setEditingVeh({ ...editingVeh, opcionais: [...current, newOptional.trim()] });
    setNewOptional("");
  };

  const handleRemoveOptional = (opt: string) => {
    if (!editingVeh) return;
    const current = editingVeh.opcionais || [];
    setEditingVeh({ ...editingVeh, opcionais: current.filter((o) => o !== opt) });
  };

  // --- TESTIMONIAL HANDLERS ---
  const handleOpenTestModal = (t?: TestimonialDB) => {
    if (t) {
      setEditingTest({ ...t });
    } else {
      setEditingTest({
        nome: "",
        cidade: "Dois Irmãos",
        carro: "",
        texto: "",
        avaliacao: 5,
        ativo: true,
      });
    }
    setTestModalOpen(true);
  };

  const handleSaveTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest) return;
    const res = await saveTestimonialAdmin(editingTest);
    if (!res.error) {
      setTestModalOpen(false);
      setEditingTest(null);
      loadData();
    } else {
      alert(`Erro ao salvar depoimento: ${res.error}`);
    }
  };

  const handleDeleteTest = async (id: string) => {
    if (confirm("Deseja excluir este depoimento?")) {
      await deleteTestimonialAdmin(id);
      loadData();
    }
  };

  // --- PROPOSTAS HANDLERS ---
  const handleStatusChange = async (id: string, status: PropostaDB["status"]) => {
    await updatePropostaStatusAdmin(id, status);
    loadData();
  };

  const handleDeleteProposta = async (id: string) => {
    if (confirm("Excluir esta proposta?")) {
      await deletePropostaAdmin(id);
      loadData();
    }
  };

  // Filtered vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      (v.nome || "").toLowerCase().includes(vehSearch.toLowerCase()) ||
      (v.marca || "").toLowerCase().includes(vehSearch.toLowerCase()) ||
      (v.modelo || "").toLowerCase().includes(vehSearch.toLowerCase());
    const matchesCategory = vehCategory === "Todas" || v.categoria === vehCategory;
    return matchesSearch && matchesCategory;
  });

  // KPI Calculations
  const totalStockValue = vehicles
    .filter((v) => !v.vendido)
    .reduce((acc, v) => acc + (Number(v.preco) || 0), 0);
  const activeStockCount = vehicles.filter((v) => !v.vendido).length;
  const soldCount = vehicles.filter((v) => v.vendido).length;
  const newPropostasCount = propostas.filter((p) => p.status === "novo").length;

  return (
    <div className="min-h-screen bg-ink-950 font-sans text-zinc-100 flex flex-col">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-[150px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 font-display font-bold text-ink-950 shadow-lg shadow-emerald-500/20">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-white">Rudi's <span className="text-gradient">Car</span></span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                  {isDemoSession ? "Modo Demo" : "Gestor"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">Painel Administrativo de Estoque & Clientes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              title="Atualizar Dados"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-emerald-400" : ""}`} />
            </button>
            <a
              href="#/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Ver Vitrine
            </a>
            <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">
                <p className="text-xs font-medium text-white">{user?.email || "gestor@rudiscar.com.br"}</p>
                <p className="text-[10px] text-emerald-400">Autenticado</p>
              </div>
              <button
                onClick={handleLogout}
                title="Sair da Conta"
                className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 border-t border-white/5">
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Abas de Gestão">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-emerald-500 text-ink-950 shadow-lg shadow-emerald-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" /> Visão Geral
            </button>

            <button
              onClick={() => setActiveTab("vehicles")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "vehicles"
                  ? "bg-emerald-500 text-ink-950 shadow-lg shadow-emerald-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <CarFront className="h-4 w-4" /> Estoque de Veículos
              <span className="ml-1 rounded-full bg-ink-950/40 px-2 py-0.5 text-[10px]">
                {vehicles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "testimonials"
                  ? "bg-emerald-500 text-ink-950 shadow-lg shadow-emerald-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <MessageSquareQuote className="h-4 w-4" /> Depoimentos
              <span className="ml-1 rounded-full bg-ink-950/40 px-2 py-0.5 text-[10px]">
                {testimonials.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "leads"
                  ? "bg-emerald-500 text-ink-950 shadow-lg shadow-emerald-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" /> Propostas & Leads
              {newPropostasCount > 0 && (
                <span className="ml-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-ink-950 animate-pulse">
                  {newPropostasCount} novos
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 sm:px-8">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
              <p className="text-xs text-zinc-400">Carregando dados da revenda...</p>
            </div>
          </div>
        ) : (
          <>
            {/* TAB 1: VISÃO GERAL */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-[fadeUp_0.3s]">
                {/* Metric Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="glass relative overflow-hidden rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-400">Veículos em Estoque</span>
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                        <CarFront className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 font-display text-3xl font-bold text-white">{activeStockCount}</p>
                    <p className="mt-1 text-[11px] text-zinc-500">Prontos para venda na vitrine</p>
                  </div>

                  <div className="glass relative overflow-hidden rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-400">Valor em Estoque</span>
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                        <DollarSign className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 font-display text-2xl font-bold text-white tracking-tight">{brl(totalStockValue)}</p>
                    <p className="mt-1 text-[11px] text-zinc-500">Soma dos preços ativos</p>
                  </div>

                  <div className="glass relative overflow-hidden rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-400">Veículos Vendidos</span>
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 font-display text-3xl font-bold text-white">{soldCount}</p>
                    <p className="mt-1 text-[11px] text-zinc-500">Histórico de vendas registradas</p>
                  </div>

                  <div className="glass relative overflow-hidden rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-400">Propostas Recebidas</span>
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-500/10 text-amber-400">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 font-display text-3xl font-bold text-white">{propostas.length}</p>
                    <p className="mt-1 text-[11px] text-amber-300">{newPropostasCount} aguardando atendimento</p>
                  </div>
                </div>

                {/* Quick Actions & Recent Items */}
                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                  {/* Stock Highlights */}
                  <div className="glass rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div>
                        <h3 className="font-display text-base font-bold text-white">Destaques do Estoque</h3>
                        <p className="text-xs text-zinc-400">Carros em evidência no topo do site</p>
                      </div>
                      <button
                        onClick={() => handleOpenVehModal()}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-ink-950 shadow-md transition hover:bg-emerald-400"
                      >
                        <Plus className="h-4 w-4" /> Novo Veículo
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {vehicles.slice(0, 4).map((v) => (
                        <div
                          key={v.id}
                          className="flex items-center justify-between rounded-2xl border border-white/5 bg-ink-900/60 p-3 transition hover:border-white/15"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={v.imagem_capa || "https://images.pexels.com/photos/11808155/pexels-photo-11808155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=300"}
                              alt={v.nome}
                              className="h-12 w-16 rounded-xl object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold text-white">{v.nome || `${v.marca} ${v.modelo}`}</p>
                              <p className="text-xs text-zinc-400">{v.versao} &bull; {v.ano}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-sm font-bold text-emerald-400">{brl(Number(v.preco))}</p>
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${v.vendido ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                              {v.vendido ? "Vendido" : "Disponível"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Leads */}
                  <div className="glass rounded-3xl p-6 border border-white/10">
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div>
                        <h3 className="font-display text-base font-bold text-white">Últimas Propostas</h3>
                        <p className="text-xs text-zinc-400">Leads interessados em comprar</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("leads")}
                        className="text-xs font-semibold text-emerald-400 hover:underline"
                      >
                        Ver todas
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {propostas.slice(0, 4).map((p) => (
                        <div key={p.id} className="rounded-2xl border border-white/5 bg-ink-900/60 p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">{p.nome_cliente}</span>
                            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-400/20">
                              {p.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1">{p.mensagem || `Interesse em veículo de ${brl(p.valor_carro || 0)}`}</p>
                          <a
                            href={`https://wa.me/55${p.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${p.nome_cliente}, vi sua proposta na Rudi's Car!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> {p.telefone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ESTOQUE DE VEÍCULOS (CRUD COMPLETO) */}
            {activeTab === "vehicles" && (
              <div className="space-y-6 animate-[fadeUp_0.3s]">
                {/* Filter and Action Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">Estoque de Veículos</h2>
                    <p className="text-xs text-zinc-400">Cadastre, edite e gerencie o catálogo de veículos à venda</p>
                  </div>
                  <button
                    onClick={() => handleOpenVehModal()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-emerald-500/20 transition hover:from-emerald-400 hover:to-emerald-300"
                  >
                    <Plus className="h-4 w-4" /> Cadastrar Novo Veículo
                  </button>
                </div>

                {/* Search & Category Filter Bar */}
                <div className="glass flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between border border-white/10">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Buscar por marca, modelo ou versão..."
                      value={vehSearch}
                      onChange={(e) => setVehSearch(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-ink-900 py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <Filter className="h-4 w-4 text-zinc-400 shrink-0" />
                    {["Todas", "SUV", "Sedã", "Hatch", "Picape"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setVehCategory(cat)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                          vehCategory === cat ? "bg-emerald-500 text-ink-950 font-bold" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicles Table / Grid */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 glass">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-5 py-4">Veículo</th>
                          <th className="px-4 py-4">Categoria</th>
                          <th className="px-4 py-4">Ano & KM</th>
                          <th className="px-4 py-4">Preço</th>
                          <th className="px-4 py-4 text-center">Destaque</th>
                          <th className="px-4 py-4 text-center">Status</th>
                          <th className="px-5 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {filteredVehicles.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                              Nenhum veículo encontrado no estoque.
                            </td>
                          </tr>
                        ) : (
                          filteredVehicles.map((v) => (
                            <tr key={v.id} className="transition hover:bg-white/[0.02]">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={v.imagem_capa}
                                    alt={v.nome}
                                    className="h-12 w-16 rounded-xl object-cover border border-white/10 shrink-0"
                                  />
                                  <div>
                                    <p className="font-semibold text-white">{v.nome || `${v.marca} ${v.modelo}`}</p>
                                    <p className="text-[11px] text-zinc-400">{v.versao} {v.tag && <span className="ml-1 rounded bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 text-[9px]">{v.tag}</span>}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 font-medium">{v.categoria}</td>
                              <td className="px-4 py-4">
                                <div>{v.ano}</div>
                                <div className="text-[11px] text-zinc-500">{v.km}</div>
                              </td>
                              <td className="px-4 py-4 font-display font-bold text-emerald-400 text-sm">{brl(Number(v.preco))}</td>
                              <td className="px-4 py-4 text-center">
                                <button
                                  onClick={() => handleToggleVehField(v.id!, "destaque", Boolean(v.destaque))}
                                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                                    v.destaque ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-white/5 text-zinc-500 hover:text-zinc-300"
                                  }`}
                                >
                                  <Sparkles className="h-3 w-3" /> {v.destaque ? "Destaque" : "Normal"}
                                </button>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <button
                                  onClick={() => handleToggleVehField(v.id!, "vendido", Boolean(v.vendido))}
                                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                                    v.vendido ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  }`}
                                >
                                  {v.vendido ? <XCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                                  {v.vendido ? "Vendido" : "Disponível"}
                                </button>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleOpenVehModal(v)}
                                    title="Editar Veículo"
                                    className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-emerald-500 hover:text-ink-950"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVeh(v.id!)}
                                    title="Excluir Veículo"
                                    className="grid h-8 w-8 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition hover:bg-rose-500 hover:text-white"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DEPOIMENTOS DE CLIENTES */}
            {activeTab === "testimonials" && (
              <div className="space-y-6 animate-[fadeUp_0.3s]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">Depoimentos de Clientes</h2>
                    <p className="text-xs text-zinc-400">Gerencie as avaliações exibidas na seção de prova social</p>
                  </div>
                  <button
                    onClick={() => handleOpenTestModal()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg transition hover:bg-emerald-400"
                  >
                    <Plus className="h-4 w-4" /> Adicionar Depoimento
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className="glass relative flex flex-col justify-between rounded-3xl p-6 border border-white/10">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1 text-amber-300">
                            {[...Array(t.avaliacao || 5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.ativo ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-800 text-zinc-500"}`}>
                            {t.ativo ? "Ativo no site" : "Oculto"}
                          </span>
                        </div>
                        <p className="mt-4 text-xs italic text-zinc-300">“{t.texto}”</p>
                      </div>

                      <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{t.nome}</p>
                          <p className="text-[11px] text-zinc-400">{t.cidade} &bull; {t.carro}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenTestModal(t)}
                            className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:bg-emerald-500 hover:text-ink-950"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteTest(t.id!)}
                            className="grid h-7 w-7 place-items-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PROPOSTAS & LEADS */}
            {activeTab === "leads" && (
              <div className="space-y-6 animate-[fadeUp_0.3s]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">Propostas & Leads de Financiamento</h2>
                    <p className="text-xs text-zinc-400">Atenda solicitações enviadas pelos simuladores e formulários do site</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 glass">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-5 py-4">Cliente & Contato</th>
                          <th className="px-4 py-4">Simulação / Detalhes</th>
                          <th className="px-4 py-4">Mensagem</th>
                          <th className="px-4 py-4 text-center">Status</th>
                          <th className="px-5 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {propostas.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                              Nenhuma proposta cadastrada no momento.
                            </td>
                          </tr>
                        ) : (
                          propostas.map((p) => (
                            <tr key={p.id} className="transition hover:bg-white/[0.02]">
                              <td className="px-5 py-4">
                                <p className="font-bold text-white">{p.nome_cliente}</p>
                                <p className="text-[11px] text-emerald-400">{p.telefone}</p>
                                <p className="text-[10px] text-zinc-500">{p.criado_em ? new Date(p.criado_em).toLocaleDateString("pt-BR") : "Recente"}</p>
                              </td>
                              <td className="px-4 py-4">
                                {p.valor_carro ? (
                                  <div>
                                    <p className="font-semibold text-white">{brl(p.valor_carro)}</p>
                                    <p className="text-[11px] text-zinc-400">Entrada {p.entrada_pct}% &bull; {p.parcelas}x</p>
                                  </div>
                                ) : (
                                  <span className="text-zinc-500">Contato direto</span>
                                )}
                              </td>
                              <td className="px-4 py-4 max-w-xs">
                                <p className="text-xs text-zinc-300 truncate">{p.mensagem || "Interessado no estoque"}</p>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <select
                                  value={p.status}
                                  onChange={(e) => handleStatusChange(p.id!, e.target.value as PropostaDB["status"])}
                                  className="rounded-xl border border-white/10 bg-ink-900 px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-400"
                                >
                                  <option value="novo">Novo 🟡</option>
                                  <option value="em_atendimento">Em Atendimento 🔵</option>
                                  <option value="concluido">Concluído 🟢</option>
                                  <option value="cancelado">Cancelado 🔴</option>
                                </select>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <a
                                    href={`https://wa.me/55${p.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${p.nome_cliente}! Sou da equipe Rudi's Car e recebi sua proposta no site.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-emerald-400"
                                  >
                                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                                  </a>
                                  <button
                                    onClick={() => handleDeleteProposta(p.id!)}
                                    className="grid h-8 w-8 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL CADASTRAR / EDITAR VEÍCULO */}
      {vehModalOpen && editingVeh && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass relative w-full max-w-3xl my-8 rounded-3xl border border-white/15 p-6 sm:p-8 bg-ink-900 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display text-lg font-bold text-white">
                {editingVeh.id ? "Editar Veículo no Estoque" : "Cadastrar Novo Veículo"}
              </h3>
              <button
                onClick={() => setVehModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVeh} className="mt-6 space-y-6">
              {/* Image Upload / URL Row */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-300">Imagem de Destaque (Capa)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <img
                    src={editingVeh.imagem_capa || "https://images.pexels.com/photos/11808155/pexels-photo-11808155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=300"}
                    alt="Preview"
                    className="h-24 w-36 rounded-2xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      placeholder="URL da Imagem..."
                      value={editingVeh.imagem_capa || ""}
                      onChange={(e) => setEditingVeh({ ...editingVeh, imagem_capa: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-emerald-400"
                    />
                    <div className="flex items-center gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20">
                        <Upload className="h-3.5 w-3.5" />
                        {uploadingImg ? "Enviando..." : "Upload no Supabase Storage"}
                        <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                      </label>
                      <span className="text-[10px] text-zinc-500">Envie uma foto da galeria</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 1: Basic info */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Hyundai"
                    value={editingVeh.marca || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, marca: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Modelo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tucson"
                    value={editingVeh.modelo || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, modelo: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Nome de Exibição</label>
                  <input
                    type="text"
                    placeholder="Ex: Hyundai Tucson"
                    value={editingVeh.nome || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, nome: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Grid 2: Specs & Pricing */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Versão</label>
                  <input
                    type="text"
                    placeholder="Ex: GLS 1.6 Turbo"
                    value={editingVeh.versao || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, versao: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Preço (R$) *</label>
                  <input
                    type="number"
                    required
                    step="500"
                    value={editingVeh.preco || 0}
                    onChange={(e) => setEditingVeh({ ...editingVeh, preco: parseFloat(e.target.value) || 0 })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400 font-semibold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Categoria *</label>
                  <select
                    value={editingVeh.categoria || "SUV"}
                    onChange={(e) => setEditingVeh({ ...editingVeh, categoria: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedã">Sedã</option>
                    <option value="Hatch">Hatch</option>
                    <option value="Picape">Picape</option>
                  </select>
                </div>
              </div>

              {/* Grid 3: Year, Km & Tag */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Ano (Exibição)</label>
                  <input
                    type="text"
                    placeholder="Ex: 2021/2022"
                    value={editingVeh.ano || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, ano: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Quilometragem</label>
                  <input
                    type="text"
                    placeholder="Ex: 38.400 km"
                    value={editingVeh.km || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, km: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Etiqueta / Tag</label>
                  <input
                    type="text"
                    placeholder="Ex: Mais procurado, Premium, Baixa km"
                    value={editingVeh.tag || ""}
                    onChange={(e) => setEditingVeh({ ...editingVeh, tag: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Grid 4: Gear, Fuel & Details */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Câmbio</label>
                  <select
                    value={editingVeh.cambio || "Automático"}
                    onChange={(e) => setEditingVeh({ ...editingVeh, cambio: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  >
                    <option value="Automático">Automático</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Combustível</label>
                  <select
                    value={editingVeh.combustivel || "Flex"}
                    onChange={(e) => setEditingVeh({ ...editingVeh, combustivel: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  >
                    <option value="Flex">Flex</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elétrico">Elétrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div className="flex items-center gap-6 pt-5">
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingVeh.destaque)}
                      onChange={(e) => setEditingVeh({ ...editingVeh, destaque: e.target.checked })}
                      className="rounded accent-emerald-500 h-4 w-4"
                    />
                    Destacar
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingVeh.vendido)}
                      onChange={(e) => setEditingVeh({ ...editingVeh, vendido: e.target.checked })}
                      className="rounded accent-rose-500 h-4 w-4"
                    />
                    Marcar Vendido
                  </label>
                </div>
              </div>

              {/* Opcionais List */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Opcionais do Veículo</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Adicionar opcional (ex: Teto solar, Couro)..."
                    value={newOptional}
                    onChange={(e) => setNewOptional(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddOptional}
                    className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20"
                  >
                    Adicionar
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(editingVeh.opcionais || []).map((opt) => (
                    <span key={opt} className="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-zinc-300">
                      {opt}
                      <button type="button" onClick={() => handleRemoveOptional(opt)} className="text-zinc-500 hover:text-rose-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setVehModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-ink-950 shadow-lg hover:bg-emerald-400"
                >
                  Salvar Veículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CADASTRAR / EDITAR DEPOIMENTO */}
      {testModalOpen && editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass relative w-full max-w-lg my-8 rounded-3xl border border-white/15 p-6 bg-ink-900 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display text-lg font-bold text-white">
                {editingTest.id ? "Editar Depoimento" : "Adicionar Depoimento"}
              </h3>
              <button onClick={() => setTestModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTest} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300">Nome do Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Juliana Schmitt"
                  value={editingTest.nome || ""}
                  onChange={(e) => setEditingTest({ ...editingTest, nome: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Cidade *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dois Irmãos"
                    value={editingTest.cidade || ""}
                    onChange={(e) => setEditingTest({ ...editingTest, cidade: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Carro Comprado *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Hyundai Creta 2022"
                    value={editingTest.carro || ""}
                    onChange={(e) => setEditingTest({ ...editingTest, carro: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs text-white outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300">Texto do Depoimento *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Relato do cliente..."
                  value={editingTest.texto || ""}
                  onChange={(e) => setEditingTest({ ...editingTest, texto: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-950 p-3 text-xs text-white outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingTest.ativo)}
                    onChange={(e) => setEditingTest({ ...editingTest, ativo: e.target.checked })}
                    className="rounded accent-emerald-500 h-4 w-4"
                  />
                  Exibir na Vitrine do Site
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTestModalOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold text-ink-950 hover:bg-emerald-400"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

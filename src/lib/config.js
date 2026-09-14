/**
 * Configuracoes centrais do site Rudi's Car.
 * Ajuste telefone, endereco e redes sociais conforme os dados reais.
 */
export const SITE = {
  nome: "Rudi's Car",
  slogan: "Mecânica Automotiva",
  descricao:
    "Oficina mecânica completa e revenda de veículos com procedência. Manutenção, revisão e os melhores carros seminovos.",
  telefone: "(51) 99999-9999",
  whatsapp: "5551999999999",
  email: "contato@rudiscar.com.br",
  endereco: "Av. Principal, 1000 - Centro, Cidade - RS",
  horario: "Seg a Sex: 08h às 18h · Sáb: 08h às 12h",
  instagram: "https://instagram.com/rudiscar",
  facebook: "https://facebook.com/rudiscar",
  mapa: "https://www.google.com/maps",
};

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Veículos à Venda", href: "/veiculos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const SERVICOS = [
  {
    icon: "Wrench",
    titulo: "Manutenção Geral",
    descricao:
      "Revisão preventiva e corretiva completa para manter seu carro sempre no ponto.",
  },
  {
    icon: "Gauge",
    titulo: "Injeção Eletrônica",
    descricao:
      "Diagnóstico computadorizado e reparo de sistemas de injeção com precisão.",
  },
  {
    icon: "Disc3",
    titulo: "Freios e Suspensão",
    descricao:
      "Segurança em primeiro lugar: pastilhas, discos, amortecedores e alinhamento.",
  },
  {
    icon: "Battery",
    titulo: "Elétrica Automotiva",
    descricao:
      "Bateria, alternador, iluminação e toda a parte elétrica do seu veículo.",
  },
  {
    icon: "Snowflake",
    titulo: "Ar-Condicionado",
    descricao:
      "Higienização, recarga de gás e reparo do sistema de climatização.",
  },
  {
    icon: "Droplets",
    titulo: "Troca de Óleo",
    descricao:
      "Óleo e filtros de qualidade, com registro completo da sua revisão.",
  },
];

export const DIFERENCIAIS = [
  { valor: "15+", label: "Anos de experiência" },
  { valor: "5.000+", label: "Veículos atendidos" },
  { valor: "100%", label: "Peças com garantia" },
  { valor: "4.9★", label: "Avaliação dos clientes" },
];

// Opcoes para filtros e formularios de veiculos
export const CAMBIOS = ["Manual", "Automático", "Automatizado", "CVT"];
export const COMBUSTIVEIS = [
  "Flex",
  "Gasolina",
  "Etanol",
  "Diesel",
  "Híbrido",
  "Elétrico",
  "GNV",
];
export const CORES = [
  "Preto",
  "Branco",
  "Prata",
  "Cinza",
  "Vermelho",
  "Azul",
  "Verde",
  "Marrom",
  "Amarelo",
  "Outra",
];
export const OPCIONAIS_COMUNS = [
  "Ar-condicionado",
  "Direção hidráulica",
  "Direção elétrica",
  "Vidros elétricos",
  "Travas elétricas",
  "Airbag",
  "Freios ABS",
  "Central multimídia",
  "Câmera de ré",
  "Sensor de estacionamento",
  "Rodas de liga leve",
  "Bancos em couro",
  "Piloto automático",
  "Teto solar",
];

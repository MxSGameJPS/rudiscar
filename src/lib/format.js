/**
 * Helpers de formatacao (BR).
 */

export function formatCurrency(value) {
  const n = Number(value) || 0;
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatKm(value) {
  const n = Number(value) || 0;
  return `${n.toLocaleString("pt-BR")} km`;
}

export function formatAno(fab, modelo) {
  if (!fab && !modelo) return "";
  if (fab === modelo) return String(modelo);
  return `${fab}/${modelo}`;
}

/**
 * Monta a mensagem de WhatsApp para um veiculo.
 */
export function whatsappVeiculoUrl(numero, veiculo) {
  const titulo = `${veiculo.marca} ${veiculo.modelo}`;
  const texto = `Olá! Tenho interesse no ${titulo} (${formatAno(
    veiculo.ano_fabricacao,
    veiculo.ano_modelo
  )}) anunciado no site. Ainda está disponível?`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function whatsappUrl(numero, texto) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto || "")}`;
}

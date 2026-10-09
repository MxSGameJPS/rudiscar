import { MessageCircle } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { waLink } from "../data";
export function Pricing() {
  return (
    <section id="planos" className="relative py-24 sm:py-32" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <SectionHeading eyebrow="Negociação" title={<span id="pricing-title">Converse sobre seu <span className="text-gradient">próximo veículo.</span></span>} subtitle="Entre em contato para consultar condições de pagamento, disponibilidade e informações sobre o carro que deseja." />
        <Reveal className="mt-10">
          <a href={waLink("Olá! Gostaria de consultar as condições de compra de um veículo da Rudi's Car.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-emerald-950 transition hover:bg-emerald-400">
            <MessageCircle className="h-5 w-5" aria-hidden /> Consultar condições pelo WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
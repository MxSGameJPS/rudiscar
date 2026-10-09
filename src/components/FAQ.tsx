import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "../utils/cn";
import { waLink } from "../data";

const FAQS = [
  { q: "Como descubro quais veículos estão disponíveis?", a: "Consulte o estoque no site e confirme a disponibilidade diretamente com a Rudi's Car pelo WhatsApp." },
  { q: "Posso oferecer meu carro na negociação?", a: "Entre em contato com nossa equipe para consultar as possibilidades de avaliação e negociação do seu veículo." },
  { q: "Existem opções de financiamento?", a: "Consulte a equipe sobre as condições de pagamento disponíveis para cada veículo. Eventuais propostas de crédito dependem de análise." },
  { q: "Como posso conhecer um carro pessoalmente?", a: "Fale pelo WhatsApp para combinar uma visita e confirmar a disponibilidade do modelo desejado." },
  { q: "Onde fica a Rudi's Car?", a: "A revenda fica na Av. João Klauck, 796, em Dois Irmãos, RS. Consulte o mapa na seção de contato." },
  { q: "Como esclareço dúvidas sobre documentação ou garantia?", a: "Nossa equipe informa as condições aplicáveis à negociação do veículo de seu interesse. Consulte antes de concluir a compra." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-slate-900/5 py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            center={false}
            eyebrow="Dúvidas frequentes"
            title={<span id="faq-title">Tudo claro, <span className="text-gradient">sem letra miúda.</span></span>}
            subtitle="Não encontrou sua resposta? Nossa equipe responde rapidinho no WhatsApp."
          />
          <Reveal delay={200}>
            <a
              href={waLink("Olá! Tenho uma dúvida sobre os seminovos da Rudi's Car.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-900/15 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-400/50 hover:bg-emerald-50"
            >
              Perguntar no WhatsApp →
            </a>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div className={cn("rounded-2xl border transition-all duration-500", isOpen ? "border-emerald-400/30 bg-emerald-50" : "border-slate-900/10 bg-white hover:border-slate-900/20")}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-semibold text-slate-900 sm:text-lg">{f.q}</span>
                      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500", isOpen ? "rotate-45 border-emerald-400 bg-emerald-500 text-emerald-950" : "border-slate-900/15 text-slate-900")}>
                        <Plus className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={cn("grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 sm:text-base">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

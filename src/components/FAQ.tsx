import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "../utils/cn";
import { waLink } from "../data";

const FAQS = [
  { q: "Os carros realmente passam pela oficina de vocês?", a: "Sim. A Rudi's Car nasceu como mecânica automotiva e todo seminovo passa pelo nosso elevador antes de ir para a venda. Checamos mais de 120 itens e entregamos o relatório junto com o carro." },
  { q: "Vocês aceitam meu carro usado na troca?", a: "Aceitamos! Fazemos uma avaliação justa e transparente, na hora, e o valor entra como parte da entrada. Pode trazer o carro ou mandar fotos pelo WhatsApp para uma pré-avaliação." },
  { q: "Como funciona o financiamento?", a: "Trabalhamos com os principais bancos e financeiras do país. Você envia seus dados, nós buscamos a melhor taxa e, na maioria dos casos, a resposta sai no mesmo dia. É possível financiar até 100% dependendo do perfil." },
  { q: "O que a garantia cobre?", a: "A garantia cobre motor e câmbio pelo prazo do seu plano (3, 6 ou 12 meses). E o melhor: o atendimento é feito aqui mesmo, na nossa oficina, sem burocracia." },
  { q: "Posso fazer test-drive?", a: "Claro! Agende pelo WhatsApp ou passe na loja na Av. João Klauck, 796, em Dois Irmãos. Deixamos o carro pronto para você." },
  { q: "Quem cuida da documentação e transferência?", a: "Nós. Cuidamos da vistoria, transferência e toda a papelada. No plano Plus e Total, o despachante é por nossa conta." },
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

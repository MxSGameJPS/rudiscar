import { useState } from "react";
import { Search, ClipboardCheck, CreditCard, KeyRound, Check } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { IMAGES } from "../data";

const STEPS = [
  { icon: Search, title: "Escolha o carro", text: "Navegue pelo estoque ou conte pra gente o que procura. Encontramos para você." },
  { icon: ClipboardCheck, title: "Converse com nossa equipe", text: "Tire dúvidas e confirme a disponibilidade antes de agendar sua visita." },
  { icon: CreditCard, title: "Feche do seu jeito", text: "À vista, financiado ou com seu usado na troca. Condições sujeitas a consulta e análise." },
  { icon: KeyRound, title: "Saia dirigindo", text: "Consulte nossa equipe sobre documentos e etapas da negociação." },
];

export function Benefits() {
  return (
    <section className="relative overflow-hidden border-y border-emerald-900/10 bg-emerald-50/20 py-24 sm:py-32" aria-labelledby="benefits-title">
      <div className="absolute -left-40 top-20 -z-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] animate-blob" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Como funciona"
              title={<span id="benefits-title">Do primeiro “oi” à chave na mão em <span className="text-gradient">4 passos.</span></span>}
              subtitle="Comprar carro não precisa ser cansativo. Simplificamos cada etapa para você decidir com calma e segurança."
            />

            <ol className="relative mt-12 space-y-3">
              <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-emerald-400/60 via-emerald-400/20 to-transparent" aria-hidden />
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 110} className="group relative flex gap-5 rounded-2xl p-2 transition-colors hover:bg-white">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-slate-900/10 bg-slate-100 text-emerald-700 transition-all duration-500 group-hover:scale-105 group-hover:border-emerald-400/40 group-hover:bg-emerald-500 group-hover:text-emerald-950">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="pt-1.5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700/80">Passo {i + 1}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={150} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-900/10">
              <img src={IMAGES.keys} alt="Imagem ilustrativa de chaves de veículo" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/85 via-emerald-800/35 to-emerald-500/5" aria-hidden />
              <div className="glass absolute inset-x-5 bottom-5 rounded-2xl p-5">
                <p className="text-sm font-semibold text-slate-900">Seu próximo veículo • Rudi's Car</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {["Veja o estoque", "Confira os preços", "Consulte modelos", "Fale com a equipe", "Confirme disponibilidade", "Agende uma visita"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-emerald-950"><Check className="h-3 w-3" strokeWidth={3} aria-hidden /></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </Reveal>
        </div>


      </div>
    </section>
  );
}

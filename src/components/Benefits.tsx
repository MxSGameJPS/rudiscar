import { useEffect, useState } from "react";
import { Search, ClipboardCheck, CreditCard, KeyRound, Check } from "lucide-react";
import { Reveal, SectionHeading, useInView } from "./Reveal";
import { IMAGES } from "../data";

const STEPS = [
  { icon: Search, title: "Escolha o carro", text: "Navegue pelo estoque ou conte pra gente o que procura. Encontramos para você." },
  { icon: ClipboardCheck, title: "Veja o laudo", text: "Receba o relatório de inspeção da nossa oficina e faça o test-drive sem compromisso." },
  { icon: CreditCard, title: "Feche do seu jeito", text: "À vista, financiado ou com seu usado na troca. Crédito analisado rapidinho." },
  { icon: KeyRound, title: "Saia dirigindo", text: "Documentação por nossa conta. Você só pega a chave e aproveita." },
];

function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {v.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function Benefits() {
  return (
    <section className="relative overflow-hidden border-y border-slate-900/5 bg-white/50 py-24 sm:py-32" aria-labelledby="benefits-title">
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
              <img src={IMAGES.engine} alt="Mecânico revisando motor de um seminovo" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" aria-hidden />
              <div className="glass absolute inset-x-5 bottom-5 rounded-2xl p-5">
                <p className="text-sm font-semibold text-slate-900">Relatório de inspeção • Rudi's Car</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {["Motor e arrefecimento", "Câmbio e embreagem", "Freios e pneus", "Suspensão e direção", "Parte elétrica", "Estrutura e pintura"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-emerald-950"><Check className="h-3 w-3" strokeWidth={3} aria-hidden /></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="glass absolute -right-3 -top-5 animate-float rounded-2xl px-5 py-4 sm:-right-6">
              <p className="font-display text-3xl font-bold text-slate-900"><Counter to={120} suffix="+" /></p>
              <p className="text-xs text-slate-600">itens inspecionados</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            { n: 20, s: "+", l: "anos de experiência automotiva" },
            { n: 2500, s: "+", l: "clientes satisfeitos" },
            { n: 98, s: "%", l: "recomendariam a um amigo" },
            { n: 12, s: " meses", l: "de garantia no plano Total" },
          ].map((st, i) => (
            <Reveal key={st.l} delay={i * 90}>
              <div className="rounded-3xl border border-slate-900/10 bg-white p-6 text-center transition hover:border-emerald-400/30">
                <p className="font-display text-3xl font-bold text-slate-900 sm:text-4xl"><Counter to={st.n} suffix={st.s} /></p>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">{st.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

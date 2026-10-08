import { useMemo, useState, type CSSProperties } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { brl, waLink } from "../data";
import { cn } from "../utils/cn";


function Simulator() {
  const [value, setValue] = useState(90000);
  const [downPct, setDownPct] = useState(30);
  const [months, setMonths] = useState(48);
  const rate = 0.0149;

  const monthly = useMemo(() => {
    const pv = value * (1 - downPct / 100);
    return (pv * rate) / (1 - Math.pow(1 + rate, -months));
  }, [value, downPct, months]);

  const fill = (v: number, min: number, max: number) => ({ "--fill": `${((v - min) / (max - min)) * 100}%` }) as CSSProperties;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden />
      <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500 text-ink-950"><Calculator className="h-5 w-5" aria-hidden /></span>
            <div>
              <h3 className="font-display text-xl font-bold text-white">Simule sua parcela</h3>
              <p className="text-sm text-zinc-400">Descubra em segundos quanto cabe no seu bolso.</p>
            </div>
          </div>

          <div className="mt-8 space-y-7">
            <div>
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="sim-value" className="text-zinc-300">Valor do carro</label>
                <span className="font-display font-semibold text-white">{brl(value)}</span>
              </div>
              <input id="sim-value" type="range" min={30000} max={250000} step={1000} value={value} onChange={(e) => setValue(+e.target.value)} className="mt-3 w-full" style={fill(value, 30000, 250000)} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="sim-down" className="text-zinc-300">Entrada <span className="text-zinc-500">(pode ser seu usado)</span></label>
                <span className="font-display font-semibold text-white">{downPct}% • {brl(value * downPct / 100)}</span>
              </div>
              <input id="sim-down" type="range" min={0} max={80} step={5} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="mt-3 w-full" style={fill(downPct, 0, 80)} />
            </div>
            <fieldset>
              <legend className="text-sm text-zinc-300">Prazo</legend>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {[12, 24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    aria-pressed={months === m}
                    className={cn(
                      "rounded-xl border py-2.5 text-sm font-semibold transition-all duration-300",
                      months === m ? "border-emerald-400 bg-emerald-500 text-ink-950" : "border-white/10 text-zinc-300 hover:border-white/30"
                    )}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink-950/60 p-7 text-center">
          <p className="text-sm text-zinc-400">Parcelas estimadas de</p>
          <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-white tabular-nums" aria-live="polite">{brl(monthly)}</p>
          <p className="mt-1 text-sm text-emerald-300">em {months}x fixas</p>
          <a
            href={waLink(`Olá! Fiz uma simulação no site: carro de ${brl(value)}, entrada de ${downPct}%, em ${months}x de aprox. ${brl(monthly)}. Podem analisar meu crédito?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 font-semibold text-ink-950 transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> Aprovar meu crédito
          </a>
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">Taxa referencial de 1,49% a.m. Simulação ilustrativa, sujeita à análise de crédito.</p>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="planos" className="relative py-24 sm:py-32" aria-labelledby="pricing-title">
      <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-4xl rounded-full bg-emerald-500/10 blur-[140px]" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Planos de proteção"
          title={<span id="pricing-title">Compre com garantia. <span className="text-gradient">Rode com tranquilidade.</span></span>}
          subtitle="Todo carro já sai com o plano Essencial. Quer ir além? Escolha a proteção ideal para o seu dia a dia."
        />
        <Reveal delay={100} className="mt-16">
          <Simulator />
        </Reveal>
      </div>
    </section>
  );
}

import { Wrench, ShieldCheck, FileSearch, Handshake, Landmark, Repeat, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { IMAGES } from "../data";
import { cn } from "../utils/cn";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const FEATURES: Feature[] = [
  { icon: FileSearch, title: "Procedência 100% checada", text: "Consulta de sinistro, leilão, multas, gravames e laudo cautelar em todos os veículos." },
  { icon: Landmark, title: "Crédito facilitado", text: "Trabalhamos com os principais bancos para aprovar seu financiamento com as melhores taxas." },
  { icon: Repeat, title: "Seu usado vale mais", text: "Avaliação justa e transparente. Aceitamos seu carro como parte do pagamento." },
  { icon: Handshake, title: "Atendimento de família", text: "Negócio olho no olho, sem pressão. Você fala direto com quem entende de carro." },
];

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-slate-900/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/30",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), rgba(16,185,129,0.14), transparent 45%)" }}
        aria-hidden
      />
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section id="diferenciais" className="relative py-24 sm:py-32" aria-labelledby="features-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Por que Rudi's Car"
          title={<span id="features-title">Uma revenda para <span className="text-gradient">seu próximo carro.</span></span>}
          subtitle="Conheça os veículos à venda, compare suas características e converse diretamente com nossa equipe."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
          {/* Big card */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <SpotlightCard className="flex min-h-[420px] flex-col justify-end">
              <img
                src={IMAGES.lot}
                alt="Imagem ilustrativa de veículos à venda"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/95 via-emerald-100/65 to-emerald-600/20" aria-hidden />
              <div className="relative p-7 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30">
                  <Wrench className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-900 sm:text-3xl">Encontre o veículo certo para você</h3>
                <p className="mt-3 max-w-lg text-slate-700">
                  Conheça as opções anunciadas, confira preços e informações e fale com a equipe antes de decidir.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Motor", "Câmbio", "Freios", "Suspensão", "Elétrica", "Ar-condicionado"].map((t) => (
                    <span key={t} className="rounded-full border border-slate-900/15 bg-emerald-50 px-3 py-1 text-xs text-slate-800 backdrop-blur">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={100} className="md:col-span-2">
            <SpotlightCard className="p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Informações para sua escolha</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Converse com a equipe para esclarecer suas dúvidas sobre os veículos anunciados.
              </p>
              <div className="mt-6 flex items-end gap-1.5" aria-hidden>
                {[40, 55, 48, 70, 62, 85, 100].map((h, i) => (
                  <span
                    key={i}
                    className="w-full rounded-t-md bg-gradient-to-t from-emerald-600/40 to-emerald-400 transition-all duration-700 group-hover:opacity-100"
                    style={{ height: `${h * 0.6}px`, opacity: 0.4 + i * 0.08 }}
                  />
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={200} className="md:col-span-2">
            <SpotlightCard className="p-7">
              <p className="font-display text-5xl font-extrabold text-gradient">0%</p>
              <h3 className="mt-3 font-display text-xl font-bold text-slate-900">Sua escolha, com mais informações</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Consulte as características de cada veículo e confirme as condições antes de negociar.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <SpotlightCard className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-300 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-emerald-950 group-hover:ring-emerald-400">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

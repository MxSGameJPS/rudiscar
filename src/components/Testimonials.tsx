import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "../utils/cn";
import { fetchTestimonials } from "../services/vehiclesService";

const TESTIMONIALS = [
  { name: "Juliana Schmitt", city: "Dois Irmãos", car: "Hyundai Creta 2022", text: "Já conhecia o Rudi da oficina, então comprar com ele foi natural. O carro veio impecável, com relatório de tudo que foi revisado. Confiança total." },
  { name: "Marcos Kunz", city: "Morro Reuter", car: "Nissan Frontier 2020", text: "Deixei minha picape antiga na troca e fui muito bem avaliado. O financiamento saiu em menos de dois dias. Atendimento nota 10." },
  { name: "Fernanda Rech", city: "Ivoti", car: "Kia Picanto 2020", text: "Primeiro carro da minha filha e eu queria segurança. Explicaram cada detalhe da revisão, sem enrolação. Recomendo de olhos fechados." },
  { name: "Roberto Hoffmann", city: "Novo Hamburgo", car: "Toyota Corolla 2020", text: "Rodei várias lojas na região e só aqui senti honestidade de verdade. Seis meses depois, o carro segue perfeito. Voltarei com certeza." },
  { name: "Carla Weber", city: "Santa Maria do Herval", car: "Nissan Sentra 2021", text: "Preço justo, carro revisado e garantia de motor e câmbio. Ainda ganhei a primeira revisão na oficina deles. Experiência excelente!" },
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<typeof TESTIMONIALS>([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => { fetchTestimonials().then((data) => setTestimonials((data || []).map((t: any) => ({ name: t.nome, city: t.cidade, car: t.carro, text: t.texto })))); }, []);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused || !total) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6000);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (d: number) => setIdx((i) => (i + d + total) % total);
  const t = testimonials[idx];
  if (!t) return null;

  return (
    <section id="depoimentos" className="relative py-24 sm:py-32" aria-labelledby="test-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Quem comprou, recomenda"
          title={<span id="test-title">Mais de 2.500 famílias <span className="text-gradient">rodando tranquilas.</span></span>}
          subtitle="A melhor propaganda da Rudi's Car sempre foi o boca a boca no Vale do Sinos."
        />

        <Reveal delay={150}>
          <div
            className="relative mx-auto mt-14 max-w-4xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 blur-2xl" aria-hidden />
            <figure className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12" aria-live="polite">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-emerald-700/10" aria-hidden />
              <div className="flex gap-1 text-amber-300" aria-label="Avaliação 5 de 5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" aria-hidden />)}
              </div>
              <blockquote key={idx} className="mt-6 animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)]">
                <p className="font-display text-xl font-medium leading-relaxed text-slate-900 sm:text-2xl">“{t.text}”</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 font-display font-bold text-emerald-950">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-600">{t.city} • comprou {t.car}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 text-slate-900 transition hover:border-emerald-400/50 hover:bg-emerald-50 active:scale-95">
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 text-slate-900 transition hover:border-emerald-400/50 hover:bg-emerald-50 active:scale-95">
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </figcaption>
            </figure>
            <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Selecionar depoimento">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={`Depoimento ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={cn("h-2 rounded-full transition-all duration-500", i === idx ? "w-8 bg-emerald-400" : "w-2 bg-white/20 hover:bg-white/40")}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ["4,9", "nota média no Google"],
            ["300+", "avaliações verificadas"],
            ["70%", "clientes voltam para trocar"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 90}>
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-900/5 bg-white py-5">
                <span className="font-display text-2xl font-bold text-slate-900">{n}</span>
                <span className="text-sm text-slate-600">{l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

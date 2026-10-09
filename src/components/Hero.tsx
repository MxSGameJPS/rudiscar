import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, MapPin, BadgeCheck, MessageCircle } from "lucide-react";
import { IMAGES, waLink } from "../data";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOffset({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const enter = (d: number) => ({
    className: `transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${loaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"}`,
    style: { transitionDelay: `${d}ms` },
  });

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Ambient background */}
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px] animate-blob"
        aria-hidden
      />
      <div className="absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-teal-400/10 blur-[100px] animate-blob [animation-delay:-6s]" aria-hidden />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div {...enter(0)}>
            <a
              href="#estoque"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-emerald-50 py-1.5 pl-1.5 pr-4 text-xs font-medium text-slate-700 backdrop-blur transition hover:border-emerald-400/40 hover:bg-emerald-50 sm:text-sm"
            >
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-950">Novo</span>
              Confira os veículos disponíveis
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>

          <h1
            id="hero-title"
            {...enter(120)}
            className={`${enter(120).className} mt-7 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl`}
          >
            Seu próximo carro,
            <br />
            <span className="text-gradient">disponível para você conhecer.</span>
          </h1>

          <p
            {...enter(240)}
            className={`${enter(240).className} mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg`}
          >
            Na Rudi's Car você encontra veículos anunciados com informações sobre modelos e preços. Consulte nosso estoque em Dois Irmãos e fale diretamente com a equipe para confirmar disponibilidade e condições.
          </p>

          <div {...enter(360)} className={`${enter(360).className} mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row`}>
            <a
              href="#estoque"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 px-7 py-4 text-base font-semibold text-emerald-950 shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-400/40 sm:w-auto"
            >
              <span className="absolute inset-y-0 left-0 w-1/3 bg-emerald-100 blur-md animate-shine" aria-hidden />
              Ver carros disponíveis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href={waLink("Olá! Gostaria de avaliar meu carro na troca por um seminovo da Rudi's Car.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-900/15 bg-emerald-50 px-7 py-4 text-base font-semibold text-slate-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-900/30 hover:bg-emerald-50 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Avaliar meu usado
            </a>
          </div>

          <ul {...enter(480)} className={`${enter(480).className} mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600`}>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden /> Conheça os veículos à venda</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-700" aria-hidden /> Atendimento pelo WhatsApp</li>
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-700" aria-hidden /> Confira as informações do anúncio</li>
          </ul>
        </div>

        {/* Hero visual */}
        <div {...enter(620)} className={`${enter(620).className} relative mx-auto mt-16 max-w-6xl`}>
          <div className="absolute -inset-x-10 -bottom-10 top-10 -z-10 rounded-[3rem] bg-gradient-to-t from-emerald-500/25 via-emerald-500/5 to-transparent blur-3xl" aria-hidden />
          <div
            className="relative overflow-hidden rounded-3xl border border-slate-900/10 shadow-2xl shadow-black/60 transition-transform duration-700 ease-out"
            style={{ transform: `perspective(1600px) rotateX(${offset.y * -3}deg) rotateY(${offset.x * 4}deg)` }}
          >
            <img
              src={IMAGES.hero}
              alt="SUVs seminovos com faróis acesos em showroom escuro"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/8]"
              style={{ transform: `scale(1.06) translate(${offset.x * -12}px, ${offset.y * -8}px)` }}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-emerald-800/25 to-transparent" aria-hidden />
          </div>


        </div>
      </div>
    </section>
  );
}

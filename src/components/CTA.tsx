import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { CONTACT, IMAGES, waLink } from "../data";

export function CTA() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="cta-title">
      <Reveal className="relative mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-emerald-400/20 px-6 py-16 text-center sm:px-16 sm:py-24">
          <img src={IMAGES.lot} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600/85 via-emerald-700/90 to-emerald-900" aria-hidden />
          <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl animate-blob" aria-hidden />
          <div className="absolute -bottom-24 -right-10 -z-10 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl animate-blob [animation-delay:-8s]" aria-hidden />

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Seu carro novo está esperando</p>
          <h2 id="cta-title" className="mx-auto mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Venha tomar um café e sair de carro novo.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-700 sm:text-lg">
            Fale agora com a nossa equipe, avalie seu usado e garanta condições especiais válidas para este mês.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink("Olá! Quero saber mais sobre os veículos disponíveis na Rudi's Car.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-4 font-semibold text-emerald-950 shadow-2xl transition hover:-translate-y-0.5 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 text-emerald-600" aria-hidden />
              Chamar no WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href={`tel:${CONTACT.phones[2].tel}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-900/25 bg-emerald-50 px-7 py-4 font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Ligar {CONTACT.phones[2].label}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { MapPin, Phone, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { Logo } from "./Navbar";
import { Reveal } from "./Reveal";
import { CONTACT, waLink } from "../data";

export function Footer() {
  return (
    <footer id="contato" className="relative border-t border-white/5 bg-ink-900/60 pt-20" aria-labelledby="contato-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Logo />
            <h2 id="contato-title" className="mt-6 max-w-md font-display text-2xl font-bold text-white sm:text-3xl">
              Visite nossa loja em Dois Irmãos.
            </h2>
            <p className="mt-3 max-w-md text-zinc-400">
              Seminovos revisados e oficina mecânica completa no mesmo endereço. Venha conhecer.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20"><MapPin className="h-5 w-5" aria-hidden /></span>
                <div>
                  <p className="text-sm font-semibold text-white">Endereço</p>
                  <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="group text-sm text-zinc-400 transition hover:text-emerald-300">
                    {CONTACT.address}<br />{CONTACT.city}
                    <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20"><Phone className="h-5 w-5" aria-hidden /></span>
                <div>
                  <p className="text-sm font-semibold text-white">WhatsApp & Telefone</p>
                  <ul className="mt-1 space-y-1">
                    {CONTACT.phones.map((p, i) => (
                      <li key={p.label}>
                        <a href={waLink(undefined, i)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-emerald-300">
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden /> {p.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20"><Clock className="h-5 w-5" aria-hidden /></span>
                <div>
                  <p className="text-sm font-semibold text-white">Horário</p>
                  <p className="text-sm text-zinc-400">Segunda a sexta: 8h às 18h<br />Sábado: 8h às 12h</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="Mapa da Rudi's Car em Dois Irmãos - RS"
                src={CONTACT.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.9]"
              />
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MapPin className="h-4 w-4 text-emerald-400" aria-hidden /> Como chegar
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 py-8 sm:flex-row">
          <p className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Rudi's Car — Seminovos & Mecânica Automotiva. Dois Irmãos/RS.
            <a href="#/admin" className="ml-3 text-xs text-zinc-600 hover:text-emerald-400 transition underline underline-offset-2">
              Área do Gestor
            </a>
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: MapPin, label: "Ver no Google Maps", href: CONTACT.mapsUrl },
              { icon: Phone, label: "Ligar para a loja", href: `tel:${CONTACT.phones[2].tel}` },
              { icon: MessageCircle, label: "WhatsApp", href: waLink() },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-emerald-300"
              >
                <s.icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

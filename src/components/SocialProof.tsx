import { Reveal } from "./Reveal";

const BRANDS = ["Toyota", "Volkswagen", "Chevrolet", "Hyundai", "Fiat", "Jeep", "Honda", "Renault", "Nissan", "Ford", "Mercedes-Benz", "Kia"];
const BANKS = ["Santander", "Bradesco", "Itaú", "BV Financeira", "Sicredi", "Banco Pan"];

export function SocialProof() {
  return (
    <section aria-label="Marcas e parceiros" className="relative border-y border-slate-900/5 bg-white/60 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium text-slate-500">
            Seminovos das principais marcas, financiados pelos maiores bancos do país
          </p>
        </Reveal>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 hover:[animation-play-state:paused]">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              aria-hidden={i >= BRANDS.length}
              className="whitespace-nowrap font-display text-2xl font-bold tracking-tight text-slate-500 transition-colors duration-300 hover:text-slate-900 sm:text-3xl"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-8">
        <Reveal delay={100}>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {BANKS.map((b) => (
              <li key={b} className="rounded-full border border-slate-900/10 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 sm:text-sm">
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { waLink } from "../data";

const LINKS = [
  { href: "#estoque", label: "Estoque" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group flex items-center gap-2.5", className)} aria-label="Rudi's Car - início">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-600 font-display text-lg font-extrabold text-emerald-950 shadow-lg shadow-emerald-500/30 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
        R
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-slate-900">
        Rudi's <span className="text-emerald-400">Car</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Navegação principal"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-2xl shadow-slate-900/40" : "border border-transparent"
        )}
      >
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                  active === l.href ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-emerald-400 transition-transform duration-500",
                    active === l.href ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden items-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Falar no WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-900/10 text-slate-900 transition hover:bg-emerald-50 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "glass mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl transition-all duration-500 lg:hidden",
          open ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col p-3">
          {LINKS.map((l, i) => (
            <li
              key={l.href}
              className="transition-all duration-500"
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms", transform: open ? "none" : "translateY(-8px)", opacity: open ? 1 : 0 }}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-emerald-50"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-emerald-950"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Falar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

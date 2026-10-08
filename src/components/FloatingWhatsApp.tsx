import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "../data";
import { cn } from "../utils/cn";

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Rudi's Car no WhatsApp"
      className={cn(
        "group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-emerald-500 p-4 text-emerald-950 shadow-2xl shadow-emerald-500/40 transition-all duration-500 hover:bg-emerald-400 sm:bottom-7 sm:right-7",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-emerald-500 animate-pulse-ring" aria-hidden />
      <MessageCircle className="h-6 w-6" aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-[160px] group-hover:pr-1">
        Fale com a gente
      </span>
    </a>
  );
}

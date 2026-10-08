import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";
import { cn } from "../utils/cn";

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

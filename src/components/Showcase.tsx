import { useEffect, useMemo, useState } from "react";
import { Gauge, Fuel, Calendar, Cog, ArrowUpRight, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { brl, waLink, type Car, type Category } from "../data";
import { fetchVehicles } from "../services/vehiclesService";
import { cn } from "../utils/cn";

const FILTERS: ("Todos" | Category)[] = ["Todos", "SUV", "Sedã", "Hatch", "Picape"];

function CarCard({ car, onDetails }: { car: Car; onDetails: () => void }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-400/30 hover:shadow-2xl hover:shadow-emerald-500/10">
      <button type="button" onClick={onDetails} aria-label={`Ver detalhes de ${car.name}`} className="relative aspect-[4/3] overflow-hidden text-left">
        <img
          src={car.img}
          alt={`${car.name} ${car.version} ${car.year}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/65 via-emerald-700/15 to-transparent" aria-hidden />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="glass rounded-full px-2.5 py-1 text-[11px] font-semibold text-slate-900">{car.category}</span>
          {car.tag && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-emerald-950">{car.tag}</span>
          )}
        </div>

      </button>

      <div className="flex flex-1 flex-col p-5">
        <button type="button" onClick={onDetails} className="text-left font-display text-lg font-bold text-slate-900 hover:text-emerald-700">{car.name}</button>
        <p className="text-sm text-slate-600">{car.version}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden /><dt className="sr-only">Ano</dt><dd>{car.year}</dd></div>
          <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden /><dt className="sr-only">Quilometragem</dt><dd>{car.km}</dd></div>
          <div className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden /><dt className="sr-only">Combustível</dt><dd>{car.fuel}</dd></div>
          <div className="flex items-center gap-1.5"><Cog className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden /><dt className="sr-only">Câmbio</dt><dd>{car.gear}</dd></div>
        </dl>

        <div className="mt-5 flex items-end justify-between border-t border-slate-900/5 pt-4">
          <div>
            <p className="font-display text-2xl font-bold text-slate-900">{brl(car.price)}</p>
            <p className="text-xs text-slate-500">Consulte condições de pagamento</p>
          </div>
        </div>

        <a
          href={waLink(`Olá! Tenho interesse no ${car.name} ${car.version} ${car.year} (${brl(car.price)}). Ainda está disponível?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-emerald-50 px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-emerald-950"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Tenho interesse
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
        <button type="button" onClick={onDetails} className="mt-3 rounded-xl border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-800">Ver fotos e detalhes</button>
      </div>
    </article>
  );
}

export function Showcase() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetchVehicles().then(setCarsList).catch(() => setLoadError(true)).finally(() => setLoading(false));
  }, []);

  const cars = useMemo(() => (filter === "Todos" ? carsList : carsList.filter((c) => c.category === filter)), [filter, carsList]);

  return (
    <section id="estoque" className="relative py-24 sm:py-32" aria-labelledby="estoque-title">
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-emerald-500/[0.06] to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            center={false}
            eyebrow="Estoque em destaque"
            title={<span id="estoque-title">Encontre seu carro. <span className="text-gradient">Conheça o estoque.</span></span>}
            subtitle="Confira os veículos cadastrados e consulte a disponibilidade diretamente com a revenda."
          />
          <Reveal delay={200}>
            <div role="tablist" aria-label="Filtrar por categoria" className="glass flex flex-wrap gap-1 rounded-2xl p-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                    filter === f ? "bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20" : "text-slate-600 hover:bg-emerald-50 hover:text-slate-900"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div key={filter} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loadError && <p className="col-span-full py-12 text-center text-slate-600">Não foi possível carregar o estoque. Tente novamente mais tarde ou fale pelo WhatsApp.</p>}
          {!loadError && !loading && cars.length === 0 && <p className="col-span-full py-12 text-center text-slate-600">Nenhum veículo disponível neste momento. Fale conosco para conhecer as próximas novidades.</p>}
          {loading && <p className="col-span-full py-12 text-center text-slate-600">Carregando estoque...</p>}
          {cars.map((car, i) => (
            <Reveal key={car.id} delay={(i % 4) * 80}>
              <CarCard car={car} onDetails={() => { setSelectedCar(car); setPhotoIndex(0); }} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href={waLink("Olá! Gostaria de receber a lista completa do estoque da Rudi's Car.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl border border-slate-900/15 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-emerald-400/50 hover:bg-emerald-50"
          >
            Receber estoque completo no WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
          <p className="max-w-xl text-xs text-slate-500">
            Preços e disponibilidade devem ser confirmados com a revenda antes de fechar negócio.
          </p>
        </Reveal>
      </div>
      {selectedCar && <VehicleDetailsModal car={selectedCar} index={photoIndex} setIndex={setPhotoIndex} onClose={() => setSelectedCar(null)} />}
    </section>
  );
}

function VehicleDetailsModal({ car, index, setIndex, onClose }: { car: Car; index: number; setIndex: (index: number) => void; onClose: () => void }) {
  const photos = Array.from(new Set([car.img, ...(car.images || [])].filter(Boolean)));
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((index + 1) % Math.max(photos.length, 1));
      if (event.key === "ArrowLeft") setIndex((index - 1 + photos.length) % Math.max(photos.length, 1));
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = previous; };
  }, [index, photos.length, onClose, setIndex]);
  return <div role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 sm:p-6">
    <div role="dialog" aria-modal="true" aria-label={`Detalhes de ${car.name}`} className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
      <button type="button" onClick={onClose} aria-label="Fechar detalhes" className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow"><X /></button>
      <h2 className="pr-12 text-2xl font-bold text-slate-900">{car.name}</h2>
      <p className="mb-5 text-slate-600">{car.version} · {car.year}</p>
      {photos.length > 0 && <div className="relative">
        <img src={photos[index] || photos[0]} alt={`${car.name} - foto ${index + 1}`} className="max-h-[55vh] w-full rounded-2xl bg-slate-100 object-contain" />
        {photos.length > 1 && <>
          <button type="button" onClick={() => setIndex((index - 1 + photos.length) % photos.length)} aria-label="Foto anterior" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"><ChevronLeft /></button>
          <button type="button" onClick={() => setIndex((index + 1) % photos.length)} aria-label="Próxima foto" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"><ChevronRight /></button>
        </>}
        <p className="mt-2 text-center text-xs text-slate-500">{index + 1} de {photos.length}</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">{photos.map((photo, i) => <button key={photo} type="button" onClick={() => setIndex(i)} aria-label={`Ver foto ${i + 1}`} className={`shrink-0 rounded-lg border-2 ${index === i ? "border-emerald-500" : "border-transparent"}`}><img src={photo} alt="" className="h-16 w-24 rounded-md object-cover" /></button>)}</div>
      </div>}
      <p className="mt-5 text-3xl font-bold text-emerald-700">{brl(car.price)}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-emerald-50 p-4 text-sm sm:grid-cols-3">
        {([["Ano", car.year], ["Quilometragem", car.km], ["Combustível", car.fuel], ["Câmbio", car.gear], ["Cor", car.color], ["Portas", car.doors]] as const).filter(([, value]) => Boolean(value)).map(([label, value]) => <div key={label}><dt className="text-slate-500">{label}</dt><dd className="font-semibold text-slate-900">{value}</dd></div>)}
      </dl>
      {car.description && <div className="mt-5"><h3 className="font-bold">Descrição</h3><p className="mt-2 whitespace-pre-line text-sm text-slate-700">{car.description}</p></div>}
      {!!car.options?.length && <div className="mt-5"><h3 className="font-bold">Opcionais</h3><ul className="mt-2 grid list-inside list-disc gap-1 text-sm text-slate-700 sm:grid-cols-2">{car.options.map((option, i) => <li key={i}>{option}</li>)}</ul></div>}
      <a href={waLink(`Olá! Tenho interesse no ${car.name} ${car.version} ${car.year} (${brl(car.price)}). Gostaria de mais informações.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"><MessageCircle size={18} /> Consultar pelo WhatsApp</a>
    </div>
  </div>;
}

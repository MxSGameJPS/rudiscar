export const CONTACT = {
  address: "Av. João Klauck, 796 - Lot. Moinho Velho",
  city: "Dois Irmãos - RS, 93950-000",
  phones: [
    { label: "(51) 9274-8720", wa: "5551992748720", tel: "+5551992748720" },
    { label: "(51) 9274-9412", wa: "5551992749412", tel: "+5551992749412" },
    { label: "(51) 2143-9773", wa: "555121439773", tel: "+555121439773" },
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Jo%C3%A3o+Klauck,+796+-+Moinho+Velho,+Dois+Irm%C3%A3os+-+RS,+93950-000",
  mapsEmbed:
    "https://www.google.com/maps?q=Av.+Jo%C3%A3o+Klauck,+796,+Dois+Irm%C3%A3os+-+RS,+93950-000&output=embed",
};

export const waLink = (msg = "Olá, Rudi's Car! Vim pelo site e quero saber mais sobre os seminovos.", idx = 0) =>
  `https://wa.me/${CONTACT.phones[idx].wa}?text=${encodeURIComponent(msg)}`;

export type Category = "SUV" | "Sedã" | "Hatch" | "Picape";

export interface Car {
  id: string | number;
  name: string;
  version: string;
  year: string;
  km: string;
  fuel: string;
  gear: string;
  price: number;
  category: Category;
  img: string;
  tag?: string;
}

export const IMAGES = {
  hero: "https://images.pexels.com/photos/27766958/pexels-photo-27766958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800",
  keys: "https://images.pexels.com/photos/6817034/pexels-photo-6817034.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  lot: "https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
};

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

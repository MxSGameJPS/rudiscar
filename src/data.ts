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
  id: number;
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

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840`;

export const CARS: Car[] = [
  { id: 1, name: "Hyundai Tucson", version: "GLS 1.6 Turbo", year: "2021/2022", km: "38.400 km", fuel: "Flex", gear: "Automático", price: 129900, category: "SUV", img: px(11808155), tag: "Mais procurado" },
  { id: 2, name: "Toyota Corolla", version: "XEi 2.0 Dynamic", year: "2020/2020", km: "52.100 km", fuel: "Flex", gear: "CVT", price: 112900, category: "Sedã", img: px(11501948) },
  { id: 3, name: "Mercedes-Benz CLA", version: "180 Urban", year: "2019/2019", km: "41.700 km", fuel: "Gasolina", gear: "Automático", price: 159900, category: "Sedã", img: px(16495911), tag: "Premium" },
  { id: 4, name: "Ford Fiesta", version: "SE 1.6 16V", year: "2018/2019", km: "63.200 km", fuel: "Flex", gear: "Manual", price: 49900, category: "Hatch", img: px(17209676), tag: "Ótimo 1º carro" },
  { id: 5, name: "Nissan Frontier", version: "SE 2.3 4x4 Diesel", year: "2019/2020", km: "88.500 km", fuel: "Diesel", gear: "Automático", price: 164900, category: "Picape", img: px(12384824) },
  { id: 6, name: "Nissan Sentra", version: "SV 2.0 CVT", year: "2021/2021", km: "34.900 km", fuel: "Flex", gear: "CVT", price: 104900, category: "Sedã", img: px(15223537) },
  { id: 7, name: "Kia Picanto", version: "EX 1.0", year: "2020/2020", km: "29.800 km", fuel: "Flex", gear: "Automático", price: 57900, category: "Hatch", img: px(20475023) },
  { id: 8, name: "Hyundai Creta", version: "Action 1.6", year: "2022/2023", km: "21.300 km", fuel: "Flex", gear: "Automático", price: 99900, category: "SUV", img: px(15001927), tag: "Baixa km" },
];

export const IMAGES = {
  hero: "https://images.pexels.com/photos/27766958/pexels-photo-27766958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800",
  workshop: "https://images.pexels.com/photos/8986148/pexels-photo-8986148.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  engine: "https://images.pexels.com/photos/8986037/pexels-photo-8986037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  keys: "https://images.pexels.com/photos/6817034/pexels-photo-6817034.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  lot: "https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
};

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

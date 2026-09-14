import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://rudiscar.com.br"),
  title: {
    default: `${SITE.nome} - ${SITE.slogan}`,
    template: `%s | ${SITE.nome}`,
  },
  description: SITE.descricao,
  keywords: [
    "oficina mecânica",
    "mecânica automotiva",
    "revenda de carros",
    "veículos seminovos",
    "Rudi's Car",
  ],
  openGraph: {
    title: `${SITE.nome} - ${SITE.slogan}`,
    description: SITE.descricao,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport = {
  themeColor: "#0a0b0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}

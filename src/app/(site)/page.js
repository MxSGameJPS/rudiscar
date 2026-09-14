import Hero from "@/components/home/Hero";
import Servicos from "@/components/home/Servicos";
import Sobre from "@/components/home/Sobre";
import Destaques from "@/components/home/Destaques";
import Contato from "@/components/home/Contato";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Servicos />
      <Destaques />
      <Sobre />
      <Contato />
    </>
  );
}

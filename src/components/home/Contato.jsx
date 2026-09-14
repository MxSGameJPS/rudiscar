import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/config";
import { whatsappUrl } from "@/lib/format";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import styles from "./Contato.module.css";

export default function Contato() {
  return (
    <section id="contato" className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal className={styles.card} amount={0.15}>
          <div className={styles.left}>
            <span className={styles.tag}>Fale com a gente</span>
            <h2 className={styles.title}>
              Pronto para cuidar do seu carro?
            </h2>
            <p className={styles.text}>
              Agende uma revisão, tire suas dúvidas ou venha conhecer nosso
              estoque de veículos. Estamos prontos para atender você.
            </p>

            <div className={styles.actions}>
              <Button
                href={whatsappUrl(
                  SITE.whatsapp,
                  "Olá! Gostaria de agendar um serviço."
                )}
                external
                variant="primary"
                size="lg"
              >
                <MessageCircle size={18} /> Chamar no WhatsApp
              </Button>
              <Button href={`tel:+${SITE.whatsapp}`} variant="outline" size="lg">
                <Phone size={18} /> {SITE.telefone}
              </Button>
            </div>
          </div>

          <ul className={styles.info}>
            <li>
              <span className={styles.iconBox}>
                <MapPin size={20} />
              </span>
              <div>
                <strong>Endereço</strong>
                <p>{SITE.endereco}</p>
              </div>
            </li>
            <li>
              <span className={styles.iconBox}>
                <Clock size={20} />
              </span>
              <div>
                <strong>Horário</strong>
                <p>{SITE.horario}</p>
              </div>
            </li>
            <li>
              <span className={styles.iconBox}>
                <Phone size={20} />
              </span>
              <div>
                <strong>Contato</strong>
                <p>{SITE.telefone}</p>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

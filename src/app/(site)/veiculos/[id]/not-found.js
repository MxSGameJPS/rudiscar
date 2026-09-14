import Link from "next/link";
import { CarFront } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        textAlign: "center",
        padding: "120px 24px 60px",
      }}
    >
      <CarFront size={56} style={{ color: "var(--brand)", opacity: 0.6 }} />
      <h1 style={{ fontSize: "1.8rem", color: "var(--text-0)" }}>
        Veículo não encontrado
      </h1>
      <p style={{ color: "var(--text-2)", maxWidth: 420 }}>
        O veículo que você procura pode ter sido vendido ou removido do estoque.
      </p>
      <Button href="/veiculos" variant="primary">
        Ver estoque disponível
      </Button>
    </div>
  );
}

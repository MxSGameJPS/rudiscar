import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        textAlign: "center",
        padding: "24px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 14vw, 8rem)",
          fontWeight: 800,
          background: "linear-gradient(120deg, var(--brand), var(--accent))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}
      >
        404
      </span>
      <h1 style={{ fontSize: "1.6rem", color: "var(--text-0)" }}>
        Página não encontrada
      </h1>
      <p style={{ color: "var(--text-2)", maxWidth: 420 }}>
        A página que você tentou acessar não existe ou foi movida.
      </p>
      <Button href="/" variant="primary">
        Voltar ao início
      </Button>
    </div>
  );
}

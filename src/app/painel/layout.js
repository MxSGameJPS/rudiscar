import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PainelShell from "@/components/painel/PainelShell";

export const metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function PainelLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <PainelShell email={user.email}>{children}</PainelShell>;
}

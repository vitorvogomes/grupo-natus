import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

/**
 * 404 com saída: depois da troca de domínio, é aqui que caem as URLs antigas
 * do WordPress que o mapa de redirects não cobre (content/redirects.ts).
 */
export default function NotFound() {
  return (
    <main className="bg-navy-700 text-navy-50">
      <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">Erro 404</p>
        <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">Página não encontrada</h1>
        <p className="mt-4 max-w-xl text-lg text-navy-100">
          O endereço pode ter mudado com o novo site. Os empreendimentos e o
          contato continuam a um clique.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/empreendimentos" className={buttonVariants({ size: "lg" })}>
            Ver empreendimentos
          </Link>
          <Link href="/contato" className={buttonVariants({ variant: "outlineInverse", size: "lg" })}>
            Fale conosco
          </Link>
        </div>
        <Link href="/" className="mt-8 text-sm font-medium text-navy-100 underline underline-offset-4 hover:text-white">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
        <aside className="border-r border-zinc-800 bg-zinc-900 px-5 py-6 text-zinc-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Nexo</h2>
            <p className="mt-1 text-sm text-zinc-400">Sistema de chamados</p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/chamados"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              Chamados
            </Link>

            <Link
              href="/relatorios"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              Relatórios
            </Link>

            <Link
              href="/novo"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              Novo chamado
            </Link>
          </nav>
        </aside>

        <main className="bg-zinc-100">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const user = {
    name: "Felipe Alves",
    role: "Administrador",
  };

  const linkClass = (href: string) => {
    const isActive = pathname === href;

    return `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-zinc-800 text-white"
        : "text-zinc-200 hover:bg-zinc-800 hover:text-white"
    }`;
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col justify-between border-r border-zinc-800 bg-zinc-900 px-5 py-6 text-zinc-100">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Nexo</h2>
              <p className="mt-1 text-sm text-zinc-400">Sistema de chamados</p>
            </div>

            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>

              <Link href="/chamados" className={linkClass("/chamados")}>
                Chamados
              </Link>

              <Link href="/relatorios" className={linkClass("/relatorios")}>
                Relatórios
              </Link>

              <Link href="/novo" className={linkClass("/novo")}>
                Novo chamado
              </Link>
            </nav>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-400">{user.role}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="bg-zinc-100">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
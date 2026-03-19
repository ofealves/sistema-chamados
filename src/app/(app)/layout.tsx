"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = {
    name: "Felipe Alves",
    role: "Administrador",
  };

  const linkClass = (href: string) => {
    const isActive = pathname === href;

    return `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
        ? "bg-zinc-800 text-white"
        : "text-zinc-200 hover:bg-zinc-800 hover:text-white"
      }`;
  };

  const mobileLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
        ? "bg-zinc-800 text-white"
        : "text-zinc-200 hover:bg-zinc-800 hover:text-white"
      }`;
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
        <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-between md:border-r md:border-zinc-800 md:bg-zinc-900 md:px-5 md:py-6 md:text-zinc-100">
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

        <main className="bg-zinc-100">
          <div className="border-b border-zinc-800 bg-zinc-900 text-zinc-100 md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h2 className="text-lg font-bold">Nexo</h2>
                <p className="text-sm text-zinc-400">Sistema de chamados</p>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cursor-pointer rounded-md border border-zinc-700 p-2 text-zinc-100 transition hover:bg-zinc-800"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="border-t border-zinc-800 px-4 py-3">
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className={mobileLinkClass("/dashboard")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/chamados"
                    className={mobileLinkClass("/chamados")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chamados
                  </Link>

                  <Link
                    href="/relatorios"
                    className={mobileLinkClass("/relatorios")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Relatórios
                  </Link>

                  <Link
                    href="/novo"
                    className={mobileLinkClass("/novo")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Novo chamado
                  </Link>
                </nav>

                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
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
              </div>
            )}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
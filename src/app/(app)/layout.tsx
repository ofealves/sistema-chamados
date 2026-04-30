"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type User = {
  name: string;
  role: string;
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // ✅ pega o usuário do localStorage (lado cliente)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      console.error("Erro ao ler user do localStorage");
    }
  }, []);

  const linkClass = (href: string) => {
    const isActive = pathname === href;

    return `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
        ? "bg-zinc-800 text-white"
        : "text-zinc-200 hover:bg-zinc-800 hover:text-white"
      }`;
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word: string) => word[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const formatName = (name?: string) => {
  if (!name) return "";

  return name
    .toLowerCase()
    .split(" ")
    .map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

const formatRole = (role?: string) => {
  if (!role) return "";

  return role
    .toLowerCase()
    .split(" ")
    .map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-between md:border-r md:border-zinc-800 md:bg-zinc-900 md:px-5 md:py-6 md:text-zinc-100">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Nexou</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Sistema de Chamados
              </p>
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

          {/* USER CARD */}
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
                {getInitials(user?.name)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name ? formatName(user.name) : "Usuário"}
                </p>
                <p className="text-xs text-zinc-400">
                  {user?.role ? formatName(user.role) : "Usuário"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="bg-zinc-100">
          {/* MOBILE HEADER */}
          <div className="border-b border-zinc-800 bg-zinc-900 text-zinc-100 md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h2 className="text-lg font-bold">Nexou</h2>
                <p className="text-sm text-zinc-400">
                  Sistema de Chamados
                </p>
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

            {/* MOBILE MENU */}
            {isMenuOpen && (
              <div className="border-t border-zinc-800 px-4 py-3">
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className={linkClass("/dashboard")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/chamados"
                    className={linkClass("/chamados")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chamados
                  </Link>

                  <Link
                    href="/relatorios"
                    className={linkClass("/relatorios")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Relatórios
                  </Link>

                  <Link
                    href="/novo"
                    className={linkClass("/novo")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Novo chamado
                  </Link>
                </nav>

                {/* USER MOBILE */}
                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
                      {getInitials(user?.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {user?.name || "Usuário"}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {user?.role || "Visitante"}
                      </p>
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
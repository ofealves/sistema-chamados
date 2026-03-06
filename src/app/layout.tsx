import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TI Desk",
  description: "Sistema de chamados",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-muted/40">
          <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
            <aside className="border-r bg-background p-6">
              <h2 className="mb-6 text-xl font-bold">TI Desk</h2>

              <nav className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  Dashboard
                </Link>

                <Link
                  href="/chamados"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  Chamados
                </Link>

                <Link
                  href="/chamados/novo"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  Novo chamado
                </Link>
              </nav>
            </aside>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
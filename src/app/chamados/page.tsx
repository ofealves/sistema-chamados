import Link from "next/link";
import { tickets } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ChamadosPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chamados</h1>
          <p className="text-muted-foreground">
            Gerencie os tickets de suporte
          </p>
        </div>

        <Button asChild>
          <Link href="/chamados/novo">Novo chamado</Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-background">
        <div className="grid grid-cols-5 border-b px-4 py-3 text-sm font-medium">
          <span>Título</span>
          <span>Cliente</span>
          <span>Status</span>
          <span>Prioridade</span>
          <span>Data</span>
        </div>

        {tickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/chamados/${ticket.id}`}
            className="grid grid-cols-5 items-center px-4 py-3 text-sm hover:bg-muted/50"
          >
            <span>{ticket.titulo}</span>
            <span>{ticket.cliente}</span>
            <span>
              <Badge variant="secondary">{ticket.status}</Badge>
            </span>
            <span>{ticket.prioridade}</span>
            <span>{ticket.data}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChamadosPage;
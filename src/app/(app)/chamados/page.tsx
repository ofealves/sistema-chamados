'use client'

import Link from "next/link";
import { useState } from "react";
import { tickets } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStatusClass = (status: string) => {
  if (status === "Aberto") {
    return "bg-green-500 text-white";
  } else if (status === "Em andamento") {
    return "bg-yellow-500 text-black";
  } else {
    return "bg-blue-500 text-white";
  }
};


const ChamadosPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "" || ticket.prioridade === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const countTickets = filteredTickets.length;
  const ticketLabel = countTickets === 1 ? "Ticket" : "Tickets";

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chamados</h1>
          <p className="text-muted-foreground">
            Gerencie os tickets de suporte
          </p>
          <p className="text-muted-foreground">
            {countTickets} {ticketLabel}
          </p>
        </div>

        <Button asChild>
          <Link href="/chamados/novo">Novo chamado</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="">Todos os status</option>
          <option value="Aberto">Aberto</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Resolvido">Resolvido</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="">Todas as prioridades</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <div className="rounded-xl border bg-background">
        <div className="grid grid-cols-5 border-b px-4 py-3 text-sm font-medium">
          <span>Título</span>
          <span>Cliente</span>
          <span>Status</span>
          <span>Prioridade</span>
          <span>Data</span>
        </div>

        {filteredTickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/chamados/${ticket.id}`}
            className="grid grid-cols-5 items-center px-4 py-3 text-sm hover:bg-muted/50"
          >
            <span>{ticket.titulo}</span>
            <span>{ticket.cliente}</span>
            <span>
              <Badge className={getStatusClass(ticket.status)}>
                {ticket.status}
              </Badge>
            </span>
            <span>
              <Badge className="bg-white text-muted-foreground">
                {ticket.prioridade}
              </Badge>
            </span>
            <span>{ticket.data}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChamadosPage;
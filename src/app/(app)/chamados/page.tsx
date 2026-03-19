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

const getPriorityClass = (priority: string) => {
  if (priority === "Alta") {
    return "bg-red-100 text-red-700 hover:bg-red-100";
  } else if (priority === "Média") {
    return "bg-orange-100 text-orange-700 hover:bg-orange-100";
  } else {
    return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
  }
};

const ChamadosPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateOrder, setDateOrder] = useState("");

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "" || ticket.prioridade === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const timeA = parseDate(a.data).getTime();
    const timeB = parseDate(b.data).getTime();

    if (dateOrder === "recentes") {
      return timeB - timeA;
    }

    if (dateOrder === "antigos") {
      return timeA - timeB;
    }

    return 0;
  });

  const countTickets = sortedTickets.length;
  const ticketLabel = countTickets === 1 ? "Ticket" : "Tickets";

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Chamados</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Gerencie os tickets de suporte
          </p>
          <p className="text-sm text-muted-foreground sm:text-base">
            {countTickets} {ticketLabel}
          </p>
        </div>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/novo">Novo chamado</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none"
        >
          <option value="">Todos os status</option>
          <option value="Aberto">Aberto</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Resolvido">Resolvido</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none"
        >
          <option value="">Todas as prioridades</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>

        <select
          value={dateOrder}
          onChange={(e) => setDateOrder(e.target.value)}
          className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none"
        >
          <option value="">Sem ordenação</option>
          <option value="recentes">Mais recentes</option>
          <option value="antigos">Mais antigos</option>
        </select>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {sortedTickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/chamados/${ticket.id}`}
            className="block rounded-xl border bg-background p-4 transition hover:bg-muted/50"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="line-clamp-2 text-sm font-semibold">
                {ticket.titulo}
              </h2>
              <span className="shrink-0 text-xs text-muted-foreground">
                {ticket.data}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Cliente: </span>
                <span>{ticket.cliente}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusClass(ticket.status)}>
                  {ticket.status}
                </Badge>

                <Badge className={getPriorityClass(ticket.prioridade)}>
                  {ticket.prioridade}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border bg-background md:block">
        <div className="grid grid-cols-[2fr_1.2fr_1.2fr_1fr_1fr] border-b px-4 py-3 text-sm font-medium">
          <span>Título</span>
          <span>Cliente</span>
          <span>Status</span>
          <span>Prioridade</span>
          <span>Data</span>
        </div>

        {sortedTickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/chamados/${ticket.id}`}
            className="grid grid-cols-[2fr_1.2fr_1.2fr_1fr_1fr] items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted/50"
          >
            <span className="truncate">{ticket.titulo}</span>
            <span className="truncate">{ticket.cliente}</span>
            <span>
              <Badge className={getStatusClass(ticket.status)}>
                {ticket.status}
              </Badge>
            </span>
            <span>
              <Badge className={getPriorityClass(ticket.prioridade)}>
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
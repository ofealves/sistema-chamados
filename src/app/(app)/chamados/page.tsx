"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getTickets } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStatusClass = (status: string) => {
  if (status === "open") {
    return "bg-green-500 text-white";
  } else if (status === "in_progress") {
    return "bg-yellow-500 text-black";
  } else {
    return "bg-blue-500 text-white";
  }
};

const getPriorityClass = (priority: string) => {
  if (priority === "high") {
    return "bg-red-100 text-red-700";
  } else if (priority === "medium") {
    return "bg-orange-100 text-orange-700";
  } else {
    return "bg-zinc-100 text-zinc-700";
  }
};

const ChamadosPage = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateOrder, setDateOrder] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        console.log("TICKETS:", data); // debug
        setTickets(data);
      } catch (error) {
        console.error("Erro ao buscar tickets", error);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "" || ticket.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();

    if (dateOrder === "recentes") return timeB - timeA;
    if (dateOrder === "antigos") return timeA - timeB;

    return 0;
  });

  const countTickets = sortedTickets.length;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Chamados</h1>
          <p className="text-sm text-muted-foreground">
            {countTickets} {countTickets === 1 ? "Ticket" : "Tickets"}
          </p>
        </div>

        <Button asChild>
          <Link href="/novo">Novo chamado</Link>
        </Button>
      </div>

      {/* FILTROS */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 rounded-md border px-3 text-sm"
        >
          <option value="">Todos os status</option>
          <option value="open">Aberto</option>
          <option value="in_progress">Em andamento</option>
          <option value="done">Resolvido</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="h-11 rounded-md border px-3 text-sm"
        >
          <option value="">Todas as prioridades</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>

        <select
          value={dateOrder}
          onChange={(e) => setDateOrder(e.target.value)}
          className="h-11 rounded-md border px-3 text-sm"
        >
          <option value="">Sem ordenação</option>
          <option value="recentes">Mais recentes</option>
          <option value="antigos">Mais antigos</option>
        </select>
      </div>

      {/* MOBILE */}
      <div className="space-y-3 md:hidden">
        {sortedTickets.map((ticket) => (
          <Link
            key={ticket._id}
            href={`/chamados/${ticket._id}`}
            className="block rounded-xl border p-4 hover:bg-muted/50"
          >
            <div className="flex justify-between mb-2">
              <h2 className="text-sm font-semibold">{ticket.title}</h2>
              <span className="text-xs">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2">
              <Badge className={getStatusClass(ticket.status)}>
                {ticket.status}
              </Badge>

              <Badge className={getPriorityClass(ticket.priority)}>
                {ticket.priority}
              </Badge>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block border rounded-xl overflow-hidden">
        <div className="grid grid-cols-5 px-4 py-3 font-medium text-sm border-b">
          <span>Título</span>
          <span>Status</span>
          <span>Prioridade</span>
          <span>Data</span>
        </div>

        {sortedTickets.map((ticket) => (
          <Link
            key={ticket._id}
            href={`/chamados/${ticket._id}`}
            className="grid grid-cols-5 px-4 py-3 text-sm hover:bg-muted/50"
          >
            <span>{ticket.title}</span>

            <span>
              <Badge className={getStatusClass(ticket.status)}>
                {ticket.status}
              </Badge>
            </span>

            <span>
              <Badge className={getPriorityClass(ticket.priority)}>
                {ticket.priority}
              </Badge>
            </span>

            <span>
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChamadosPage;
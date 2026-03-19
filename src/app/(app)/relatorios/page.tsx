"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tickets } from "@/lib/mock-data";
import StatusCharts from "@/components/ui/charts/status-charts";
import PriorityChart from "@/components/ui/charts/priority-charts";

const totalTickets = tickets.length;
const openTickets = tickets.filter((ticket) => ticket.status === "Aberto").length;
const inProgressTickets = tickets.filter(
  (ticket) => ticket.status === "Em andamento"
).length;
const resolvedTickets = tickets.filter(
  (ticket) => ticket.status === "Resolvido"
).length;
const highPriorityTickets = tickets.filter(
  (ticket) => ticket.prioridade === "Alta"
).length;
const mediumPriorityTickets = tickets.filter(
  (ticket) => ticket.prioridade === "Média"
).length;
const lowPriorityTickets = tickets.filter(
  (ticket) => ticket.prioridade === "Baixa"
).length;

const itemsPerPage = 5;

const getStatusClass = (status: string) => {
  if (status === "Aberto") {
    return "bg-green-500 text-white hover:bg-green-500";
  } else if (status === "Em andamento") {
    return "bg-yellow-500 text-black hover:bg-yellow-500";
  } else {
    return "bg-blue-500 text-white hover:bg-blue-500";
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

const RelatoriosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTickets = tickets.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Relatórios</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Resumo geral dos chamados e indicadores do sistema
          </p>
        </div>

        <Button className="w-full cursor-pointer sm:w-auto">
          Exportar PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card className="border-slate-200 bg-slate-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-slate-700 sm:text-lg">
              Total de Chamados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-800 sm:text-3xl">
              {totalTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-700 sm:text-lg">
              Em aberto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-800 sm:text-3xl">
              {openTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700 sm:text-lg">
              Em andamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-800 sm:text-3xl">
              {inProgressTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-700 sm:text-lg">
              Resolvidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-800 sm:text-3xl">
              {resolvedTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-red-700 sm:text-lg">
              Alta prioridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-800 sm:text-3xl">
              {highPriorityTickets}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Status dos Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-65 w-full sm:h-80">
              <StatusCharts
                openTickets={openTickets}
                inProgressTickets={inProgressTickets}
                resolvedTickets={resolvedTickets}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Prioridade dos Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-65 w-full sm:h-80">
              <PriorityChart
                highPriorityTickets={highPriorityTickets}
                mediumPriorityTickets={mediumPriorityTickets}
                lowPriorityTickets={lowPriorityTickets}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Relatório de chamados</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="hidden grid-cols-[2fr_1.2fr_1.2fr_1fr_1fr] border-b pb-3 text-sm font-medium text-muted-foreground md:grid">
            <span>Título</span>
            <span>Cliente</span>
            <span>Status</span>
            <span>Prioridade</span>
            <span>Data</span>
          </div>

          <div className="space-y-3 md:hidden">
            {paginatedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-xl border p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {ticket.titulo}
                  </h3>
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
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            {paginatedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-[2fr_1.2fr_1.2fr_1fr_1fr] items-center gap-3 border-b py-3 last:border-b-0"
              >
                <span className="truncate font-medium">{ticket.titulo}</span>
                <span className="truncate text-sm text-muted-foreground">
                  {ticket.cliente}
                </span>
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
                <span className="text-sm text-muted-foreground">
                  {ticket.data}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                size="sm"
              >
                Anterior
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(index + 1)}
                  size="sm"
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                size="sm"
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosPage;
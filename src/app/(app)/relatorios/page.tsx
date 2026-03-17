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
    return "bg-green-500 text-white";
  } else if (status === "Em andamento") {
    return "bg-yellow-500 text-black";
  } else {
    return "bg-blue-500 text-white";
  }
};

const RelatoriosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTickets = tickets.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Resumo geral dos chamados e indicadores do sistema
          </p>
        </div>

        <Button>Exportar PDF</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card className="border-slate-200 bg-slate-50">
          <CardHeader>
            <CardTitle className="text-slate-700">Total de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-800">{totalTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Em aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-800">{openTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-700">Em andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-800">
              {inProgressTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-800">{resolvedTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Alta prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-800">
              {highPriorityTickets}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Status dos Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusCharts
              openTickets={openTickets}
              inProgressTickets={inProgressTickets}
              resolvedTickets={resolvedTickets}
            />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Prioridade dos Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <PriorityChart
              highPriorityTickets={highPriorityTickets}
              mediumPriorityTickets={mediumPriorityTickets}
              lowPriorityTickets={lowPriorityTickets}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Relatório de chamados</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-5 border-b pb-3 text-sm font-medium text-muted-foreground">
            <span>Título</span>
            <span>Cliente</span>
            <span>Status</span>
            <span>Prioridade</span>
            <span>Data</span>
          </div>

          {paginatedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="grid grid-cols-5 items-center border-b py-3 last:border-b-0"
            >
              <span className="font-medium">{ticket.titulo}</span>
              <span className="text-sm text-muted-foreground">
                {ticket.cliente}
              </span>
              <span>
                <Badge className={getStatusClass(ticket.status)}>
                  {ticket.status}
                </Badge>
              </span>
              <span>
                <Badge className="bg-white text-sm text-muted-foreground">
                  {ticket.prioridade}
                </Badge>
              </span>
              <span className="text-sm text-muted-foreground">
                {ticket.data}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
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
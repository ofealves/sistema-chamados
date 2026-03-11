import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tickets } from "@/lib/mock-data";

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

const recentTickets = tickets.slice(0, 5);

const getStatusClass = (status: string) => {
  if (status === "Aberto") {
    return "bg-green-500 text-white";
  } else if (status === "Em andamento") {
    return "bg-yellow-500 text-black";
  } else {
    return "bg-blue-500 text-white";
  }
};

const getPriorityClass = (prioridade: string) => {
  if (prioridade === "Alta") {
    return "bg-red-500 text-white";
  } else if (prioridade === "Média") {
    return "bg-orange-400 text-black";
  } else {
    return "bg-gray-500 text-white";
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos chamados</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle>Total de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalTickets}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{openTickets}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{inProgressTickets}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{resolvedTickets}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alta prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{highPriorityTickets}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Card className="w-200 lg:col-span-2">
          <CardHeader>
            <CardTitle>Chamados recentes</CardTitle>
          </CardHeader>

          <CardContent className="space-y-0">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex w-full items-center justify-between gap-4 border-b py-4 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{ticket.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.cliente}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Badge className={getStatusClass(ticket.status)}>
                    {ticket.status}
                  </Badge>

                  <Badge className={getPriorityClass(ticket.prioridade)}>
                    {ticket.prioridade}
                  </Badge>

                  <span className="text-sm text-muted-foreground">
                    {ticket.data}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="h-70">
          <CardHeader>
            <CardTitle>Resumo por prioridade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">Alta</span>
              <Badge className="bg-red-500 text-white">
                {highPriorityTickets}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">Média</span>
              <Badge className="bg-orange-400 text-black">
                {mediumPriorityTickets}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">Baixa</span>
              <Badge className="bg-gray-500 text-white">
                {lowPriorityTickets}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="h-70">
          <CardHeader>
            <CardTitle>Status dos Chamados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">Aberto</span>
              <Badge className="bg-green-500 text-white">
                {openTickets}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">Em andamento</span>
              <Badge className="bg-yellow-500 text-black">
                {inProgressTickets}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">Resolvido</span>
              <Badge className="bg-blue-500 text-white">
                {resolvedTickets}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
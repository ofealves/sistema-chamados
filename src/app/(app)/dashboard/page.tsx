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

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-700">Em andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-800">
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

      <div className="grid grid-cols-1 lg:grid-cols-4">
      <Card className="w-230 lg:col-span-2">
  <CardHeader>
    <CardTitle>Chamados Recentes</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="grid grid-cols-5 border-b pb-3 text-sm font-medium text-muted-foreground">
      <span>Título</span>
      <span>Cliente</span>
      <span>Status</span>
      <span>Prioridade</span>
      <span>Data</span>
    </div>

    {recentTickets.map((ticket) => (
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
  </CardContent>
</Card>
        <div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2">
        <Card className="h-70 ml-36 col-start-1">
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
    </div>
  );
}
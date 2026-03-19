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

const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const recentTickets = [...tickets]
  .sort((a, b) => {
    const timeA = parseDate(a.data).getTime();
    const timeB = parseDate(b.data).getTime();
    return timeB - timeA;
  })
  .slice(0, 5);

const getStatusClass = (status: string) => {
  if (status === "Aberto") return "bg-green-500 text-white hover:bg-green-500";
  if (status === "Em andamento") return "bg-yellow-500 text-black hover:bg-yellow-500";
  return "bg-blue-500 text-white hover:bg-blue-500";
};

const getPriorityClass = (priority: string) => {
  if (priority === "Alta") return "bg-red-100 text-red-700 hover:bg-red-100";
  if (priority === "Média") return "bg-orange-100 text-orange-700 hover:bg-orange-100";
  return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Visão geral dos chamados
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-5">
        <Card className="border-slate-200 bg-slate-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-700 md:text-base">
              Total de Chamados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-800 md:text-3xl">
              {totalTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700 md:text-base">
              Em aberto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-800 md:text-3xl">
              {openTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-700 md:text-base">
              Em andamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-800 md:text-3xl">
              {inProgressTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700 md:text-base">
              Resolvidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-800 md:text-3xl">
              {resolvedTickets}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 border-red-200 bg-red-50 sm:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-700 md:text-base">
              Alta prioridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-800 md:text-3xl">
              {highPriorityTickets}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card className="min-w-0 w-full xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Chamados Recentes
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* Mobile: cards empilhados */}
            <div className="space-y-3 p-4 md:hidden">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="rounded-xl border p-4">
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
                      <Badge className={`text-xs ${getStatusClass(ticket.status)}`}>
                        {ticket.status}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityClass(ticket.prioridade)}`}>
                        {ticket.prioridade}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: tabela */}
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-175 w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Título
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Cliente
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Prioridade
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Data
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {recentTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="max-w-45 px-4 py-3 font-medium">
                        <span className="block truncate">{ticket.titulo}</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {ticket.cliente}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`whitespace-nowrap text-xs ${getStatusClass(ticket.status)}`}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`whitespace-nowrap text-xs ${getPriorityClass(ticket.prioridade)}`}>
                          {ticket.prioridade}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {ticket.data}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Resumo por prioridade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Alta</span>
              <Badge className="bg-red-500 text-white hover:bg-red-500">
                {highPriorityTickets}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Média</span>
              <Badge className="bg-orange-400 text-black hover:bg-orange-400">
                {mediumPriorityTickets}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Baixa</span>
              <Badge className="bg-gray-500 text-white hover:bg-gray-500">
                {lowPriorityTickets}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Status dos Chamados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Aberto</span>
              <Badge className="bg-green-500 text-white hover:bg-green-500">
                {openTickets}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Em andamento</span>
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
                {inProgressTickets}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Resolvido</span>
              <Badge className="bg-blue-500 text-white hover:bg-blue-500">
                {resolvedTickets}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

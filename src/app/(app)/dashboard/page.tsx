'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { getTickets, createTicket } from "@/services/api";

const getStatusClass = (status: string) => {
  if (status === "open") return "bg-green-500 text-white hover:bg-green-500";
  if (status === "in_progress") return "bg-yellow-500 text-black hover:bg-yellow-500";
  return "bg-blue-500 text-white hover:bg-blue-500";
};

const getPriorityClass = (priority: string) => {
  if (priority === "high") return "bg-red-100 text-red-700 hover:bg-red-100";
  if (priority === "medium") return "bg-orange-100 text-orange-700 hover:bg-orange-100";
  return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100";
};

const translateStatus = (status: string) => {
  if (status === "open") return "Aberto";
  if (status === "in_progress") return "Em andamento";
  return "Resolvido";
};

const translatePriority = (priority: string) => {
  if (priority === "high") return "Alta";
  if (priority === "medium") return "Média";
  return "Baixa";
};

export default function DashboardPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getTickets().then(data => setTickets(data));
  }, []);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "in_progress").length;
  const resolvedTickets = tickets.filter((t) => t.status === "closed").length;
  const highPriorityTickets = tickets.filter((t) => t.priority === "high").length;
  const mediumPriorityTickets = tickets.filter((t) => t.priority === "medium").length;
  const lowPriorityTickets = tickets.filter((t) => t.priority === "low").length;

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handleQuickCreate = async () => {
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      const newTicket = await createTicket(title, description, priority);
      setTickets(prev => [newTicket, ...prev]);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao criar ticket", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground md:text-base">Visão geral dos chamados</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card className="border-slate-200 bg-slate-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-700 md:text-base">Total de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-800 md:text-3xl">{totalTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700 md:text-base">Em aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-800 md:text-3xl">{openTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-700 md:text-base">Em andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-800 md:text-3xl">{inProgressTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700 md:text-base">Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-800 md:text-3xl">{resolvedTickets}</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-700 md:text-base">Alta prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-800 md:text-3xl">{highPriorityTickets}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card className="min-w-0 w-full xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Chamados Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3 p-4 md:hidden">
              {recentTickets.map((ticket) => (
                <div key={ticket._id} className="rounded-xl border p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-sm font-semibold">{ticket.title}</h3>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`text-xs ${getStatusClass(ticket.status)}`}>
                      {translateStatus(ticket.status)}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityClass(ticket.priority)}`}>
                      {translatePriority(ticket.priority)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-175 w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Título</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prioridade</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentTickets.map((ticket) => (
                    <tr key={ticket._id} className="transition-colors hover:bg-muted/30">
                      <td className="max-w-45 px-4 py-3 font-medium">
                        <span className="block truncate">{ticket.title}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`whitespace-nowrap text-xs ${getStatusClass(ticket.status)}`}>
                          {translateStatus(ticket.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`whitespace-nowrap text-xs ${getPriorityClass(ticket.priority)}`}>
                          {translatePriority(ticket.priority)}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
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
            <CardTitle className="text-base md:text-lg">Resumo por prioridade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Alta</span>
              <Badge className="bg-red-500 text-white hover:bg-red-500">{highPriorityTickets}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Média</span>
              <Badge className="bg-orange-400 text-black hover:bg-orange-400">{mediumPriorityTickets}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <span className="font-medium">Baixa</span>
              <Badge className="bg-gray-500 text-white hover:bg-gray-500">{lowPriorityTickets}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Novo chamado rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {success && (
              <p className="text-sm text-green-600 font-medium">✅ Chamado criado com sucesso!</p>
            )}
            <Input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Descrição"
              className="min-h-20 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
            <Button
              className="w-full"
              onClick={handleQuickCreate}
              disabled={submitting || !title.trim() || !description.trim()}
            >
              {submitting ? "Criando..." : "Criar chamado"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
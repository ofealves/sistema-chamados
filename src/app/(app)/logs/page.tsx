"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLogs } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const translateAction = (action: string) => {
    if (action === "ticket_created") return "Ticket criado";
    if (action === "ticket_updated") return "Status atualizado";
    if (action === "ticket_deleted") return "Ticket deletado";
    return action;
};

const getActionClass = (action: string) => {
    if (action === "ticket_created") return "bg-green-100 text-green-700";
    if (action === "ticket_updated") return "bg-yellow-100 text-yellow-700";
    if (action === "ticket_deleted") return "bg-red-100 text-red-700";
    return "bg-zinc-100 text-zinc-700";
};

const formatDate = (date: string) => {
    if (!date) return "Data inválida";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "Data inválida";
    }

    return parsedDate.toLocaleString("pt-BR");
};

const LogsPage = () => {
    const router = useRouter();
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== "admin") {
            router.push("/dashboard");
            return;
        }

        const fetchLogs = async () => {
            try {
                const data = await getLogs();
                setLogs(data);
            } catch (error) {
                console.error("Erro ao buscar logs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <p className="p-6 text-muted-foreground">Carregando logs...</p>;

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold md:text-3xl">Logs de Auditoria</h1>
                <p className="text-sm text-muted-foreground">
                    Registro de todas as ações realizadas no sistema
                </p>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-base">{logs.length} registros encontrados</CardTitle>
                </CardHeader>
                <CardContent className="p-0">

                    {/* MOBILE */}
                    <div className="space-y-3 p-4 md:hidden">
                        {logs.map((log) => (
                            <div key={log._id} className="rounded-xl border p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <Badge className={getActionClass(log.action)}>
                                        {translateAction(log.action)}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(log.createdAt).toLocaleString("pt-BR")}
                                    </span>
                                </div>
                                <p className="text-sm font-medium">{log.details}</p>
                                <p className="text-xs text-muted-foreground">
                                    Por: {log.userId?.name || "—"} ({log.userId?.email || "—"})
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Ticket: {log.ticketId?.title || "removido"}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden w-full md:block overflow-x-auto">
                        <table className="w-full min-w-300 text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ação</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Usuário</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ticket</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Detalhes</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {logs.map((log) => (
                                    <tr key={log._id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <Badge className={getActionClass(log.action)}>
                                                {translateAction(log.action)}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium">{log.userId?.name || "—"}</p>
                                            <p className="text-xs text-muted-foreground">{log.userId?.email || "—"}</p>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {log.ticketId?.title || "removido"}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {log.details}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                            {formatDate(log.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default LogsPage;
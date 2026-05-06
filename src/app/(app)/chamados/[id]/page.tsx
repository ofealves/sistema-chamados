"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTicketById, updateTicket, deleteTicket } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    if (status === "closed") return "Resolvido";
    return status;
};

const translatePriority = (priority: string) => {
    if (priority === "high") return "Alta";
    if (priority === "medium") return "Média";
    if (priority === "low") return "Baixa";
    return priority;
};

const ChamadoDetalhePage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setIsAdmin(user.role === "admin");

        const fetchTicket = async () => {
            try {
                const data = await getTicketById(id as string);
                setTicket(data);
            } catch (error) {
                console.error("Erro ao buscar ticket", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    const handleUpdate = async (status: string) => {
        setUpdating(true);
        try {
            await updateTicket(id as string, status);
            setTicket((prev: any) => ({ ...prev, status }));
        } catch (error) {
            console.error("Erro ao atualizar", error);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Tem certeza que deseja deletar este ticket?");
        if (!confirmDelete) return;

        try {
            await deleteTicket(id as string);
            router.push("/chamados");
        } catch (error) {
            console.error("Erro ao deletar", error);
        }
    };

    if (loading) return (
        <div className="p-6 flex items-center gap-2 text-muted-foreground">
            <span>Carregando ticket...</span>
        </div>
    );

    if (!ticket) return (
        <div className="p-6">
            <p className="text-muted-foreground">Ticket não encontrado.</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/chamados")}>
                Voltar
            </Button>
        </div>
    );

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-2xl">

            <Button variant="outline" size="sm" onClick={() => router.push("/chamados")}>
                ← Voltar
            </Button>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <CardTitle className="text-xl">{ticket.title}</CardTitle>
                        <div className="flex gap-2">
                            <Badge className={getStatusClass(ticket.status)}>
                                {translateStatus(ticket.status)}
                            </Badge>
                            <Badge className={getPriorityClass(ticket.priority)}>
                                {translatePriority(ticket.priority)}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Descrição</p>
                        <p className="text-sm">{ticket.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium text-muted-foreground">Criado em</p>
                            <p>{new Date(ticket.createdAt).toLocaleDateString("pt-BR", {
                                day: "2-digit", month: "long", year: "numeric"
                            })}</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Última atualização</p>
                            <p>{new Date(ticket.updatedAt).toLocaleDateString("pt-BR", {
                                day: "2-digit", month: "long", year: "numeric"
                            })}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isAdmin && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Gerenciar ticket</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Atualizar status:</p>
                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    size="sm"
                                    disabled={updating || ticket.status === "open"}
                                    variant={ticket.status === "open" ? "default" : "outline"}
                                    onClick={() => handleUpdate("open")}
                                >
                                    Aberto
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={updating || ticket.status === "in_progress"}
                                    variant={ticket.status === "in_progress" ? "default" : "outline"}
                                    onClick={() => handleUpdate("in_progress")}
                                >
                                    Em andamento
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={updating || ticket.status === "closed"}
                                    variant={ticket.status === "closed" ? "default" : "outline"}
                                    onClick={() => handleUpdate("closed")}
                                >
                                    Resolvido
                                </Button>
                            </div>
                        </div>

                        <div className="pt-2 border-t">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={updating}
                            >
                                Deletar ticket
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ChamadoDetalhePage;
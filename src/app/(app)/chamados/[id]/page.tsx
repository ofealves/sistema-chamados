"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTicketById, updateTicket, deleteTicket } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        try {
            await updateTicket(id as string, status);
            setTicket((prev: any) => ({ ...prev, status }));
        } catch (error) {
            console.error("Erro ao atualizar", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Tem certeza que deseja deletar?");
        if (!confirmDelete) return;

        try {
            await deleteTicket(id as string);
            router.push("/chamados");
        } catch (error) {
            console.error("Erro ao deletar", error);
        }
    };

    if (loading) return <p className="p-6">Carregando...</p>;
    if (!ticket) return <p className="p-6">Ticket não encontrado</p>;

    return (
        <div className="p-6 space-y-6 max-w-2xl">
            <h1 className="text-2xl font-bold">{ticket.title}</h1>

            <p className="text-muted-foreground">{ticket.description}</p>

            <div className="flex gap-3">
                <Badge>{translateStatus(ticket.status)}</Badge>
                <Badge variant="outline">{translatePriority(ticket.priority)}</Badge>
            </div>

            {isAdmin && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Atualizar status:</p>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            variant={ticket.status === "open" ? "default" : "outline"}
                            onClick={() => handleUpdate("open")}
                        >
                            Aberto
                        </Button>
                        <Button
                            variant={ticket.status === "in_progress" ? "default" : "outline"}
                            onClick={() => handleUpdate("in_progress")}
                        >
                            Em andamento
                        </Button>
                        <Button
                            variant={ticket.status === "closed" ? "default" : "outline"}
                            onClick={() => handleUpdate("closed")}
                        >
                            Resolvido
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Deletar
                        </Button>
                    </div>
                </div>
            )}

            <Button variant="outline" onClick={() => router.push("/chamados")}>
                Voltar
            </Button>
        </div>
    );
};

export default ChamadoDetalhePage;
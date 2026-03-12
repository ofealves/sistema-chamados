import { tickets } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ChamadoDetalhePage = async ({ params }: Props) => {
  const { id } = await params;

  const ticket = tickets.find((item) => item.id === id);

  if (!ticket) {
    return <div className="p-6">Chamado não encontrado.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">{ticket.titulo}</h1>
        <p className="text-muted-foreground">{ticket.cliente}</p>
      </div>

      <div className="space-y-4 rounded-xl border bg-background p-6">
        <div className="flex gap-3">
          <Badge>{ticket.status}</Badge>
          <Badge variant="outline">{ticket.prioridade}</Badge>
        </div>

        <div>
          <h2 className="font-semibold">Descrição</h2>
          <p className="text-muted-foreground">
            Descrição mockada do problema para estrutura inicial da página.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChamadoDetalhePage;
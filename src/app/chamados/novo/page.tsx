import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const NovoChamadoPage = () => {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Novo chamado</h1>
        <p className="text-muted-foreground">
          Abra um novo ticket de suporte
        </p>
      </div>

      <form className="space-y-4 rounded-xl border bg-background p-6">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título</Label>
          <Input id="titulo" placeholder="Digite o título do chamado" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Input id="cliente" placeholder="Nome do cliente ou empresa" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            placeholder="Descreva o problema"
            className="min-h-35"
          />
        </div>

        <Button type="submit">Criar chamado</Button>
      </form>
    </div>
  );
}

export default NovoChamadoPage;
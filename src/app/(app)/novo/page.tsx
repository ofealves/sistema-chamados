'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTicket } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ticketSchema = z.object({
  title: z.string().min(3, { message: "Título obrigatório" }),
  description: z.string().min(5, { message: "Descrição obrigatória" }),
  priority: z.enum(["low", "medium", "high"]),
});

type ticketFormData = z.infer<typeof ticketSchema>;

const NovoChamadoPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ticketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (data: ticketFormData) => {
    const response = await createTicket(data.title, data.description, data.priority);
    console.log(response);
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Novo chamado</h1>
        <p className="text-muted-foreground">Abra um novo ticket de suporte</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border bg-background p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Digite o título do chamado" {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva o problema"
            className="min-h-35"
            {...register("description")}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade</Label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
          {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar chamado"}
        </Button>
      </form>
    </div>
  );
};

export default NovoChamadoPage;
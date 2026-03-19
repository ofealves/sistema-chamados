"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string(), // .email("Digite um e-mail válido"),
  password: z.string(), // .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (_data: LoginFormData) => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center bg-zinc-900 px-12 text-zinc-100">
          <div className="max-w-md space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Nexou</h1>
              <p className="mt-2 text-zinc-400">
                Plataforma de gestão de chamados com dashboard, relatórios e
                acompanhamento completo do atendimento.
              </p>
            </div>

            <div className="space-y-3 text-sm text-zinc-400">
              <p>• Organize tickets e prioridades em um só lugar</p>
              <p>• Acompanhe o andamento do suporte com mais clareza</p>
              <p>• Visualize métricas e relatórios de forma centralizada</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-zinc-200 bg-white shadow-sm">
            <CardHeader className="space-y-2">
              <div className="mb-2 lg:hidden">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                  Nexou
                </h1>
                <p className="text-sm text-zinc-500">Sistema de Chamados</p>
              </div>

              <CardTitle className="text-2xl text-zinc-900">Entrar</CardTitle>
              <CardDescription className="text-zinc-500">
                Acesse sua conta para continuar
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@empresa.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-zinc-900 text-white hover:bg-zinc-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <Link
                    href="/cadastro"
                    className="text-zinc-700 hover:text-zinc-900 hover:underline"
                  >
                    Criar conta
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      alert("A recuperação de senha será implementada em breve.")
                    }
                    className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
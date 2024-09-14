import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

import { SignUpForm } from "./schemas/sign-up.schemas";
import { ToastAction } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: mutateRestaurant } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignIn(data: SignUpForm) {
    try {
      await mutateRestaurant(data);

      toast({
        title: "Restaurante cadastrado com sucesso!!",
        description: "Enviamos um link de autenticação para o seu email.",
        variant: "success",
        action: (
          <ToastAction
            altText="to sign in"
            onClick={() => navigate("/sign-in")}
          >
            Entrar
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: "Alguma coisa deu errado!",
        description: "Verifique suas credenciais.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="p-8">
        <Button variant="link" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <section className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece as suas vendas!!
            </p>
          </section>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input
                id="email"
                placeholder="Insira seu email"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do restaurante</Label>
              <Input
                id="restaurantName"
                placeholder="Insira seu email"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Insira seu nome"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="Insira seu telefone"
                {...register("phone")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Finalizar cadastro"
              )}
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar você concorda com nossos{" "}
              <a href="#" className="underline underline-offset-1">
                termos de serviço
              </a>{" "}
              e{" "}
              <a href="#" className="underline underline-offset-1">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

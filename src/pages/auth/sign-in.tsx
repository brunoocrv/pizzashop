import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

import { SignInForm } from "./schemas/sign-in.schemas";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: mutateAuth } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await mutateAuth({ email: data.email });

      toast({
        title: "Tudo certo por aqui!!",
        description: "Enviamos um link de autenticação para o seu email.",
        variant: "success",
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
      <Helmet title="Sign In" />
      <div className="p-8">
        <Button variant="link" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <section className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel de parceiro!
            </p>
          </section>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label>Seu email</Label>
              <Input placeholder="Insira seu email" {...register("email")} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Acessar painel"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

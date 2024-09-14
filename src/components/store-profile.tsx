import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { updateProfile, UpdateProfileProps } from "@/api/update-profile";
import { toast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof schema>;

export function StoreProfile() {
  const queryClient = useQueryClient();
  const { data: restaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-profile"],
  });

  const { register, handleSubmit, formState } = useForm<StoreProfileSchema>({
    values: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
    },
    resolver: zodResolver(schema),
  });

  function updatedManagedRestaurantCache({
    name,
    description,
  }: UpdateProfileProps) {
    const chachedRestaurant = queryClient.getQueryData(["managed-restaurant"]);

    if (chachedRestaurant) {
      queryClient.setQueryData(["managed-restaurant"], {
        ...chachedRestaurant,
        name,
        description,
      });
    }

    return { chachedRestaurant };
  }

  const { mutateAsync: mutationProfile } = useMutation({
    mutationFn: updateProfile,
    onMutate: (variables) => {
      const { chachedRestaurant } = updatedManagedRestaurantCache({
        name: variables.name,
        description: variables.description,
      });

      return { previousRestaurantCached: chachedRestaurant };
    },
    onError: (_, __, context) => {
      if (context?.previousRestaurantCached) {
        updatedManagedRestaurantCache(context.previousRestaurantCached);
      }
    },
  });

  async function onHandleSubmit(data: StoreProfileSchema) {
    try {
      await mutationProfile({
        name: data.name,
        description: data.description,
      });

      toast({
        description: "Perfil atualizado com sucesso",
        variant: "success",
      });
    } catch {
      toast({
        description: "Não conseguimos atualizar seu perfil",
        variant: "destructive",
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Atualizar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

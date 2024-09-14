import { Building, ChevronDown, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";

import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfile } from "./store-profile";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
  const navigate = useNavigate();
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ["me"],
  });

  const { data: restaurant, isLoading: restaurantLoading } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-restaurant"],
  });

  const { mutateAsync: mutateSignOut, isPending: pendingSignOut } = useMutation(
    {
      mutationFn: signOut,
      onSuccess: () => {
        navigate("/sign-in", {
          replace: true,
        });
      },
    },
  );

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {restaurantLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              restaurant?.name
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {profileLoading ? (
              <div className="space-y-2.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <span>{profileData?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profileData?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={pendingSignOut}
          >
            <button className="w-full" onClick={() => mutateSignOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfile />
    </Dialog>
  );
}

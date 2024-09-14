import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router-dom";

const schema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilter = z.infer<typeof schema>;

export function OrderFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<OrderFilter>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  function handleFilter(data: OrderFilter) {
    setSearchParams((state) => {
      !data.orderId
        ? state.delete("orderId")
        : state.set("orderId", data.orderId);

      !data.customerName
        ? state.delete("customerName")
        : state.set("customerName", data.customerName);

      !data.status ? state.delete("status") : state.set("status", data.status);

      state.set("page", "1");

      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");

      state.set("page", "1");

      reset({
        orderId: "",
        customerName: "",
        status: "all",
      });

      return state;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            defaultValue="all"
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            disabled={field.disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={() => handleClearFilters()}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}

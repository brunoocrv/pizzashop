import { OrderStatus } from "@/api/get-orders";

export interface OrderStatusProps {
  status: OrderStatus;
}

const statusMapper: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

export function OrderStatusResolve({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-rose-400" />
      )}
      {status === "delivered" && (
        <span className="h-2 w-2 rounded-full bg-green-400" />
      )}
      {status === "delivering" && (
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
      )}
      {status === "processing" && (
        <span className="h-2 w-2 rounded-full bg-blue-400" />
      )}
      <span className="font-medium text-muted-foreground">
        {statusMapper[status]}
      </span>
    </div>
  );
}

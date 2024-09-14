import { ArrowRight, Search, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { OrderDetails } from "./order-details";
import { OrderStatusResolve } from "./order-status-resolve";

import { GetOrdersResponse, Order, OrderStatus } from "@/api/get-orders";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

export interface OrderItemProps {
  order: Order;
}

export function OrderItem({ order }: OrderItemProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  const queryClient = useQueryClient();

  function changeOrderStatusInCache(orderId: string, status: OrderStatus) {
    const ordersCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["get-orders"],
    });

    ordersCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((item) => {
          if (item.orderId === orderId) {
            return { ...item, status };
          }

          return item;
        }),
      });
    });
  }

  const { mutateAsync: mutateCancelOrder, isPending: isCancelling } =
    useMutation({
      mutationFn: () => cancelOrder(order.orderId),
      mutationKey: ["cancel-order", order.orderId],
      onSuccess: async () => {
        changeOrderStatusInCache(order.orderId, "canceled");
      },
    });

  const { mutateAsync: mutateApproveOrder, isPending: isApproving } =
    useMutation({
      mutationFn: () => approveOrder(order.orderId),
      mutationKey: ["approve-order", order.orderId],
      onSuccess: async () => {
        changeOrderStatusInCache(order.orderId, "processing");
      },
    });

  const { mutateAsync: mutateDeliverOrder, isPending: isDelivering } =
    useMutation({
      mutationFn: () => deliverOrder(order.orderId),
      mutationKey: ["deliver-order", order.orderId],
      onSuccess: async () => {
        changeOrderStatusInCache(order.orderId, "delivered");
      },
    });

  const { mutateAsync: mutateDispatchOrder, isPending: isDispatching } =
    useMutation({
      mutationFn: () => dispatchOrder(order.orderId),
      mutationKey: ["dispatch-order", order.orderId],
      onSuccess: async () => {
        changeOrderStatusInCache(order.orderId, "delivering");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} isOpen={detailOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatusResolve status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            size="xs"
            variant="outline"
            onClick={() => mutateApproveOrder()}
            disabled={isApproving}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {order.status === "processing" && (
          <Button
            size="xs"
            variant="outline"
            disabled={isDispatching}
            onClick={() => mutateDispatchOrder()}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}
        {order.status === "delivering" && (
          <Button
            size="xs"
            variant="outline"
            disabled={isDelivering}
            onClick={() => mutateDeliverOrder()}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="xs"
          disabled={
            !["pending", "processing"].includes(order.status) || isCancelling
          }
          onClick={() => mutateCancelOrder()}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}

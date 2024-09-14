import { api } from "@/lib/axios";

export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

export interface QueryOrders {
  pageIndex: number;
  orderId?: string | null;
  customerName?: string | null;
  status: string | null;
}

export interface Order {
  orderId: string;
  createdAt: Date;
  status: OrderStatus;
  customerName: string;
  total: number;
}

export interface GetOrdersResponse {
  orders: Array<Order>;
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: QueryOrders) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });

  return response.data;
}

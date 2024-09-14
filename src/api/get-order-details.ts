import { api } from "@/lib/axios";
import { OrderStatus } from "./get-orders";

export interface OrderDetail {
  id: string;
  createdAt: Date;
  status: OrderStatus;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: Array<{
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }>;
}

export async function getOrderDetails(orderId: string) {
  const response = await api.get<OrderDetail>(`/orders/${orderId}`);

  return response.data;
}

import { api } from "@/lib/axios";

export interface RestaurantProps {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getManagedRestaurant() {
  const response = await api.get<RestaurantProps>("/managed-restaurant");

  return response.data;
}

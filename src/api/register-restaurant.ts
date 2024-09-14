import { api } from "@/lib/axios";

export interface RegisterRestaurantBody {
  email: string;
  restaurantName: string;
  managerName: string;
  phone: string;
}

export async function registerRestaurant(restaurant: RegisterRestaurantBody) {
  await api.post("/restaurants", { ...restaurant });
}

import { api } from "@/lib/axios";

export interface MeProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "manager" | "customer";
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getProfile() {
  const response = await api.get<MeProps>("/me");

  return response.data;
}

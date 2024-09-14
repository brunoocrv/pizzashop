import { api } from "@/lib/axios";

export interface UpdateProfileProps {
  name: string;
  description?: string;
}

export async function updateProfile(data: UpdateProfileProps) {
  await api.put("/profile", { ...data });
}

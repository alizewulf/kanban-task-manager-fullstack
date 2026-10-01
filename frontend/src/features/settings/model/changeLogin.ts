import { api } from "@/shared/config/api/api.config";
import { apiClient } from "@/shared/config/api/apiClient";
import type { ChangeLoginValues } from "./settings.types";

export async function changeLogin(values: ChangeLoginValues) {
  const response = await apiClient.post(api.auth.changeLogin, {
    newLogin: values.newLogin,
    password: values.password,
  });

  return response.data.data as { id: number; login: string };
}

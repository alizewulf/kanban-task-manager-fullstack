import { api } from "@/shared/config/api/api.config";
import { apiClient } from "@/shared/config/api/apiClient";
import type { ChangePasswordValues } from "./settings.types";

export async function changePassword(values: ChangePasswordValues) {
  const response = await apiClient.post(api.auth.changePassword, {
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
  });

  return response.data.message as string;
}

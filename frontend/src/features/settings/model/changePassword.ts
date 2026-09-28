import axios from "axios";
import { api } from "@/shared/config/api/api.config";
import type { ChangePasswordValues } from "./settings.types";

export async function changePassword(userId: number, values: ChangePasswordValues) {
  const response = await axios.post(api.auth.changePassword, {
    userId,
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
  });

  return response.data.message as string;
}

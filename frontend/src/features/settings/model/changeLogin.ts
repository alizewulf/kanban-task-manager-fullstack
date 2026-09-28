import axios from "axios";
import { api } from "@/shared/config/api/api.config";
import type { ChangeLoginValues } from "./settings.types";

export async function changeLogin(userId: number, values: ChangeLoginValues) {
  const response = await axios.post(api.auth.changeLogin, {
    userId,
    oldLogin: values.oldLogin,
    newLogin: values.newLogin,
    password: values.password,
  });

  return response.data.data as { id: number; login: string };
}

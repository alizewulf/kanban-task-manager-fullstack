import { api } from "../../../../shared/config/api/api.config";
import { apiClient } from "../../../../shared/config/api/apiClient";
import type { User } from "../../../../entities/users/interface";

interface AuthResponse {
  message: string;
  data: User;
  accessToken: string;
}

const createUser = async (user: Omit<User, "id"> & { password: string }) => {
    const response = await apiClient.post<AuthResponse>(api.users.create, user);
    return response.data;
};
export default createUser 
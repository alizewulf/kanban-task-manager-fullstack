import axios from "axios";
import { api } from "./api.config";
import { clearAccessToken, getAccessToken } from "./accessToken";

export const apiClient = axios.create({ baseURL: api.baseUrl });

apiClient.interceptors.request.use((config) => {
  const url = config.url ?? "";
  const isPublicAuthRequest = url.endsWith("/auth/login") || url.endsWith("/users");
  const token = isPublicAuthRequest ? null : getAccessToken();

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config?.headers?.Authorization
    ) {
      clearAccessToken();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }

    return Promise.reject(error);
  },
);
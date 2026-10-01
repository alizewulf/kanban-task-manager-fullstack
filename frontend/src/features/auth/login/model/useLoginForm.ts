import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch } from "../../../../store/store";
import { setAuth } from "./authSlice";
import { api } from "../../../../shared/config/api/api.config";
import { apiClient } from "../../../../shared/config/api/apiClient";
import { setAccessToken } from "../../../../shared/config/api/accessToken";
import type { User } from "../../../../entities/users/interface";

interface AuthResponse {
  data: User;
  accessToken: string;
}

interface LoginFormValues {
  login: string;
  password: string;
}

function getLoginErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Unable to sign in. Please try again.";
  }

  const status = error.response?.status;
  const backendMessage = typeof error.response?.data?.message === "string"
    ? error.response.data.message.trim()
    : "";

  if (error.code === "ERR_NETWORK" || !error.response) {
    return "Unable to connect to the server. Please check your connection and try again.";
  }

  if (status && status >= 500) {
    return "The server is currently unavailable. Please try again later.";
  }

  if (status === 401 || status === 400) {
    const normalizedMessage = backendMessage.toLowerCase();

    if (
      !backendMessage ||
      normalizedMessage.includes("invalid login") ||
      normalizedMessage.includes("wrong login") ||
      normalizedMessage.includes("authentication required") ||
      normalizedMessage.includes("incorrect")
    ) {
      return "Invalid login or password.";
    }

    return backendMessage;
  }

  if (backendMessage) {
    return backendMessage;
  }

  return "Unable to sign in. Please try again.";
}

function useLoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const response = await apiClient.post<AuthResponse>(api.auth.login, {
          login: values.login,
          password: values.password,
        });
        setAccessToken(response.data.accessToken);
        dispatch(setAuth({
          user: response.data.data,
        }));
        navigate("/app", { replace: true });
      } catch (error) {
        setStatus(getLoginErrorMessage(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const clearErrorOnFieldChange = (event: { target: { name?: string } }) => {
    formik.handleChange(event);
    if (formik.status) {
      formik.setStatus(undefined);
    }
  };

  return {
    formik,
    isSubmitLocked: formik.isSubmitting,
    clearErrorOnFieldChange,
  };
}

export default useLoginForm;

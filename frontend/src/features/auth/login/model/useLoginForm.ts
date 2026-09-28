import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch } from "../../../../store/store";
import { setAuth } from "./authSlice";
import { api } from "../../../../shared/config/api/api.config";

interface LoginFormValues {
  login: string;
  password: string;
  rememberMe: boolean;
}

function useLoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const response = await axios.post(api.auth.login, {
          login: values.login,
          password: values.password,
        });
        dispatch(setAuth({
          isAuth: true,
          user: response.data.data,
          rememberMe: values.rememberMe,
        }));
        navigate("/app", { replace: true });
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message
          : undefined;
        setStatus(message ?? "Wrong login or password");
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

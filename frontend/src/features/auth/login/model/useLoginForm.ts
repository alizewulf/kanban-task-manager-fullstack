import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import type { User } from "../../../../entities/users/interface";
import type { AppDispatch } from "../../../../store/store";
import { setAuth } from "./authSlice";

interface LoginFormValues {
  login: string;
  password: string;
  rememberMe: boolean;
}

interface UseLoginFormParams {
  login: (
    users: User[],
    form: {
      login: string;
      password: string;
    }
  ) => User | "error";
  users: User[];
  isUsersLoading?: boolean;
}

function useLoginForm({ login, users, isUsersLoading = false }: UseLoginFormParams) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, { setStatus, setSubmitting }) => {
      if (isUsersLoading || users.length === 0) {
        return;
      }

      const result = login(users, {
        login: values.login,
        password: values.password,
      });

      if (result === "error") {
        setSubmitting(false);
        setStatus("Wrong login or password");
        setIsSubmitBlocked(true);
        return;
      }

      setIsSubmitBlocked(false);
      dispatch(setAuth({ isAuth: true, user: result, rememberMe: values.rememberMe }));
      setStatus("Welcome back");
      navigate("/app", { replace: true });
    },
  });

  const clearErrorOnFieldChange = (event: { target: { name?: string } }) => {
    formik.handleChange(event);

    if (isSubmitBlocked || formik.status) {
      setIsSubmitBlocked(false);
      formik.setStatus(undefined);
    }
  };

  const isSubmitLocked =
    isUsersLoading ||
    users.length === 0 ||
    formik.isSubmitting ||
    isSubmitBlocked;

  return {
    formik,
    isSubmitLocked,
    clearErrorOnFieldChange,
  };
}

export default useLoginForm;

import { useState, type FormEvent } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "@/store/store";
import { setAuth, updateAuthUser } from "@/features/auth/login/model/authSlice";
import { useModal } from "@/shared/ui/modal/useModal";
import { changeLogin } from "./changeLogin";
import { changePassword } from "./changePassword";
import type { SettingsFeedback } from "./settings.types";
import { clearAccessToken } from "@/shared/config/api/accessToken";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

export function useSettings() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [newLogin, setNewLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<SettingsFeedback | null>(null);
  const [passwordFeedback, setPasswordFeedback] = useState<SettingsFeedback | null>(null);
  const [isChangingLogin, setIsChangingLogin] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  async function handleLoginChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    setIsChangingLogin(true);
    setLoginFeedback(null);
    try {
      const updatedUser = await changeLogin({
        newLogin,
        password: loginPassword,
      });
      dispatch(updateAuthUser(updatedUser));
      setNewLogin("");
      setLoginPassword("");
      setLoginFeedback({ message: "Login updated successfully.", isSuccess: true });
    } catch (error) {
      setLoginFeedback({
        message: getErrorMessage(error, "Unable to update login."),
        isSuccess: false,
      });
    } finally {
      setIsChangingLogin(false);
    }
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    setIsChangingPassword(true);
    setPasswordFeedback(null);
    try {
      const message = await changePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setPasswordFeedback({
        message: message ?? "Password updated successfully.",
        isSuccess: true,
      });
    } catch (error) {
      setPasswordFeedback({
        message: getErrorMessage(error, "Unable to update password."),
        isSuccess: false,
      });
    } finally {
      setIsChangingPassword(false);
    }
  }

  function handleLogout() {
    clearAccessToken();
    dispatch(setAuth(false));
    closeModal();
    navigate("/login", { replace: true });
  }

  return {
    user,
    form: {
      newLogin,
      loginPassword,
      oldPassword,
      newPassword,
      setNewLogin,
      setLoginPassword,
      setOldPassword,
      setNewPassword,
    },
    loginFeedback,
    passwordFeedback,
    isChangingLogin,
    isChangingPassword,
    handleLoginChange,
    handlePasswordChange,
    handleLogout,
    closeModal,
  };
}

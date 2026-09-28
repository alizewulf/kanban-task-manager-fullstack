export interface SettingsFeedback {
  message: string;
  isSuccess: boolean;
}

export interface ChangeLoginValues {
  oldLogin: string;
  newLogin: string;
  password: string;
}

export interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
}

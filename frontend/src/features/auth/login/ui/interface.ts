import type { User } from "../../../../entities/users/interface";

export interface LoginFormProps {
  login: (
    users: User[],
    form: {
      login: string;
      password: string;
    }
  ) => User | "error";

  users: User[];
}

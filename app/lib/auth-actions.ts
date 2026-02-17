import { authClient } from "../lib/auth-client";

type Props = {
  name: string;
  email: string;
  password: string;
};

export const signup = async ({ name, email, password }: Props) => {
  const res = await authClient.signUp.email({
    name,
    email,
    password,
    callbackURL: "/blog",
  });
  return res;
};

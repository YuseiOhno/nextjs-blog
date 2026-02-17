import { authClient } from "../lib/auth-client";

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type SignInProps = {
  email: string;
  password: string;
  callbackURL?: string;
};

export const signUp = async ({ name, email, password }: SignUpProps) => {
  const res = await authClient.signUp.email({
    name,
    email,
    password,
    callbackURL: "/blog",
  });
  return res;
};

export const signIn = async ({ email, password, callbackURL }: SignInProps) => {
  const res = await authClient.signIn.email({
    email,
    password,
    callbackURL: callbackURL ?? "/blog",
  });
  return res;
};

export const signOut = async () => {
  await authClient.signOut();
};

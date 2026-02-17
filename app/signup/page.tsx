"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../lib/auth-actions";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await signup({
      name,
      email,
      password,
    });

    if (res.error) {
      setError(res.error.message ?? "サインアップに失敗しました。");
      return;
    }

    router.push("/blog");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">アカウントを作成</button>
      {error ? <p>{error}</p> : null}
    </form>
  );
}

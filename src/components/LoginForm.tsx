"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res?.error) {
        router.refresh();
        router.push("/private");
      } else {
        setError("Email ou senha invalidos");
      }
    } catch (error) {
      console.log("[LOGIN_ERROR]", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="p-10 border border-gray-500 rounded-lg"
        onSubmit={handleLogin}
      >
        <h1>Faça Login</h1>
        <div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border outline-none p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border outline-none p-2"
            />
          </div>
          {error && (
            <span className="text-red-500 text-sm font-semibold">{error}</span>
          )}
          <button
            type="submit"
            className="mt-10 bg-sky-500 text-white w-full rounded-sm py-2"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };

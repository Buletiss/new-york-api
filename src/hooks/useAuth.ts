import { useRouter } from "next/router";
import { useState } from "react";
import { loginApi } from "@/services/auth";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setError(null);

    try {
      const response = await loginApi(username, password);
      localStorage.setItem("token", response);
      if (!response || response.error || response.statusCode >= 400) {
        setError("Usuário ou senha inválidos");
        return;
      }

      router.push("/menu");
      localStorage.setItem("token", JSON.stringify(response));
    } catch (error) {
      console.error("Error:", error);
      setError("email ou senha invalido");
    }
  };
  return { handleLogin, error };
}

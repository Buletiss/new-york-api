import { authUser } from "@/services/getUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useUserAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  }

  useEffect(() => {
    async function checkAuth() {
      const userData = await authUser();
      if (!userData) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setUser(userData);
      }
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  return { user, loading };
}

import { authUser } from "@/services/getUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function getUserAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
  }, []);

  return { user, loading };
}

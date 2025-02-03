import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function HandleLogout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}

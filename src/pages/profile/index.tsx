import "@/app/globals.css";
import HandleLogout from "@/components/handleLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/hooks/useUserAuth";
import Link from "next/link";

export default function Profile() {
  const { user } = useUserAuth();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-rich-blue">
      <div className="bg-eggshell w-1/2 h-1/2 rounded-xl flex flex-col items-center justify-evenly">
        <Avatar className="w-16 h-16 ">
          <AvatarImage src={user?.image} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <text className="text-black">{user?.username}</text>
        <text className="text-black">{user?.email}</text>
        <text className="text-black">{user?.phone}</text>
        <div>
          <Button variant="outline">
            <Link href="/menu">Menu</Link>
          </Button>
          <HandleLogout />
        </div>
      </div>
    </div>
  );
}

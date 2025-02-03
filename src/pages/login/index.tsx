import { LoginForm } from "@/components/login-form";
import "@/app/globals.css";
import Image from "next/image";

export default function Authentication() {
  return (
    <>
      <div className="flex flex-row items-center h-screen w-screen bg-rich-blue">
        <div>
          <Image
            src={"/pessoa-jornal.jpg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "50vw", height: "100vh" }}
            alt="Pessoa lendo jornal"
          />
        </div>
        <div className="flex justify-center items-center w-1/2 h-full">
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

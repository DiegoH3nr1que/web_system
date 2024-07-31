import Image from "next/image";
import { NavBar } from "./navBar";

export function Aside(){
    return (
        <aside className="w-64 p-6 bg-white shadow-md">
        <div className="flex justify-center">
          <Image
            src="/image/logo.png"
            alt="Logo"
            width={240}
            height={240}
            className="w-full h-auto"
          />
        </div>
          <NavBar/>
      </aside>
    )
}
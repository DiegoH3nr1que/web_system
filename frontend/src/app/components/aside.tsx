import Image from "next/image";
import { NavBar } from "./navBar";
import { AvatarDemo } from "./avatar";

export function Aside() {
  return (
    <aside className="w-64 p-6 bg-white shadow-md flex flex-col justify-between h-screen">
      <div>
        <div className="flex justify-center">
          <Image
            src="/image/technical-support.png"
            alt="Logo"
            width={240}
            height={240}
            className="w-full h-auto"
          />
        </div>
        <NavBar />
      </div>
      <div className="mt-auto">
        <AvatarDemo />
      </div>
    </aside>
  );
}

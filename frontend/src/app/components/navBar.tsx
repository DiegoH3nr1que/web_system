import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";

export function NavBar() {
  const links = [
    { target: "#", text: "Dashboard", icon: <MdDashboard /> },
    { target: "#", text: "Ambientes", icon: <FaBuilding /> },
    { target: "#", text: "Equipamentos", icon: <MdForklift /> },
    { target: "#", text: "Manutenções", icon: <FaTools /> },
    { target: "#", text: "Usuários", icon: <FaUsers /> },
  ];

  return (
    <nav className="mt-8 space-y-2">
      {links.map((obj) => (
        <a
          href={obj.target}
          className="flex items-center gap-4 p-2 rounded hover:bg-gray-300 transition text-black"
        >
          {obj.icon}
          {obj.text}
        </a>
      ))}
    </nav>
  );
}

import { useRouter } from 'next/navigation';
import { FaBuilding, FaTools, FaUsers } from 'react-icons/fa';
import { MdDashboard, MdForklift } from 'react-icons/md';

export function NavBar() {
  const router = useRouter();

  const links = [
    { target: "/dashboard", text: "Dashboard", icon: <MdDashboard /> },
    { target: "/ambientes", text: "Ambientes", icon: <FaBuilding /> },
    { target: "/equipamentos", text: "Equipamentos", icon: <MdForklift /> },
    { target: "/manutencoes", text: "Manutenções", icon: <FaTools /> },
    { target: "/usuarios", text: "Usuários", icon: <FaUsers /> },
  ];

  const handleNavigation = (target: string) => {
    router.push(target);
  };

  return (
    <nav className="mt-8 space-y-2">
      {links.map((obj) => (
        <div
          onClick={() => handleNavigation(obj.target)}
          className="flex items-center gap-4 p-2 rounded hover:bg-gray-300 transition text-black cursor-pointer"
        >
          {obj.icon}
          {obj.text}
        </div>
      ))}
    </nav>
  );
}

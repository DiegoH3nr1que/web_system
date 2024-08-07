import Link from 'next/link';
import { FaBuilding, FaTools, FaUsers } from 'react-icons/fa';
import { MdDashboard, MdForklift } from 'react-icons/md';

export function NavBar() {
  const links = [
    { target: "/", text: "Dashboard", icon: <MdDashboard /> },
    { target: "/ambientes", text: "Ambientes", icon: <FaBuilding /> },
    { target: "/equipamentos", text: "Equipamentos", icon: <MdForklift /> },
    { target: "/manutencoes", text: "Manutenções", icon: <FaTools /> },
    { target: "/usuarios", text: "Usuários", icon: <FaUsers /> },
  ];

  return (
    <nav className="mt-8 space-y-2">
      {links.map((obj) => (
        <Link key={obj.target} href={obj.target} passHref>
          <div className="flex items-center gap-4 p-2 rounded hover:bg-secondary transition text-foreground cursor-pointer">
            {obj.icon}
            {obj.text}
          </div>
        </Link>
      ))}
    </nav>
  );
}

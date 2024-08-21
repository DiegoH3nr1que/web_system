import { useState } from 'react';
import Link from 'next/link';
import { FaBuilding, FaTools, FaUsers } from 'react-icons/fa';
import { MdDashboard, MdForklift } from 'react-icons/md';
import { BiAddToQueue } from "react-icons/bi";

export function NavBar() {
  const [showEquipamentoSubmenu, setShowEquipamentoSubmenu] = useState(false);

  const links = [
    { target: "/dashboard", text: "Dashboard", icon: <MdDashboard /> },
    { target: "/equipes", text: "Equipes", icon: <BiAddToQueue /> },
    { target: "/ambientes", text: "Ambientes", icon: <FaBuilding /> },
    {
      target: "",
      text: "Equipamentos",
      icon: <MdForklift />,
      submenu: [
        { target: "/equipamentos/maquinas", text: "Máquina" },
        { target: "/equipamentos/pecas", text: "Peça" }
      ]
    },
    { target: "/manutencoes", text: "Manutenções", icon: <FaTools /> },
    { target: "/usuarios", text: "Usuários", icon: <FaUsers /> },
  ];

  return (
    <nav className="mt-8 space-y-2">
      {links.map((obj) => (
        <div
          key={obj.target}
          onMouseEnter={() => obj.submenu && setShowEquipamentoSubmenu(true)}
          onMouseLeave={() => obj.submenu && setShowEquipamentoSubmenu(false)}
          className="relative"
        >
          <Link href={obj.target} passHref>
            <div className="flex items-center gap-4 p-2 rounded hover:bg-secondary transition text-foreground cursor-pointer">
              {obj.icon}
              {obj.text}
            </div>
          </Link>
          {obj.submenu && showEquipamentoSubmenu && (
            <div className="absolute left-full top-0 mt-2 bg-background rounded shadow-lg z-10">
              {obj.submenu.map((submenuItem) => (
                <Link key={submenuItem.target} href={submenuItem.target} passHref>
                  <div className="flex items-center gap-4 p-2 rounded hover:bg-secondary transition text-foreground cursor-pointer">
                    {submenuItem.text}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

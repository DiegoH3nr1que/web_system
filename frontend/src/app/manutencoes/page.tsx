"use client";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { Card } from "../components/card";
import { FaBuilding, FaTools } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";
export default function manuPage() {
  const cards = [
    {
      color: "border bg-gray-300",
      qty: "100",
      text: "Torno Mecânico",
      icon: <FaTools size={48} />,
    },
    {
      color: "border bg-gray-300",
      qty: "100",
      text: "Torno CNC",
      icon: <FaTools size={48} />,
    },
    {
      color: "border bg-gray-300",
      qty: "100",
      text: "Sala de automação",
      icon: <FaTools size={48} />,
    },
    {
      color: "border bg-gray-300",
      qty: "100",
      text: "Auditório",
      icon: <FaTools size={48} />,
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200">
          <header className="text-center p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-blue-900">
              Manutenções
            </h1>
          </header>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {cards.map((props) => (
              <Card
                color={props.color}
                qty={props.qty}
                text={props.text}
                icon={props.icon}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

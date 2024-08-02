"use client";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { Card } from "../components/card";
import { FcHighPriority } from "react-icons/fc";
import { CustomDialog } from "../components/dialog";

export default function manuPage() {
  const cards = [
    {
      color: "border bg-gray-300",
      text: "Torno Mecânico",
      reason: "Quebrou a placa",
      icon: <FcHighPriority size={48} />,
    },
    {
      color: "border bg-gray-300",
      text: "Torno CNC",
      reason: "Quebrou a placa",
      icon: <FcHighPriority size={48} />,
    },
    {
      color: "border bg-gray-300",
      reason: "Quebrou a placa",
      text: "Sala de automação",
      icon: <FcHighPriority size={48} />,
    },
    {
      color: "border bg-gray-300",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200">
          <div className="flex items-center justify-between p-4 rounded-md mb-6">
              <h1 className="text-4xl font-bold uppercase text-blue-900">
                Manutenções
              </h1>

              <CustomDialog
                triggerLabel="Nova ocorrência de manuteção"
                title="Detalhes da Manutenção"
                description="Veja os detalhes da manutenção selecionada!"
                fields={[
                  {
                    id: "maintenance_id",
                    label: "ID da Manutenção",
                    type: "text",
                    defaultValue: "",
                  },
                  {
                    id: "description",
                    label: "Descrição",
                    type: "text",
                    defaultValue: "",
                  },
                  {
                    id: "status",
                    label: "Status",
                    type: "text",
                    defaultValue: "",
                  },
                  {
                    id: "responsible",
                    label: "Responsável",
                    type: "text",
                    defaultValue: "",
                  },
                ]}
              />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {cards.map((props) => (
              <Card
                color={props.color}
                qty={props.text}
                text={props.reason}
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

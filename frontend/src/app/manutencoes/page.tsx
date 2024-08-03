import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import Table from "../components/table";
import { FcHighPriority } from "react-icons/fc";
import { CustomDialog } from "../components/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ManutencaoPage() {
  const cards = [
    {
      color: "border bg-gray-300",
      maintenance_id: "1",
      text: "Torno Mecânico",
      reason: "Quebrou a placa",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Torno Mecânico.",
      person: "Diego",
      priority: "Média",
      equip: "Equipe A",
      status: "Pendente",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "2",
      text: "Torno CNC",
      reason: "Quebrou a placa",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Torno CNC.",
      person: "Diego",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "3",
      reason: "Quebrou a placa",
      text: "Sala de automação",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção da Sala de automação.",
      person: "Diego",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "4",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "5",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "6",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "7",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "8",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "9",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Em andamento",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "10",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Concluída",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "11",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Cancelada",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "12",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      details: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
  ];

  const statusOptions = [
    { value: "pendente", label: "Pendente" },
    { value: "em andamento", label: "Em andamento" },
    { value: "concluída", label: "Concluída" },
    { value: "cancelada", label: "Cancelada" },
  ];

  const PriorityOptions = [
    { value: "minimo", label: "Mínima" },
    { value: "media", label: "Média" },
    { value: "maximo", label: "Máxima" },
  ];

  const EquipOptions = [
    { value: "equipe_a", label: "Equipe A" },
    { value: "equipe_b", label: "Equipe B" },
    { value: "equipe_c", label: "Equipe C" },
  ];
  const columns = [
    { header: "Descrição", accessor: "text" },
    { header: "Razão", accessor: "reason" },
    { header: "Prioridade", accessor: "priority" },
    { header: "Detalhes", accessor: "details" },
    { header: "Responsável", accessor: "person" },
    { header: "Equipe", accessor: "equip" },
    { header: "Status", accessor: "status" },
    { header: "Data", accessor: "date" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 w-full">
          <div className="flex items-center justify-between p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-blue-900">
              Manutenções
            </h1>

            <CustomDialog
              triggerLabel="Nova ocorrência de manutenção"
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
                  type: "select",
                  defaultValue: "",
                  options: statusOptions,
                },
                {
                  id: "priority",
                  label: "Prioridade",
                  type: "select",
                  defaultValue: "",
                  options: PriorityOptions,
                },
                {
                  id: "responsible",
                  label: "Responsável",
                  type: "text",
                  defaultValue: "",
                },
                {
                  id: "date",
                  label: "Data da manutenção",
                  type: "date",
                  defaultValue: "",
                },
                {
                  id: "equip",
                  label: "Equipe de manutenção",
                  type: "select",
                  defaultValue: "",
                  options: EquipOptions,
                },
              ]}
            />
          </div>
          <div className="rounded-md container mx-auto p-4 bg-white w-full">
            <div className="text-2xl font-bold text-black mb-2">
              <h1>Histórico</h1>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-80 w-full overflow-y-auto overflow-x-hidden">
              <Table columns={columns} data={cards} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

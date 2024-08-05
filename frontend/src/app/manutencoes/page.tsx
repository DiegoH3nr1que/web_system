import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import Table from "../components/table";
import { FcHighPriority } from "react-icons/fc";
import { CustomDialog } from "../components/dialog";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function ManutencaoPage() {
  const cards = [
    {
      color: "border bg-gray-300",
      maintenance_id: "1",
      text: "Torno Mecânico",
      reason: "Quebrou a placa",
      icon: <FcHighPriority size={48} />,
      description: "Detalhes da manutenção do Torno Mecânico.",
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
      description: "Detalhes da manutenção do Torno CNC.",
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
      description: "Detalhes da manutenção da Sala de automação.",
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
      description: "Detalhes da manutenção do Auditório.",
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
      description: "Detalhes da manutenção do Auditório.",
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
      description: "Detalhes da manutenção do Auditório.",
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
      description: "Detalhes da manutenção do Auditório.",
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
      description: "Detalhes da manutenção do Auditório.",
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
      description: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Em andamento",
      equip: "Equipe A",
      date: "02/08/2024",
    },
    {
      color: "border bg-gray-300",
      maintenance_id: "12",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      description: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Pendente",
      equip: "Equipe A",
      date: "02/08/2024",
    },
  ];


  const cards2 = [
    
    {
      color: "border bg-gray-300",
      maintenance_id: "10",
      reason: "Quebrou a placa",
      text: "Auditório",
      icon: <FcHighPriority size={48} />,
      description: "Detalhes da manutenção do Auditório.",
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
      description: "Detalhes da manutenção do Auditório.",
      person: "Aguinaldo",
      priority: "Média",
      status: "Cancelada",
      equip: "Equipe A",
      date: "02/08/2024",
    },
  ]



  const statusOptions = [
    { value: "pendente", label: "Pendente" },
    { value: "em andamento", label: "Em andamento" },
    { value: "concluída", label: "Concluída" },
    { value: "cancelada", label: "Cancelada" },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Concluída":
        return "bg-green-100 text-green-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

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
    { header: "Descrição", accessor: "description" },
    { header: "Responsável", accessor: "person" },
    { header: "Equipe", accessor: "equip" },
    { header: "Status", accessor: "status" },
    { header: "Data", accessor: "date" },
  ];

  const formattedDataMan = cards.map((item) => ({
    ...item,
    status: (
      <span className={`px-2 py-1 rounded ${getStatusClass(item.status)}`}>
        {item.status}
      </span>
    ),
  }));





  const formattedDataHist = cards2.map((item) => ({
    ...item,
    status: (
      <span className={`px-2 py-1 rounded ${getStatusClass(item.status)}`}>
        {item.status}
      </span>
    ),
  }));

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-background w-full">
          <div className="flex items-center justify-between p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-foreground">
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
          <div className="rounded-md container mx-auto p-4 bg-background w-full">
            <div className="text-2xl font-bold text-foreground mb-2">
              <h1>Manutenções</h1>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-80 w-full overflow-y-auto overflow-x-hidden">
              <Table
                columns={columns}
                data={formattedDataMan}
                actions={(item) => (
                  <div className="flex space-x-2">
                    <button className="text-foreground">
                      <FaCheck />
                    </button>
                    <button className="text-foreground mr-2">
                      <FaEdit />
                    </button>
                    <button className="text-foreground mr-2">
                      <FaTrash />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="rounded-md container mx-auto p-4 bg-background w-full">
            <div className="text-2xl font-bold text-foreground mb-2">
              <h1>Histórico</h1>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-80 w-full overflow-y-auto overflow-x-hidden">
              <Table
                columns={columns}
                data={formattedDataHist}
                actions={(item) => (
                  <div className="flex space-x-2">
                    <button className="text-foreground mr-2">
                      <FaEdit />
                    </button>
                    <button className="text-foreground mr-2">
                      <FaTrash />
                    </button>
                    <button className="text-foreground mr-2">
                    <BiDotsHorizontalRounded />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

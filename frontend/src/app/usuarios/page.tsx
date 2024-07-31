"use client";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
export default function userPage() {
  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Data de nascimento", accessor: "data_de_nascimento"},
    { header: "Email", accessor: "email" },
    { header: "Primeiro login", accessor: "primeiro_login"},
    { header: "Último login", accessor: "ultimo_login"},
  ];

  const data = [
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login:"31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 p-6 bg-white rounded-md">
          <header className="text-center bg-blue-100 p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-blue-900">
              Sistema de Gestão de Manutenção
            </h1>
          </header>

          <div>
            
            <div className="container mx-auto p-4 bg-white rounded-lg">
              <h1 className="text-2xl font-bold mb-4 text-center text-black">
                Lista de usuários cadastrados
              </h1>
              <div className="max-h-96 overflow-y-auto">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

"use client";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
export default function userPage() {
  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Data de nascimento", accessor: "data_de_nascimento" },
    { header: "Email", accessor: "email" },
    { header: "Primeiro login", accessor: "primeiro_login" },
    { header: "Último login", accessor: "ultimo_login" },
  ];

  const data = [
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      username: "Diego Henrique",
      data_de_nascimento: "03/01/2005",
      email: "diego1234@gmail.com",
      primeiro_login: "31/07/2024",
      ultimo_login: "31/07/2024",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200">
          <header className="text-center p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-blue-900">
              Sistema de Gestão de Manutenção
            </h1>
          </header>

          <div className="flex-1">
            <div className="container mx-auto p-4 bg-white rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-black">
                  Lista de usuários cadastrados
                </h1>
                <button className="text-[#090909] py-2.5 px-7 text-[18px] rounded-[0.5em] bg-[#e8e8e8] cursor-pointer border border-blue-200 transition-all duration-300 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] active:text-[#666] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]">
                  Criar Usuário
                </button>
              </div>
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

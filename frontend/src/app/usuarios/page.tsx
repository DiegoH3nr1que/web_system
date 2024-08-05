"use client";
import { useState } from "react";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
import { CustomDialog } from "../components/dialog";

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
        <main className="flex-1 flex flex-col p-6 bg-background">
          <header className="text-left p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-foreground">
              Usuários
            </h1>
          </header>

          <div className="flex-1">
            <div className="container mx-auto p-4 bg-background rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Lista de usuários cadastrados
                </h1>
                <CustomDialog
                  triggerLabel="Criar Usuário"
                  title="Criar Usuário"
                  description="Insira todos os campos corretamente!"
                  fields={[
                    { id: "username", label: "Username", type: "text" },
                    {
                      id: "data_nascimento",
                      label: "Data de nascimento",
                      type: "Date",
                    },
                    { id: "email", label: "Email", type: "email" },
                    { id: "senha", label: "Senha", type: "password" },
                  ]}
                />
              </div>
              <div className="max-h-96 overflow-y-auto">
                <Table
                  columns={columns}
                  data={data}
                  actions={(item) => (
                    <div className="flex space-x-2">
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
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

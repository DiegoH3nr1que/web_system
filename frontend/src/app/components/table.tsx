import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Dado {
  ambiente: string;
  equipamento: string;
  solicitacao: number;
  atendimento: number;
}

interface TableProps {
  dados: Dado[];
}

const Table: React.FC<TableProps> = ({ dados }) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2 text-left">Ambiente</th>
            <th className="px-4 py-2 text-left">Equipamento</th>
            <th className="px-4 py-2 text-right">Solicitação</th>
            <th className="px-4 py-2 text-right">Atendimento</th>
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index} className="border-t border-gray-200 text-black">
              <td className="px-4 py-2">{item.ambiente}</td>
              <td className="px-4 py-2">{item.equipamento}</td>
              <td className="px-4 py-2 text-right">{item.solicitacao}</td>
              <td className="px-4 py-2 text-right">{item.atendimento}</td>
              <td className="px-4 py-2 text-center">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
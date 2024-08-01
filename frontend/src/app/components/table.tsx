import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Column {
  header: string;
  accessor: string;
  isNumeric?: boolean;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="max-h-80 overflow-y-auto relative">
      <table className="min-w-full bg-white border border-gray-200 rounded-sm">
        <thead className=" uppercase text-sm bg-blue-100 text-blue-900 sticky top-0">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 ${
                  column.isNumeric ? "text-right" : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200 text-black">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 ${
                    column.isNumeric ? "text-right" : "text-left"
                  }`}
                >
                  {item[column.accessor]}
                </td>
              ))}
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

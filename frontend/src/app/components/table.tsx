import React from "react";
interface Column {
  header: string;
  accessor: string;
  isNumeric?: boolean;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  actions?: (item: Record<string, any>) => React.ReactNode; 
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <div className="max-h-80 overflow-y-auto scroll-invisivel relative">
      <table className="min-w-full bg-background border border-gray-200 rounded-sm text-foreground">
        <thead className=" uppercase text-sm bg-background text-foreground sticky top-0">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 ${column.isNumeric ? "text-right" : "text-left"}`}
              >
                {column.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2 text-center">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200 text-foreground">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 ${column.isNumeric ? "text-right" : "text-left"}`}
                >
                  {item[column.accessor]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2 text-center">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

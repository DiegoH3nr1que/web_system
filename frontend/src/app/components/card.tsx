import React from "react";

interface CardInterface{
    color?: string;
    qty?: string;
    text?: string;
    icon?: React.ReactNode;

}

export function Card({color, qty, text, icon }: CardInterface) {
  return (
    <div className={`${color} p-6 flex items-center gap-4 rounded-xl shadow hover:scale-105 transition`}>
      <div className="flex-1 flex flex-col">
        <strong className="text-3xl font-bold">{qty}</strong>
        <span className="text-sm text-gray-700">{text}</span>
      </div>
     {icon}
    </div>
  );
}

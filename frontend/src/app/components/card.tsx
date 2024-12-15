import React from "react";

interface CardInterface{
    color?: string;
    title?: string;
    reason?: string;
    text?: string;
    icon?: React.ReactNode;
}

export function Card({color, title, text, reason, icon }: CardInterface) {
  return (
    <div className={`${color} p-6 flex items-center gap-4 rounded-xl shadow hover:scale-[102%] transition`}>
      <div className="flex-1 flex flex-col">
        <strong className="font-bold">{title}</strong>
        <span className="text-sm text-foreground">{reason}</span>
        <span className="text-sm text-foreground">{text}</span>
      </div>
     {icon}
    </div>
  );
}

'use client';
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";

export default function manuPage() {
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
        </main>
      </div>
      <Footer />
    </div>
  );
}

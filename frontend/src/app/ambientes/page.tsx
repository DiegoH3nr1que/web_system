'use client';
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";

export default function ambientePage() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200">
          <header className="text-center p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-blue-900">
              Ambientes
            </h1>
          </header>
        </main>
      </div>
      <Footer />
    </div>
  );
}

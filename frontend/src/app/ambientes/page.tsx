'use client';
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";

export default function ambientePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-background">
          <header className="text-left p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-foreground">
              Ambientes
            </h1>
          </header>
        </main>
      </div>
      <Footer />
    </div>
  );
}

"use client";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";
export default function ambientePage() {
  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Ambientes
              </h1>
              <RealTimeClock/>
            </header>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

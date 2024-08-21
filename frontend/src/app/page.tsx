'use client';
import { useState } from "react";
import { useAuth } from "./context/authContext";
import { Footer } from "./components/footer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };  

  return (
    <div className="h-screen flex flex-col justify-between bg-background">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-md bg-foreground p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-background mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-foreground text-sm font-bold mb-2"
                htmlFor="username"
              >
                Usuário
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-background leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-foreground text-sm font-bold mb-2"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-background mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-background hover:bg-background text-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

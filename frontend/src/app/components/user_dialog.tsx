import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface UserDialogProps {
    triggerLabel: string | React.ReactElement;
    title: string;
    user?: { username: string; role: string, email: string }; // Passado apenas para edição
    onSubmit: (data: { username: string; password: string; email?: string; role: string }) => void;
  }
  

export function UserDialog({ triggerLabel, title, user, onSubmit }: UserDialogProps) {
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(""); // Sempre exigido para criação
  const [email, setEmail] = useState(""); // Sempre exigido para criação
  const [role, setRole] = useState(user?.role || "user");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Para edição, senha não é enviada
    if (user) {
      onSubmit({ username,password, role });
    } else {
      // Para criação, senha é obrigatória
      onSubmit({ username, password, email, role });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {!user && ( // Exibe o campo de senha apenas na criação
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {!user && ( // Exibe o campo de email para criação
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                defaultValue={role}
                onValueChange={(value) => setRole(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

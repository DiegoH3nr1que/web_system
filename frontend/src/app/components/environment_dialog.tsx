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

interface EnvironmentDialogProps {
  triggerLabel: string | React.ReactElement;
  title: string;
  environment?: {
    name: string;
    type: string;
    location: string;
    condition: string;
    maintenance_team?: string;
    maintenances_done: number;
  };
  onSubmit: (data: {
    name: string;
    type: string;
    location: string;
    condition: string;
    maintenance_team?: string;
    maintenances_done: number;
  }) => void;
}

export function EnvironmentDialog({
  triggerLabel,
  title,
  environment,
  onSubmit,
}: EnvironmentDialogProps) {
  const [name, setName] = useState(environment?.name || "");
  const [type, setType] = useState(environment?.type || "");
  const [location, setLocation] = useState(environment?.location || "");
  const [condition, setCondition] = useState(environment?.condition || "normal");
  const [maintenanceTeam, setMaintenanceTeam] = useState(
    environment?.maintenance_team || ""
  );
  const [maintenancesDone, setMaintenancesDone] = useState(
    environment?.maintenances_done || 0
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      type,
      location,
      condition,
      maintenance_team: maintenanceTeam,
      maintenances_done: maintenancesDone,
    });
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
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo de Ambiente</Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="condition">Condição do Ambiente</Label>
              <Select
                defaultValue={condition}
                onValueChange={(value) => setCondition(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="em_manutencao">Em manutenção</SelectItem>
                  <SelectItem value="aguardando_limpeza">Aguardando Limpeza</SelectItem>
                  <SelectItem value="manutencao_cancelada">Manutenção Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maintenanceTeam">Equipe de Manutenção</Label>
              <Input
                id="maintenanceTeam"
                value={maintenanceTeam || ""}
                onChange={(e) => setMaintenanceTeam(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maintenancesDone">Manutenções Realizadas</Label>
              <Input
                id="maintenancesDone"
                type="number"
                value={maintenancesDone}
                onChange={(e) => setMaintenancesDone(Number(e.target.value))}
              />
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

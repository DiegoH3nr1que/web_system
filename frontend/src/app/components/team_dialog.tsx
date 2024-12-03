import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
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

interface TeamDialogProps {
  triggerLabel: string | React.ReactElement;
  title: string;
  team?: {
    id?: number;
    team_name: string;
    technical_ids: number[];
    quant_maintenanc_realized: number;
    quant_maintenanc_finalized: number;
  }; // Passado apenas para edição
  onSubmit: (data: {
    id?: number;
    team_name: string;
    technical_ids: number[];
    quant_maintenanc_realized: number;
    quant_maintenanc_finalized: number;
  }) => void;
}

export function TeamDialog({
  triggerLabel,
  title,
  team,
  onSubmit,
}: TeamDialogProps) {
  const [teamName, setTeamName] = useState(team?.team_name || "");
  const [technicalIds, setTechnicalIds] = useState("");
  const [maintenanceRealized, setMaintenanceRealized] = useState(
    team?.quant_maintenanc_realized || 0
  );
  const [maintenanceFinalized, setMaintenanceFinalized] = useState(
    team?.quant_maintenanc_finalized || 0
  );


    // Atualiza o estado do input quando o team é fornecido
    useEffect(() => {
      if (team) {
        setTechnicalIds(team.technical_ids.join(","));
      }
    }, [team]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const parsedTechnicalIds = technicalIds
    .split(",")
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id)); // Remove entradas inválidas

    onSubmit({
      id: team?.id,
      team_name: teamName,
      technical_ids: parsedTechnicalIds,
      quant_maintenanc_realized: maintenanceRealized,
      quant_maintenanc_finalized: maintenanceFinalized,
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
              <Label htmlFor="teamName">Nome do Time</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="technicalIds">IDs dos Técnicos</Label>
              <Input
                id="technicalIds"
                value={technicalIds}
                onChange={(e) => setTechnicalIds(e.target.value)}
                placeholder="Insira os IDs separados por vírgula"
                required
              />
            </div>
            <div>
              <Label htmlFor="maintenanceRealized">
                Manutenções Realizadas
              </Label>
              <Input
                id="maintenanceRealized"
                type="number"
                value={maintenanceRealized}
                onChange={(e) => setMaintenanceRealized(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="maintenanceFinalized">
                Manutenções Finalizadas
              </Label>
              <Input
                id="maintenanceFinalized"
                type="number"
                value={maintenanceFinalized}
                onChange={(e) =>
                  setMaintenanceFinalized(Number(e.target.value))
                }
                required
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

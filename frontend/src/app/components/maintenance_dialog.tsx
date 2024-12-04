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

interface MaintenanceDialogProps {
  triggerLabel: string | React.ReactElement;
  title: string;
  maintenance?: {
    description: string;
    priority: string;
    status: string;
    requested_date: string;
    machine_id: number;
  };
  onSubmit: (data: {
    description: string;
    priority: string;
    status: string;
    requested_date: string;
    machine_id: number;
  }) => void;
}

export function MaintenanceDialog({
  triggerLabel,
  title,
  maintenance,
  onSubmit,
}: MaintenanceDialogProps) {
  const [description, setDescription] = useState(maintenance?.description || "");
  const [priority, setPriority] = useState(maintenance?.priority || "low");
  const [status, setStatus] = useState(maintenance?.status || "pending");
  const [requestedDate, setRequestedDate] = useState(
    maintenance?.requested_date || new Date().toISOString().split("T")[0]
  );
  const [machineId, setMachineId] = useState(maintenance?.machine_id || 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      priority,
      status,
      requested_date: requestedDate,
      machine_id: machineId,
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
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                defaultValue={priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in_progress">Em andamento</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="requestedDate">Data Solicitada</Label>
              <Input
                id="requestedDate"
                type="date"
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="machineId">ID da Máquina</Label>
              <Input
                id="machineId"
                type="number"
                value={machineId}
                onChange={(e) => setMachineId(Number(e.target.value))}
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

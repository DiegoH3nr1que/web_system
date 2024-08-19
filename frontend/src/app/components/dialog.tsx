import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { ReactElement } from "react";

interface DialogProps {
  triggerLabel: string | ReactElement;
  title: string;
  description: string;
  TypeButton: string;
  fields?: {
    id: string;
    label: string;
    type: string;
    defaultValue?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
  }[];
}

export function CustomDialog({
  triggerLabel,
  title,
  description,
  TypeButton,
  fields,
}: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form>
          {fields && (
            <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto scroll-invisivel">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="grid grid-cols-4 items-center gap-4 mr-2"
                >
                  <Label htmlFor={field.id} className="text-right">
                    {field.label} {field.required && "*"}
                  </Label>
                  {field.type === "select" && field.options ? (
                    <div className="col-span-3">
                      <Select defaultValue={field.defaultValue}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      defaultValue={field.defaultValue}
                      required={field.required}
                      className="col-span-3"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button type="submit">{TypeButton}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

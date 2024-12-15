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
import { ReactElement, useState } from "react";

interface DialogProps<T = Record<string, any>> {
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
  extraContent?: ReactElement;
  onSubmit: (data: T) => void;
}

export function CustomDialog<T = Record<string, any>>({
  triggerLabel,
  title,
  description,
  TypeButton,
  fields,
  extraContent,
  onSubmit,
}: DialogProps<T>) {
  const [formData, setFormData] = useState<T | Record<string, any>>({} as T);

  const handleInputChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData as T);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {fields && (
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto scroll-invisivel">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label} {field.required && "*"}
                  </Label>
                  {field.type === "select" && field.options ? (
                    <Select
                      defaultValue={field.defaultValue}
                      onValueChange={(value) => handleInputChange(field.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      defaultValue={field.defaultValue}
                      required={field.required}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={`Digite ${field.label.toLowerCase()}`}
                      className="w-full"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {extraContent && <div className="py-4">{extraContent}</div>}
          <DialogFooter>
            <Button type="submit">{TypeButton}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

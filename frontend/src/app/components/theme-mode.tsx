"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
} from "lucide-react";
import * as React from "react";
import { Moon, Sun} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <UserPlus className="mr-2 h-4 w-4" />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("red")}>
            <span>Red</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("red-dark")}>
            <span>Red Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("green")}>
            <span>Green</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("green-dark")}>
            <span>Green Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("netflix")}>
            <span>Netflix</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("netflix-dark")}>
            <span>Netflix Dark</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}



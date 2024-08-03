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
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
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
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>More...</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
//   <DropdownMenuTrigger asChild>
//     <DropdownMenuSubTrigger>
//       <span className="sr-only">Toggle theme</span>
//     </DropdownMenuSubTrigger>
//   </DropdownMenuTrigger>
//   <DropdownMenuPortal>
//           <DropdownMenuSubContent>
//             <DropdownMenuItem>
//               <Mail className="mr-2 h-4 w-4" />
//               <span>Email</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <MessageSquare className="mr-2 h-4 w-4" />
//               <span>Message</span>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <PlusCircle className="mr-2 h-4 w-4" />
//               <span>More...</span>
//             </DropdownMenuItem>
//           </DropdownMenuSubContent>
//         </DropdownMenuPortal>
//         </DropdownMenu>

{
  /* <DropdownMenuContent
        align="end"
        className="bg-white border border-gray-300 rounded-md shadow-lg"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu> */
}

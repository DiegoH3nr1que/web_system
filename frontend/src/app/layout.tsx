import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/authContext";
import { Glory } from "next/font/google";

const glory = Glory({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Maintenance WEB",
  description: "Design for General Maintenance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background font-sans antialiased")}
        style={{ fontFamily: glory.style.fontFamily }}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={[
              "light",
              "dark",
              "red",
              "red-dark",
              "green",
              "green-dark",
              "netflix",
              "netflix-dark",
              "nord",
              "nord-dark",
              "nature",
              "nature-dark",
              "dracula",
              "dracula-dark",
              "laracon-dark",
              "gold",
              "gold-dark",
              "azarath",
              "azarath-dark",
              "poimandres",
              "poimandres-dark",
              "discord",
              "discord-dark",
            ]}
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

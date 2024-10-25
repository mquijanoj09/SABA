"use client";

import { useState } from "react";
import {
  Home,
  Sprout,
  ShoppingBag,
  ShoppingBasket,
  FileText,
  Bell,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface BarraLateralProps {
  seccionActiva: string;
  onNavegacion: (seccion: string) => void;
  tipoUsuario: string;
}

export function BarraLateral({
  seccionActiva,
  onNavegacion,
  tipoUsuario,
}: BarraLateralProps) {
  const [isOpen, setIsOpen] = useState(false);

  const elementosNav = [
    { nombre: "Inicio", icono: Home },
    {
      nombre: "Productos",
      icono: Sprout,
    },
    {
      nombre: "Mis Productos",
      icono: ShoppingBag,
      notConsumidor: true,
    },
    { nombre: "Carrito", icono: ShoppingBasket },
    {
      nombre: "Historial",
      icono: FileText,
    },
    { nombre: "Alertas", icono: Bell },
    {
      nombre: "Usuarios",
      icono: Users,
      soloAdmin: true,
    },
    { nombre: "Configuracion", icono: Settings },
  ];

  const NavContent = () => (
    <nav className="mt-8 space-y-2">
      {elementosNav.map((elemento) => {
        if (elemento.soloAdmin && tipoUsuario !== "administrador") return null;
        if (elemento.notConsumidor && tipoUsuario === "consumidor") return null;
        return (
          <Button
            key={elemento.nombre}
            variant={seccionActiva === elemento.nombre ? "secondary" : "ghost"}
            className={`w-full justify-start text-left ${
              seccionActiva === elemento.nombre
                ? "bg-green-600 text-white hover:bg-green-700"
                : "hover:bg-green-100 hover:text-green-700"
            }`}
            onClick={() => {
              onNavegacion(elemento.nombre);
              setIsOpen(false);
            }}
          >
            <elemento.icono className="h-5 w-5 mr-3" />
            <span>{elemento.nombre}</span>
          </Button>
        );
      })}
    </nav>
  );

  return (
    <div className="">
      {/* Desktop Sidebar */}
      <div className="hidden fixed md:flex flex-col bg-white text-green-800 h-full w-64 z-50 p-4 shadow-lg">
        <h1 className="text-2xl font-bold">SABA</h1>
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">SABA</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <NavContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Home,
  Sprout,
  ShoppingBag,
  FileText,
  Bell,
  PieChart,
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
    { nombre: "inicio", icono: Home, etiqueta: "Inicio" },
    {
      nombre: "productos-disponibles",
      icono: Sprout,
      etiqueta: "Mercado Fresco",
    },
    {
      nombre: "productos-administracion",
      icono: ShoppingBag,
      etiqueta: "Gestión de Productos",
    },
    { nombre: "carrito", icono: ShoppingBag, etiqueta: "Mi Canasta" },
    {
      nombre: "historial-transacciones",
      icono: FileText,
      etiqueta: "Mis Compras y Ventas",
    },
    { nombre: "alertas", icono: Bell, etiqueta: "Notificaciones" },
    {
      nombre: "estadisticas",
      icono: PieChart,
      etiqueta: "Análisis de Cosechas",
    },
    {
      nombre: "usuarios",
      icono: Users,
      etiqueta: "Comunidad Agrícola",
      soloAdmin: true,
    },
    { nombre: "configuracion", icono: Settings, etiqueta: "Configuración" },
  ];

  const NavContent = () => (
    <nav className="mt-8 space-y-2">
      {elementosNav.map((elemento) => {
        if (elemento.soloAdmin && tipoUsuario !== "administrador") return null;
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
            <span>{elemento.etiqueta}</span>
          </Button>
        );
      })}
    </nav>
  );

  return (
    <div className="bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-white text-green-800 h-full w-64 p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">SABA</h1>
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

import {
  Home,
  Package,
  ShoppingCart,
  FileText,
  Bell,
  BarChart2,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const elementosNav = [
    { nombre: "inicio", icono: Home, etiqueta: "Inicio" },
    {
      nombre: "productos-disponibles",
      icono: Package,
      etiqueta: "Productos Disponibles",
    },
    {
      nombre: "productos-administracion",
      icono: Package,
      etiqueta: "Administrar Productos",
    },
    { nombre: "carrito", icono: ShoppingCart, etiqueta: "Carrito" },
    {
      nombre: "historial-transacciones",
      icono: FileText,
      etiqueta: "Historial de Transacciones",
    },
    { nombre: "alertas", icono: Bell, etiqueta: "Alertas" },
    { nombre: "estadisticas", icono: BarChart2, etiqueta: "Estadísticas" },
    { nombre: "usuarios", icono: Users, etiqueta: "Usuarios", soloAdmin: true },
    { nombre: "configuracion", icono: Settings, etiqueta: "Configuración" },
  ];

  return (
    <div className="bg-white w-64 h-full shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">SABA</h1>
      </div>
      <nav className="mt-8">
        {elementosNav.map((elemento) => {
          if (elemento.soloAdmin && tipoUsuario !== "administrador")
            return null;
          return (
            <Button
              key={elemento.nombre}
              variant={
                seccionActiva === elemento.nombre ? "secondary" : "ghost"
              }
              className="w-full justify-start"
              onClick={() => onNavegacion(elemento.nombre)}
            >
              <elemento.icono className="mr-2 h-4 w-4" />
              {elemento.etiqueta}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}

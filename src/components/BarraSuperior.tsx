import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Usuario, ItemCarrito } from "../App";

interface BarraSuperiorProps {
  seccionActiva: string;
  usuarioActual: Usuario;
  onLogout: () => void;
  carrito: ItemCarrito[];
  eliminarDelCarrito: (productoId: number) => void;
}

export function BarraSuperior({
  seccionActiva,
  usuarioActual,
  onLogout,
  carrito,
  eliminarDelCarrito,
}: BarraSuperiorProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {seccionActiva}
          </h1>
          <div className="flex items-center">
            <div className="mr-4 relative">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4" />
                {carrito.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {carrito.length}
                  </span>
                )}
              </Button>
            </div>
            <span className="mr-4">{usuarioActual.nombre}</span>
            <Button onClick={onLogout} variant="outline">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

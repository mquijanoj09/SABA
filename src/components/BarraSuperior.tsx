import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Usuario, ItemCarrito } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BarraSuperiorProps {
  seccionActiva: string;
  usuarioActual: Usuario | null;
  onLogout: () => void;
  carrito: ItemCarrito[];
  setSeccionActiva: (seccion: string) => void;
}

export function BarraSuperior({
  seccionActiva,
  usuarioActual,
  setSeccionActiva,
  onLogout,
  carrito,
}: BarraSuperiorProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-semibold text-gray-900 hidden md:block">
            {seccionActiva}
          </h1>
          <h1 className="text-2xl font-bold text-green-700 ml-12 md:hidden">
            SABA
          </h1>
          <div className="flex items-center justify-end space-x-4">
            <div className="">Hola! {usuarioActual?.nombre}</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full border"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {usuarioActual?.nombre}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {usuarioActual?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              className="relative"
              onClick={() => setSeccionActiva("Carrito")}
            >
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4" />
                {carrito.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {carrito.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

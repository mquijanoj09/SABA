import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Usuario } from "@/app/page";

interface ConfiguracionContenidoProps {
  usuarioActual: Usuario;
  actualizarUsuario: (usuario: Usuario) => void;
}

export function Configuracion({
  usuarioActual,
  actualizarUsuario,
}: ConfiguracionContenidoProps) {
  const [formData, setFormData] = useState({
    nombre: usuarioActual.nombre,
    email: usuarioActual.email,
    contrasena: "",
  });

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actualizarUsuario({
      ...usuarioActual,
      nombre: formData.nombre,
      email: formData.email,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
        <CardDescription>
          Administre la configuración de su cuenta y preferencias.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarEnvio}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Su nombre"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Su email"
                type="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contrasena">Nueva Contraseña</Label>
              <Input
                id="contrasena"
                value={formData.contrasena}
                onChange={(e) =>
                  setFormData({ ...formData, contrasena: e.target.value })
                }
                placeholder="Ingrese nueva contraseña"
                type="password"
              />
            </div>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Usuario } from "@/types";
import { supabase } from "@/lib/supabase";

interface ConfiguracionProps {
  usuarioActual: Usuario;
  actualizarUsuario: (usuarioActualizado: Partial<Usuario>) => void;
}

export function Configuracion({
  usuarioActual,
  actualizarUsuario,
}: ConfiguracionProps) {
  const [nombre, setNombre] = useState(usuarioActual.nombre);
  const [email, setEmail] = useState(usuarioActual.email);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actualizaciones: Partial<Usuario> = {};

    if (nombre !== usuarioActual.nombre) {
      actualizaciones.nombre = nombre;
    }

    if (email !== usuarioActual.email) {
      actualizaciones.email = email;
    }

    if (Object.keys(actualizaciones).length > 0) {
      await actualizarUsuario(actualizaciones);
    }

    if (nuevaContrasena && nuevaContrasena === confirmarContrasena) {
      const { error } = await supabase.auth.updateUser({
        password: nuevaContrasena,
      });
      if (error) {
        console.error("Error updating password:", error);
      } else {
        console.log("Password updated successfully");
        setContrasenaActual("");
        setNuevaContrasena("");
        setConfirmarContrasena("");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Configuración de la Cuenta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contrasenaActual">Contraseña Actual</Label>
            <Input
              id="contrasenaActual"
              type="password"
              value={contrasenaActual}
              onChange={(e) => setContrasenaActual(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nuevaContrasena">Nueva Contraseña</Label>
            <Input
              id="nuevaContrasena"
              type="password"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmarContrasena">
              Confirmar Nueva Contraseña
            </Label>
            <Input
              id="confirmarContrasena"
              type="password"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
          </div>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
}

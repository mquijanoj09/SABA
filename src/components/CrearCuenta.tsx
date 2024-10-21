"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

interface CrearCuentaProps {
  onCancelar: () => void;
}

export function CrearCuenta({ onCancelar }: CrearCuentaProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: contrasena,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert({ id: data.user.id, nombre, email, rol });

      if (insertError) {
        setError(insertError.message);
        // You might want to delete the auth user here if the profile creation fails
        return;
      }

      // Redirect or show success message
      alert("Cuenta creada exitosamente. Por favor, inicie sesión.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Crear Cuenta
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
            <Label htmlFor="contrasena">Contraseña</Label>
            <Input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select onValueChange={setRol} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="productor">Productor</SelectItem>
                <SelectItem value="cooperativa">Cooperativa</SelectItem>
                <SelectItem value="consumidor">Consumidor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onCancelar}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Crear Cuenta
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CrearCuentaProps {
  onCrearCuenta: (
    nombre: string,
    email: string,
    contrasena: string,
    rol: string
  ) => void;
  onCancelar: () => void;
}

export function CrearCuenta({ onCrearCuenta, onCancelar }: CrearCuentaProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCrearCuenta(nombre, email, contrasena, rol);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Crear Cuenta
        </CardTitle>
        <CardDescription>Únete a la comunidad SABA</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              type="text"
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
        </form>
      </CardContent>
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
    </Card>
  );
}

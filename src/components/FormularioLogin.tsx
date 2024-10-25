"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CrearCuenta } from "./CrearCuenta";

interface FormularioLoginProps {
  onLogin: (email: string, contrasena: string) => void;
  error: string;
}

export function FormularioLogin({ onLogin, error }: FormularioLoginProps) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarCrearCuenta, setMostrarCrearCuenta] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, contrasena);
    setMostrarCrearCuenta(false);
  };

  if (mostrarCrearCuenta) {
    return <CrearCuenta onCancelar={() => setMostrarCrearCuenta(false)} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Iniciar Sesión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Iniciar Sesión
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button onClick={() => setMostrarCrearCuenta(true)} variant="link">
            ¿No tienes una cuenta? Regístrate aquí
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

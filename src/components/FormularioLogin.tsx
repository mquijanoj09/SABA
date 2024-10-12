import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginProps {
  onLogin: (email: string, contrasena: string) => void;
  error: string;
}

export function FormularioLogin({ onLogin, error }: LoginProps) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, contrasena);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Ingrese su email y contraseña para acceder a la plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarEnvio}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Ingrese su email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                placeholder="Ingrese su contraseña"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit">Iniciar sesión</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

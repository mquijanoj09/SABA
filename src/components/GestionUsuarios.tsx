"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Usuario } from "@/types";
import { supabase } from "@/lib/supabase";

export function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState<Partial<Usuario>>({
    nombre: "",
    email: "",
    rol: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("usuarios")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching users:", error);
        } else if (data) {
          setUsuarios(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setNuevoUsuario({ ...nuevoUsuario, rol: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("usuarios")
      .insert(nuevoUsuario)
      .select();

    if (error) {
      console.error("Error creating user:", error);
    } else if (data) {
      setUsuarios([...usuarios, data[0]]);
      setNuevoUsuario({ nombre: "", email: "", rol: "" });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Gestión de Usuarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={nuevoUsuario.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={nuevoUsuario.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select onValueChange={handleSelectChange} value={nuevoUsuario.rol}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrador">Administrador</SelectItem>
                <SelectItem value="oaf">OAF</SelectItem>
                <SelectItem value="productor">Productor</SelectItem>
                <SelectItem value="cooperativa">Cooperativa</SelectItem>
                <SelectItem value="consumidor">Consumidor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Agregar Usuario</Button>
        </form>

        <Table>
          <TableCaption>Lista de usuarios registrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha de Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  {new Date(usuario.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

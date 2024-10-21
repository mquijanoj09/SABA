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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Usuario } from "@/types";

interface UsuariosContenidoProps {
  usuarios: Usuario[];
  actualizarUsuario: (usuario: Usuario) => void;
}

export function GestionUsuarios({
  usuarios,
  actualizarUsuario,
}: UsuariosContenidoProps) {
  const [editandoUsuario, setEditandoUsuario] = useState<Usuario | null>(null);

  const manejarEditarUsuario = (usuario: Usuario) => {
    setEditandoUsuario({ ...usuario });
  };

  const manejarGuardarUsuario = () => {
    if (editandoUsuario) {
      actualizarUsuario(editandoUsuario);
      setEditandoUsuario(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
        <CardDescription>
          Administrar perfiles y permisos de usuarios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => manejarEditarUsuario(usuario)}
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                        <DialogDescription>
                          Realice cambios en el perfil del usuario aquí.
                        </DialogDescription>
                      </DialogHeader>
                      {editandoUsuario && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nombre" className="text-right">
                              Nombre
                            </Label>
                            <Input
                              id="nombre"
                              value={editandoUsuario.nombre}
                              onChange={(e) =>
                                setEditandoUsuario({
                                  ...editandoUsuario,
                                  nombre: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              value={editandoUsuario.email}
                              onChange={(e) =>
                                setEditandoUsuario({
                                  ...editandoUsuario,
                                  email: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rol" className="text-right">
                              Rol
                            </Label>
                            <Select
                              value={editandoUsuario.rol}
                              onValueChange={(value) =>
                                setEditandoUsuario({
                                  ...editandoUsuario,
                                  rol: value,
                                })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Seleccione un rol" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="administrador">
                                  Administrador
                                </SelectItem>
                                <SelectItem value="oaf">OAF</SelectItem>
                                <SelectItem value="productor">
                                  Productor
                                </SelectItem>
                                <SelectItem value="cooperativa">
                                  Cooperativa
                                </SelectItem>
                                <SelectItem value="consumidor">
                                  Consumidor
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button type="submit" onClick={manejarGuardarUsuario}>
                          Guardar cambios
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

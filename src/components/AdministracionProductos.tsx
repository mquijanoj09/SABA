"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Producto } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AdministracionProductosProps {
  usuarioId: string;
}

export function AdministracionProductos({
  usuarioId,
}: AdministracionProductosProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editandoProducto, setEditandoProducto] = useState<Producto | null>(
    null
  );
  const [nuevoProducto, setNuevoProducto] = useState<Partial<Producto>>({
    nombre: "",
    cantidad: 0,
    precio: 0,
    ubicacion: "",
    imagen: "",
    region: "",
    descripcion: "",
  });

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("usuario_id", usuarioId);

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProductos(data);
      }
    };
    fetchProductos();
  }, [usuarioId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editandoProducto) {
      setEditandoProducto({ ...editandoProducto, [name]: value });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (editandoProducto) {
      setEditandoProducto({ ...editandoProducto, [name]: value });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoProducto) {
      const { data, error } = await supabase
        .from("productos")
        .update(editandoProducto)
        .eq("id", editandoProducto.id)
        .select();

      if (error) {
        console.error("Error updating product:", error);
      } else if (data) {
        setProductos(
          productos.map((p) => (p.id === editandoProducto.id ? data[0] : p))
        );
        setEditandoProducto(null);
      }
    } else {
      const { data, error } = await supabase
        .from("productos")
        .insert({ ...nuevoProducto, usuario_id: usuarioId })
        .select();

      if (error) {
        console.error("Error creating product:", error);
      } else if (data) {
        setProductos([...productos, data[0]]);
        setNuevoProducto({
          nombre: "",
          cantidad: 0,
          precio: 0,
          ubicacion: "",
          imagen: "",
          region: "",
          descripcion: "",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
    } else {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editandoProducto ? "Editar Producto" : "Agregar Nuevo Producto"}
          </CardTitle>
          <CardDescription>
            {editandoProducto
              ? "Modifique los detalles del producto"
              : "Ingrese los detalles del nuevo producto"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                value={
                  editandoProducto
                    ? editandoProducto.nombre
                    : nuevoProducto.nombre
                }
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                name="cantidad"
                type="number"
                value={
                  editandoProducto
                    ? editandoProducto.cantidad
                    : nuevoProducto.cantidad
                }
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                value={
                  editandoProducto
                    ? editandoProducto.precio
                    : nuevoProducto.precio
                }
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Input
                id="ubicacion"
                name="ubicacion"
                value={
                  editandoProducto
                    ? editandoProducto.ubicacion
                    : nuevoProducto.ubicacion
                }
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagen">URL de la imagen</Label>
              <Input
                id="imagen"
                name="imagen"
                value={
                  editandoProducto
                    ? editandoProducto.imagen
                    : nuevoProducto.imagen
                }
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Select
                onValueChange={(value) => handleSelectChange("region", value)}
                value={
                  editandoProducto
                    ? editandoProducto.region
                    : nuevoProducto.region
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Costa">Costa</SelectItem>
                  <SelectItem value="Sierra">Sierra</SelectItem>
                  <SelectItem value="Oriente">Oriente</SelectItem>
                  <SelectItem value="Insular">Insular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={
                  editandoProducto
                    ? editandoProducto.descripcion
                    : nuevoProducto.descripcion
                }
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {editandoProducto ? "Actualizar Producto" : "Agregar Producto"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <Card key={producto.id}>
            <CardHeader>
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl mb-2">{producto.nombre}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mb-2">
                {producto.descripcion}
              </CardDescription>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg text-green-600">
                  ${producto.precio.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">{producto.region}</span>
              </div>
              <div className="text-sm text-gray-500">
                Disponibles: {producto.cantidad}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setEditandoProducto(producto)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(producto.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

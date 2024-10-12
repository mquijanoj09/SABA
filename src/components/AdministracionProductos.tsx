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
import Image from "next/image";
import { Producto } from "@/app/page";

export function AdministracionProductos() {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Maíz",
      cantidad: 500,
      precio: 1.2,
      ubicacion: "Almacén Sur",
      imagen: "https://ejemplo.com/maiz.jpg",
      region: "Sierra",
      descripcion: "Maíz fresco de la sierra",
    },
    // Añade más productos aquí
  ]);

  const [nuevoProducto, setNuevoProducto] = useState<Omit<Producto, "id">>({
    nombre: "",
    cantidad: 0,
    precio: 0,
    ubicacion: "",
    imagen: "",
    region: "",
    descripcion: "",
  });

  const manejarAgregarProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nuevoProducto.nombre &&
      nuevoProducto.cantidad > 0 &&
      nuevoProducto.precio > 0 &&
      nuevoProducto.ubicacion &&
      nuevoProducto.region
    ) {
      const productoCreado: Producto = {
        id: productos.length + 1,
        ...nuevoProducto,
      };
      setProductos([...productos, productoCreado]);
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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Administración de Productos</CardTitle>
        <CardDescription>
          Agregue, edite o elimine productos de su inventario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarAgregarProducto} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                placeholder="Ingrese el nombre del producto"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                type="number"
                value={nuevoProducto.cantidad}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    cantidad: parseInt(e.target.value),
                  })
                }
                placeholder="Ingrese la cantidad"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    precio: parseFloat(e.target.value),
                  })
                }
                placeholder="Ingrese el precio"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Input
                id="ubicacion"
                value={nuevoProducto.ubicacion}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    ubicacion: e.target.value,
                  })
                }
                placeholder="Ingrese la ubicación"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="region">Región</Label>
              <Input
                id="region"
                value={nuevoProducto.region}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, region: e.target.value })
                }
                placeholder="Ingrese la región"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="imagen">URL de la imagen</Label>
              <Input
                id="imagen"
                value={nuevoProducto.imagen}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })
                }
                placeholder="Ingrese la URL de la imagen"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              value={nuevoProducto.descripcion}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  descripcion: e.target.value,
                })
              }
              placeholder="Ingrese una breve descripción del producto"
            />
          </div>
          <Button type="submit">Agregar Producto</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Región</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                <TableCell>{producto.ubicacion}</TableCell>
                <TableCell>{producto.region}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Producto } from "@/app/page";

interface ProductosDisponiblesProps {
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
}

export function ProductosDisponibles({
  agregarAlCarrito,
}: ProductosDisponiblesProps) {
  const [productosDisponibles] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Tomates",
      cantidad: 100,
      precio: 2.99,
      ubicacion: "Almacén Central",
      imagen: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
      region: "Costa",
      descripcion: "Tomates frescos de la costa",
    },
    {
      id: 2,
      nombre: "Papas",
      cantidad: 200,
      precio: 1.5,
      ubicacion: "Almacén Norte",
      imagen: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
      region: "Sierra",
      descripcion: "Papas de la sierra, ideales para freír",
    },
    // Añade más productos aquí
  ]);

  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});

  const manejarCambioCantidad = (id: number, cantidad: number) => {
    setCantidades({ ...cantidades, [id]: cantidad });
  };

  const manejarAgregarAlCarrito = (producto: Producto) => {
    const cantidad = cantidades[producto.id] || 1;
    agregarAlCarrito(producto, cantidad);
    setCantidades({ ...cantidades, [producto.id]: 0 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos Disponibles en el Mercado</CardTitle>
        <CardDescription>
          Explore y compre productos frescos de diferentes regiones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Región</TableHead>
              <TableHead>Cantidad Disponible</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productosDisponibles.map((producto) => (
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
                <TableCell>{producto.region}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                <TableCell>{producto.ubicacion}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="1"
                      max={producto.cantidad}
                      value={cantidades[producto.id] || ""}
                      onChange={(e) =>
                        manejarCambioCantidad(
                          producto.id,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-16"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => manejarAgregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

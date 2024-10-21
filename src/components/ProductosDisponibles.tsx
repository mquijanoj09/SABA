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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Producto } from "@/types";

interface ProductosDisponiblesProps {
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
}

export function ProductosDisponibles({
  agregarAlCarrito,
}: ProductosDisponiblesProps) {
  const [productosDisponibles] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Tomates Orgánicos",
      cantidad: 100,
      precio: 2.99,
      ubicacion: "Almacén Central",
      imagen: "/placeholder.svg?height=200&width=200",
      region: "Costa",
      descripcion:
        "Tomates frescos y jugosos de la costa, cultivados sin pesticidas.",
    },
    {
      id: 2,
      nombre: "Papas Andinas",
      cantidad: 200,
      precio: 1.5,
      ubicacion: "Almacén Norte",
      imagen: "/placeholder.svg?height=200&width=200",
      region: "Sierra",
      descripcion:
        "Papas nativas de los Andes, perfectas para freír o cocinar al horno.",
    },
    {
      id: 3,
      nombre: "Plátanos Verdes",
      cantidad: 150,
      precio: 1.2,
      ubicacion: "Almacén Sur",
      imagen: "/placeholder.svg?height=200&width=200",
      region: "Costa",
      descripcion: "Plátanos verdes ideales para patacones o chifles.",
    },
    {
      id: 4,
      nombre: "Quinua Real",
      cantidad: 80,
      precio: 3.5,
      ubicacion: "Almacén Central",
      imagen: "/placeholder.svg?height=200&width=200",
      region: "Sierra",
      descripcion: "Quinua de alta calidad, rica en proteínas y nutrientes.",
    },
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productosDisponibles.map((producto) => (
        <Card key={producto.id} className="flex flex-col h-full">
          <CardHeader>
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="flex-grow">
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
          <CardFooter className="flex items-center justify-between">
            <Input
              type="number"
              min="1"
              max={producto.cantidad}
              value={cantidades[producto.id] || 1}
              onChange={(e) =>
                manejarCambioCantidad(producto.id, parseInt(e.target.value))
              }
              className="w-20"
            />
            <Button
              onClick={() => manejarAgregarAlCarrito(producto)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

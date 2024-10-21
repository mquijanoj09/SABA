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
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Producto } from "@/types";
import { supabase } from "@/lib/supabase";

interface ProductosDisponiblesProps {
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
}

export function ProductosDisponibles({
  agregarAlCarrito,
}: ProductosDisponiblesProps) {
  const [productosDisponibles, setProductosDisponibles] = useState<Producto[]>(
    []
  );
  const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .gt("cantidad", 0);

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProductosDisponibles(data);
      }
    };
    fetchProductos();
  }, []);

  const manejarCambioCantidad = (id: string, cantidad: number) => {
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
              value={cantidades[producto.id] || ""}
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

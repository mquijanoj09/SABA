"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ItemCarrito } from "@/types";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface CarritoProps {
  carrito: ItemCarrito[];
  eliminarDelCarrito: (productoId: number) => void;
  actualizarCantidadCarrito: (
    productoId: number,
    nuevaCantidad: number
  ) => void;
}

export function Carrito({
  carrito,
  eliminarDelCarrito,
  actualizarCantidadCarrito,
}: CarritoProps) {
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  };

  const manejarCompra = () => {
    if (direccionEnvio && metodoPago) {
      setShowConfirmation(true);
    } else {
      alert("Por favor, complete la dirección de envío y el método de pago.");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Carrito de Compras
        </CardTitle>
        <CardDescription>
          Revise y ajuste sus productos seleccionados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {carrito.length === 0 ? (
          <p className="text-center text-gray-500">Su carrito está vacío.</p>
        ) : (
          carrito.map((item) => (
            <div
              key={item.producto.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={item.producto.imagen}
                  alt={item.producto.nombre}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.producto.nombre}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.producto.precio.toFixed(2)} c/u
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    actualizarCantidadCarrito(
                      item.producto.id,
                      item.cantidad - 1
                    )
                  }
                  disabled={item.cantidad <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.cantidad}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    actualizarCantidadCarrito(
                      item.producto.id,
                      item.cantidad + 1
                    )
                  }
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => eliminarDelCarrito(item.producto.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
        {carrito.length > 0 && (
          <div className="mt-6 space-y-4">
            <Input
              placeholder="Dirección de envío"
              value={direccionEnvio}
              onChange={(e) => setDireccionEnvio(e.target.value)}
            />
            <Input
              placeholder="Método de pago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      {carrito.length > 0 && (
        <CardFooter className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            Total: ${calcularTotal().toFixed(2)}
          </div>
          <Button
            onClick={manejarCompra}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Realizar Compra
          </Button>
        </CardFooter>
      )}

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmación de Compra</DialogTitle>
            <DialogDescription>
              Su pedido ha sido procesado con éxito. Gracias por su compra.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p>Total: ${calcularTotal().toFixed(2)}</p>
            <p>Dirección de envío: {direccionEnvio}</p>
            <p>Método de pago: {metodoPago}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => router.push("/historial-transacciones")}>
              Ver Mis Compras y Ventas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

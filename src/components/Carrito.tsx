"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { ItemCarrito, Producto } from "@/types";
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
import { supabase } from "@/lib/supabase";

interface CarritoProps {
  carrito: ItemCarrito[];
  eliminarDelCarrito: (itemId: string) => void;
  actualizarCantidadCarrito: (itemId: string, nuevaCantidad: number) => void;
}

export function Carrito({
  carrito,
  eliminarDelCarrito,
  actualizarCantidadCarrito,
}: CarritoProps) {
  const [productos, setProductos] = useState<{ [key: string]: Producto }>({});
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProductos = async () => {
      const productoIds = carrito.map((item) => item.producto_id);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .in("id", productoIds);

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        const productosMap = data.reduce((acc, producto) => {
          acc[producto.id] = producto;
          return acc;
        }, {} as { [key: string]: Producto });
        setProductos(productosMap);
      }
    };
    fetchProductos();
  }, [carrito]);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const producto = productos[item.producto_id];
      return total + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
  };

  const manejarCompra = async () => {
    if (direccionEnvio && ciudad && codigoPostal && metodoPago) {
      // Aquí iría la lógica para procesar la compra
      // Por ejemplo, crear una transacción y actualizar el inventario
      setShowConfirmation(true);
    } else {
      alert("Por favor, complete todos los campos del formulario de compra.");
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
          carrito.map((item) => {
            const producto = productos[item.producto_id];
            if (!producto) return null;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{producto.nombre}</h3>
                    <p className="text-sm text-gray-500">
                      ${producto.precio.toFixed(2)} c/u
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      actualizarCantidadCarrito(item.id, item.cantidad - 1)
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
                      actualizarCantidadCarrito(item.id, item.cantidad + 1)
                    }
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
        {carrito.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="direccionEnvio">Dirección de envío</Label>
              <Input
                id="direccionEnvio"
                value={direccionEnvio}
                onChange={(e) => setDireccionEnvio(e.target.value)}
                placeholder="Calle y número"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                placeholder="Ciudad"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                placeholder="Código Postal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metodoPago">Método de pago</Label>
              <Select onValueChange={setMetodoPago}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tarjeta">
                    Tarjeta de crédito/débito
                  </SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="transferencia">
                    Transferencia bancaria
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <p>
              Dirección de envío: {direccionEnvio}, {ciudad}, {codigoPostal}
            </p>
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ItemCarrito } from "@/app/page";

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
  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carrito de Compras</CardTitle>
        <CardDescription>
          Revise y ajuste sus productos seleccionados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carrito.map((item) => (
              <TableRow key={item.producto.id}>
                <TableCell className="flex items-center space-x-2">
                  <Image
                    src={item.producto.imagen}
                    alt={item.producto.nombre}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span>{item.producto.nombre}</span>
                </TableCell>
                <TableCell>${item.producto.precio.toFixed(2)}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      actualizarCantidadCarrito(
                        item.producto.id,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-16"
                  />
                </TableCell>
                <TableCell>
                  ${(item.producto.precio * item.cantidad).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => eliminarDelCarrito(item.producto.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">
          Total: ${calcularTotal().toFixed(2)}
        </div>
        <Button>Proceder al Pago</Button>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaccion {
  id: number;
  fecha: string;
  tipo: "compra" | "venta";
  producto: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

const transacciones: Transaccion[] = [
  {
    id: 1,
    fecha: "2023-05-01",
    tipo: "compra",
    producto: "Tomates",
    cantidad: 50,
    precioUnitario: 2.99,
    total: 149.5,
  },
  {
    id: 2,
    fecha: "2023-05-02",
    tipo: "venta",
    producto: "Papas",
    cantidad: 100,
    precioUnitario: 1.5,
    total: 150.0,
  },
  // Añade más transacciones aquí
];

export function HistorialTransacciones() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Transacciones</CardTitle>
        <CardDescription>
          Revise sus compras y ventas recientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacciones.map((transaccion) => (
              <TableRow key={transaccion.id}>
                <TableCell>{transaccion.fecha}</TableCell>
                <TableCell>
                  {transaccion.tipo === "compra" ? "Compra" : "Venta"}
                </TableCell>
                <TableCell>{transaccion.producto}</TableCell>
                <TableCell>{transaccion.cantidad}</TableCell>
                <TableCell>${transaccion.precioUnitario.toFixed(2)}</TableCell>
                <TableCell>${transaccion.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

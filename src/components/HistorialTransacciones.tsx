"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaccion, Producto } from "@/types";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

interface HistorialTransaccionesProps {
  usuarioId: string;
}

export function HistorialTransacciones({
  usuarioId,
}: HistorialTransaccionesProps) {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [productos, setProductos] = useState<{ [key: string]: Producto }>({});

  useEffect(() => {
    const fetchTransacciones = async () => {
      const { data, error } = await supabase
        .from("transacciones")
        .select("*")
        .eq("usuario_id", usuarioId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
      } else if (data) {
        setTransacciones(data);
        fetchProductos(data.map((t) => t.producto_id));
      }
    };

    fetchTransacciones();
  }, [usuarioId]);

  const fetchProductos = async (productoIds: string[]) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Historial de Transacciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Historial de compras y ventas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacciones.map((transaccion) => (
              <TableRow key={transaccion.id}>
                <TableCell>
                  {new Date(transaccion.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {transaccion.tipo === "compra" ? "Compra" : "Venta"}
                </TableCell>
                <TableCell>
                  {productos[transaccion.producto_id]?.nombre ||
                    "Producto no disponible"}
                </TableCell>
                <TableCell>{transaccion.cantidad}</TableCell>
                <TableCell className="text-right">
                  ${formatCurrency(transaccion.precio_total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

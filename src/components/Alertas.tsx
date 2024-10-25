"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// Static data for fruits
const frutasAntioquia = [
  {
    mes: "Septiembre",
    categorias: {
      "Alta Producción": ["Mango", "Piña"],
      "Ideal en Clima Fresco": ["Aguacate"],
      "Demanda Alta": ["Aguacate", "Maracuyá"],
    },
  },
  {
    mes: "Octubre",
    categorias: {
      "Alta Producción": ["Banano", "Piña"],
      "Demanda Baja": ["Aguacate"],
      "Buen Valor para Exportación": ["Maracuyá"],
    },
  },
  {
    mes: "Noviembre",
    categorias: {
      Sobreproducción: ["Mango"],
      "Demanda Baja": ["Guayaba"],
      "Demanda Estable": ["Banano"],
    },
  },
];

const getMesActual = (): string => {
  const opciones: Intl.DateTimeFormatOptions = { month: "long" };
  return new Date().toLocaleDateString("es-ES", opciones);
};

export function Alertas() {
  const [mesesAMostrar, setMesesAMostrar] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"Mejor" | "Peor">(
    "Mejor"
  );
  const mesActual = getMesActual();

  useEffect(() => {
    const mesIndice = new Date().getMonth();
    const meses = [];
    for (let i = -2; i <= 3; i++) {
      const nuevoMes = new Date(
        new Date().setMonth(mesIndice + i)
      ).toLocaleDateString("es-ES", { month: "long" });
      meses.push(nuevoMes.charAt(0).toUpperCase() + nuevoMes.slice(1));
    }
    setMesesAMostrar(meses);
  }, []);

  const productosFiltrados = frutasAntioquia.filter((producto) =>
    mesesAMostrar.includes(producto.mes)
  );

  return (
    <Card className="max-w-4xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Alertas y Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {productosFiltrados.map((producto, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {producto.mes}
                  {producto.mes === mesActual && (
                    <Badge className="ml-2 text-white bg-green-500">
                      Mes Actual
                    </Badge>
                  )}
                </h2>
              </div>
              <Separator className="my-2" />

              {Object.entries(producto.categorias).map(
                ([categoria, frutas], idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-sm font-medium">{categoria}</h3>
                    <div className="flex space-x-2">
                      {frutas.map((fruta: string, i: number) => (
                        <Badge key={i} className="bg-blue-100 text-blue-700">
                          {fruta}
                        </Badge>
                      ))}
                    </div>
                    <Separator className="my-2" />
                  </div>
                )
              )}

              <div className="flex space-x-4">
                <Badge
                  onClick={() => setSelectedCategory("Mejor")}
                  className={`cursor-pointer ${
                    selectedCategory === "Mejor" ? "bg-green-300" : ""
                  }`}
                >
                  Mejores Productos
                </Badge>
                <Badge
                  onClick={() => setSelectedCategory("Peor")}
                  className={`cursor-pointer ${
                    selectedCategory === "Peor" ? "bg-red-300" : ""
                  }`}
                >
                  Peores Productos
                </Badge>
              </div>

              <ResponsiveContainer width="100%" height={200} className="mt-4">
                <BarChart
                  data={producto.categorias[
                    selectedCategory === "Mejor"
                      ? "Alta Producción"
                      : "Demanda Baja"
                  ]?.map((fruta) => ({
                    fruta,
                    cantidad: Math.floor(Math.random() * 10) + 1,
                  }))}
                >
                  <XAxis dataKey="fruta" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar
                    dataKey="cantidad"
                    fill={selectedCategory === "Mejor" ? "#82ca9d" : "#f56565"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

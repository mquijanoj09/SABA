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
import { formatCurrency } from "@/lib/utils";

// Static data with more fruits for each month
const frutasAntioquia = [
  {
    mes: "Octubre",
    categorias: {
      "Alta Producción": ["Banano", "Piña", "Papaya", "Coco", "Lima"],
      "Buen Valor para Exportación": ["Maracuyá", "Granadilla"],
      "Demanda Baja": ["Aguacate", "Melón", "Sandía", "Guayaba"],
    },
  },
  {
    mes: "Noviembre",
    categorias: {
      "Alta Producción": ["Mango", "Melón", "Sandía", "Papaya"],
      "Ideal en Clima Fresco": ["Fresa", "Durazno", "Manzana"],
      "Demanda Baja": ["Guayaba", "Coco", "Lima", "Banano"],
    },
  },
  {
    mes: "Diciembre",
    categorias: {
      "Alta Producción": ["Mango", "Piña", "Papaya", "Melón", "Sandía"],
      "Ideal en Clima Fresco": ["Aguacate", "Fresa", "Durazno"],
      "Demanda Baja": ["Aguacate", "Maracuyá", "Granadilla", "Guayaba"],
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
  console.log(mesActual);

  useEffect(() => {
    const mesIndice = new Date().getMonth();
    const meses = [];
    for (let i = -1; i <= 5; i++) {
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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Alertas y Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          {productosFiltrados.map((producto, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold">{producto.mes}</h2>
                {producto.mes.toLowerCase() === mesActual.toLowerCase() && (
                  <Badge className="ml-2 text-white bg-green-500 hover:bg-green-400">
                    Mes Actual
                  </Badge>
                )}
              </div>
              <Separator className="my-2" />

              {Object.entries(producto.categorias).map(
                ([categoria, frutas], idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-sm font-medium">{categoria}</h3>
                    <div className="flex space-x-2">
                      {frutas.map((fruta: string, i: number) => (
                        <Badge
                          key={i}
                          className="bg-teal-100 text-teal-700 hover:bg-teal-200 transition"
                        >
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
                    selectedCategory === "Mejor"
                      ? "bg-green-300 hover:bg-green-200 text-green-700"
                      : ""
                  }`}
                >
                  Mejores Productos
                </Badge>
                <Badge
                  onClick={() => setSelectedCategory("Peor")}
                  className={`cursor-pointer ${
                    selectedCategory === "Peor"
                      ? "bg-red-300 hover:bg-red-200 text-red-700"
                      : ""
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
                    valorMercado: formatCurrency(
                      Math.floor(Math.random() * ((10000 - 1000) / 100 + 1)) *
                        100 +
                        1000
                    ),
                  }))}
                >
                  <XAxis dataKey="fruta" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar
                    dataKey="valorMercado"
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

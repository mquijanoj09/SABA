"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase";

interface Estadistica {
  fecha: string;
  ventas: number;
  compras: number;
}

interface EstadisticasProps {
  usuarioId: string;
}

export function Estadisticas({ usuarioId }: EstadisticasProps) {
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      const { data, error } = await supabase.rpc(
        "obtener_estadisticas_usuario",
        {
          usuario_id: usuarioId,
        }
      );

      if (error) {
        console.error("Error fetching statistics:", error);
      } else if (data) {
        setEstadisticas(data);
      }
    };
    fetchEstadisticas();
  }, [usuarioId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Estadísticas de Ventas y Compras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={estadisticas}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ventas" fill="#82ca9d" name="Ventas" />
            <Bar dataKey="compras" fill="#8884d8" name="Compras" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

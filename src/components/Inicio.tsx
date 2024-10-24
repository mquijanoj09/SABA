"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Package, BarChart2, TrendingUp, ShoppingCart } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";

interface EstadisticasGenerales {
  totalProductos: number;
}

interface DatosSuministroDemanda {
  mes: string;
  suministro: number;
  demanda: number;
}

interface DatosVentas {
  mes: string;
  ventas: number;
}

interface DatosCosecha {
  nombre: string;
  cantidad: number;
}

interface Props {
  setSeccionActiva: (seccion: string) => void;
}

// const datosSuministroDemanda1 = [
//   { mes: "Ene", suministro: 4000, demanda: 2400 },
//   { mes: "Feb", suministro: 3000, demanda: 1398 },
//   { mes: "Mar", suministro: 2000, demanda: 9800 },
//   { mes: "Abr", suministro: 2780, demanda: 3908 },
//   { mes: "May", suministro: 1890, demanda: 4800 },
//   { mes: "Jun", suministro: 2390, demanda: 3800 },
// ];

// const datosCosecha = [
//   { nombre: "Tomates", cantidad: 4000 },
//   { nombre: "Lechuga", cantidad: 3000 },
//   { nombre: "Zanahorias", cantidad: 2000 },
//   { nombre: "Papas", cantidad: 2780 },
//   { nombre: "Cebollas", cantidad: 1890 },
//   { nombre: "Pepinos", cantidad: 2390 },
// ];

// const datosIngresos = [
//   { mes: "Ene", ventas: 10000 },
//   { mes: "Feb", ventas: 12000 },
//   { mes: "Mar", ventas: 9000 },
//   { mes: "Abr", ventas: 15000 },
//   { mes: "May", ventas: 18000 },
//   { mes: "Jun", ventas: 20000 },
// ];

export function Inicio({ setSeccionActiva }: Props) {
  const [estadisticas, setEstadisticas] =
    useState<EstadisticasGenerales | null>(null);
  const [datosSuministroDemanda, setDatosSuministroDemanda] = useState<
    DatosSuministroDemanda[]
  >([]);
  const [datosVentas, setDatosVentas] = useState<DatosVentas[]>([]);
  const [datosCosecha, setDatosCosecha] = useState<DatosCosecha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch total products
        const { data: productos, error: productosError } = await supabase
          .from("productos")
          .select("count", { count: "exact" });

        if (productosError) throw productosError;

        // Set general statistics
        setEstadisticas({
          totalProductos: productos.length,
        });

        // Fetch supply and demand data (this is a simplified example)
        const { data: transacciones, error: transaccionesError } =
          await supabase
            .from("transacciones")
            .select("created_at, tipo, cantidad")
            .gte(
              "created_at",
              new Date(
                new Date().setMonth(new Date().getMonth() - 6)
              ).toISOString()
            );

        if (transaccionesError) throw transaccionesError;

        // Fetch harvest data
        const { data: productosNombres, error: cosechaError } = await supabase
          .from("productos")
          .select("nombre, cantidad");

        if (cosechaError) throw cosechaError;
        setDatosCosecha(productosNombres);

        const suministroDemanda = transacciones.reduce((acc, t) => {
          const mes = new Date(t.created_at).toLocaleString("default", {
            month: "short",
          });
          if (!acc[mes]) acc[mes] = { suministro: 0, demanda: 0 };
          if (t.tipo === "venta") acc[mes].demanda += t.cantidad;
          else acc[mes].suministro += t.cantidad;
          return acc;
        }, {} as Record<string, { suministro: number; demanda: number }>);

        setDatosSuministroDemanda(
          Object.entries(suministroDemanda).map(([mes, data]) => ({
            mes,
            ...data,
          }))
        );

        // Fetch income data
        const { data: ventas, error: ventasError } = await supabase
          .from("transacciones")
          .select("created_at, precio_total")
          .eq("tipo", "venta")
          .gte(
            "created_at",
            new Date(
              new Date().setMonth(new Date().getMonth() - 6)
            ).toISOString()
          );

        if (ventasError) throw ventasError;

        const ventasPorMes = ventas.reduce((acc, t) => {
          const mes = new Date(t.created_at).toLocaleString("default", {
            month: "short",
          });
          if (!acc[mes]) acc[mes] = 0;
          acc[mes] += t.precio_total;
          return acc;
        }, {} as Record<string, number>);

        setDatosVentas(
          Object.entries(ventasPorMes).map(([mes, ventas]) => ({
            mes,
            ventas,
          }))
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Hubo un error al cargar los datos. Por favor, intente de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            Bienvenido a SABA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-semibold mb-2">
                Sistema de Abastecimiento Basado en Agricultura
              </h2>
              <p className="text-gray-600">
                SABA es una plataforma que conecta productores, cooperativas y
                consumidores para facilitar el comercio justo y sostenible de
                productos agrícolas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {estadisticas && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cantidad Productos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estadisticas.totalProductos}
              </div>
              <p className="text-xs text-muted-foreground">
                +20% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pedidos Activos
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estadisticas.totalProductos}
              </div>
              <p className="text-xs text-muted-foreground">
                +15% desde la semana pasada
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Suministro vs Demanda
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={datosSuministroDemanda}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="suministro"
                    stroke="#008080"
                    fill="#008080"
                  />
                  <Area
                    type="monotone"
                    dataKey="demanda"
                    stroke="#ff007f"
                    fill="#ff007f"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cosecha Actual
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={datosCosecha}>
                  <XAxis dataKey="nombre" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#008000" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ventas Mensuales
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={datosVentas}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ventas" stroke="#0000ff" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Comienza a usar SABA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Explora las diferentes funcionalidades de SABA para sacar el
              máximo provecho de la plataforma:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setSeccionActiva("Productos")}
              >
                Ver Productos Disponibles
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setSeccionActiva("Mis Productos")}
              >
                Administrar Mis Productos
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setSeccionActiva("Historial")}
              >
                Revisar Historial de Transacciones
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setSeccionActiva("Alertas")}
              >
                Configurar Alertas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

{
  /* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
      <Package className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">254</div>
      <p className="text-xs text-muted-foreground">+20% desde el mes pasado</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">45</div>
      <p className="text-xs text-muted-foreground">
        +15% desde la semana pasada
      </p>
    </CardContent>
  </Card>
  <Card className="col-span-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        Suministro vs Demanda
      </CardTitle>
      <BarChart2 className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={datosSuministroDemanda}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="suministro"
            stroke="#008080"
            fill="#008080"
          />
          <Area
            type="monotone"
            dataKey="demanda"
            stroke="#ff007f"
            fill="#ff007f"
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  <Card className="col-span-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Cosecha Actual</CardTitle>
      <Package className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={datosCosecha}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#008000" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  <Card className="col-span-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Ventas Mensuales</CardTitle>
      <TrendingUp className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={datosIngresos}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#0000ff" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>; */
}

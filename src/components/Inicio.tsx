import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, BarChart2, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const datosSuministroDemanda = [
  { mes: "Ene", suministro: 4000, demanda: 2400 },
  { mes: "Feb", suministro: 3000, demanda: 1398 },
  { mes: "Mar", suministro: 2000, demanda: 9800 },
  { mes: "Abr", suministro: 2780, demanda: 3908 },
  { mes: "May", suministro: 1890, demanda: 4800 },
  { mes: "Jun", suministro: 2390, demanda: 3800 },
];

const datosCosecha = [
  { nombre: "Tomates", cantidad: 4000 },
  { nombre: "Lechuga", cantidad: 3000 },
  { nombre: "Zanahorias", cantidad: 2000 },
  { nombre: "Papas", cantidad: 2780 },
  { nombre: "Cebollas", cantidad: 1890 },
  { nombre: "Pepinos", cantidad: 2390 },
];

const datosIngresos = [
  { mes: "Ene", ingresos: 10000 },
  { mes: "Feb", ingresos: 12000 },
  { mes: "Mar", ingresos: 9000 },
  { mes: "Abr", ingresos: 15000 },
  { mes: "May", ingresos: 18000 },
  { mes: "Jun", ingresos: 20000 },
];

export function Inicio() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">254</div>
          <p className="text-xs text-muted-foreground">
            +20% desde el mes pasado
          </p>
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
          <CardTitle className="text-sm font-medium">
            Ingresos Mensuales
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={datosIngresos}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#0000ff" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

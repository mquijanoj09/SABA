import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const datosSuministroDemanda = [
  { nombre: "Área Urbana 1", suministro: 4000, demanda: 2400 },
  { nombre: "Área Urbana 2", suministro: 3000, demanda: 1398 },
  { nombre: "Área Urbana 3", suministro: 2000, demanda: 9800 },
  { nombre: "Área Urbana 4", suministro: 2780, demanda: 3908 },
  { nombre: "Área Rural 1", suministro: 1890, demanda: 4800 },
  { nombre: "Área Rural 2", suministro: 2390, demanda: 3800 },
];

const datosIngresos = [
  { mes: "Ene", ingresos: 10000 },
  { mes: "Feb", ingresos: 12000 },
  { mes: "Mar", ingresos: 9000 },
  { mes: "Abr", ingresos: 15000 },
  { mes: "May", ingresos: 18000 },
  { mes: "Jun", ingresos: 20000 },
];

export function Estadisticas() {
  return (
    <Tabs defaultValue="suministro-demanda">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="suministro-demanda">
          Suministro y Demanda
        </TabsTrigger>
        <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
      </TabsList>
      <TabsContent value="suministro-demanda">
        <Card>
          <CardHeader>
            <CardTitle>Suministro y Demanda</CardTitle>
            <CardDescription>
              Comparación de suministro y demanda por área.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={datosSuministroDemanda}>
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="suministro"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="demanda"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ingresos">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>
              Tendencia de ingresos en los últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={datosIngresos}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ingresos" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

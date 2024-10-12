import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";

export function Alertas() {
  const alertas = [
    {
      id: 1,
      tipo: "suministro",
      mensaje: "Los tomates están escasos en el Área Urbana 2.",
    },
    {
      id: 2,
      tipo: "clima",
      mensaje: "Se espera lluvia intensa en el Área Rural 1 la próxima semana.",
    },
    {
      id: 3,
      tipo: "demanda",
      mensaje: "Alta demanda de vegetales orgánicos en el Área Urbana 3.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas</CardTitle>
        <CardDescription>
          Notificaciones importantes y alertas meteorológicas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className="flex items-center space-x-4 rounded-md border p-4"
            >
              <Bell
                className={`h-4 w-4 ${
                  alerta.tipo === "clima" ? "text-blue-500" : "text-amber-500"
                }`}
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {alerta.tipo === "clima"
                    ? "Alerta Meteorológica"
                    : alerta.tipo === "suministro"
                    ? "Alerta de Suministro"
                    : "Alerta de Demanda"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {alerta.mensaje}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

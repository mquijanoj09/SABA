"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Alerta {
  id: string;
  usuario_id: string;
  mensaje: string;
  tipo: "info" | "warning" | "error";
  created_at: string;
}

interface AlertasProps {
  usuarioId: string;
}

export function Alertas({ usuarioId }: AlertasProps) {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      const { data, error } = await supabase
        .from("alertas")
        .select("*")
        .eq("usuario_id", usuarioId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching alerts:", error);
      } else if (data) {
        setAlertas(data);
      }
    };
    fetchAlertas();
    const channel = supabase
      .channel("alertas")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alertas" },
        (payload) => {
          if (payload.new.usuario_id === usuarioId) {
            setAlertas((prevAlertas) => [
              payload.new as Alerta,
              ...prevAlertas,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [usuarioId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">
          Alertas y Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alertas.length === 0 ? (
          <p className="text-center text-gray-500">No hay alertas nuevas.</p>
        ) : (
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <Alert
                key={alerta.id}
                variant={alerta.tipo === "error" ? "destructive" : "default"}
              >
                <Bell className="h-4 w-4" />
                <AlertTitle>
                  {alerta.tipo === "info"
                    ? "Información"
                    : alerta.tipo === "warning"
                    ? "Advertencia"
                    : "Error"}
                </AlertTitle>
                <AlertDescription>{alerta.mensaje}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

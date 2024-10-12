import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContenidoNoAutorizado() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acceso No Autorizado</CardTitle>
        <CardDescription>
          No tiene permiso para ver este contenido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Por favor, contacte a un administrador si cree que debería tener
          acceso a esta sección.
        </p>
      </CardContent>
    </Card>
  );
}

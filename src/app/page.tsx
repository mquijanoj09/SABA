"use client";

import { useState } from "react";
import { ProductosDisponibles } from "@/components/ProductosDisponibles";
import { AdministracionProductos } from "@/components/AdministracionProductos";
import { Carrito } from "@/components/Carrito";
import { HistorialTransacciones } from "@/components/HistorialTransacciones";
import { Alertas } from "@/components/Alertas";
import { Estadisticas } from "@/components/Estadisticas";
import { GestionUsuarios } from "@/components/GestionUsuarios";
import { ContenidoNoAutorizado } from "@/components/ContenidoNoAutorizado";
import { Configuracion } from "@/components/Configuracion";
import { BarraLateral } from "@/components/BarraLateral";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Inicio } from "@/components/Inicio";
import { FormularioLogin } from "@/components/FormularioLogin";
import { Usuario, Producto, ItemCarrito } from "@/types";

const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Admin",
    email: "a@a.com",
    rol: "administrador",
    contrasena: "a",
  },
  {
    id: 2,
    nombre: "Usuario OAF",
    email: "oaf@saba.com",
    rol: "oaf",
    contrasena: "oaf123",
  },
  {
    id: 3,
    nombre: "Productor",
    email: "productor@saba.com",
    rol: "productor",
    contrasena: "productor123",
  },
  {
    id: 4,
    nombre: "Cooperativa",
    email: "cooperativa@saba.com",
    rol: "cooperativa",
    contrasena: "cooperativa123",
  },
  {
    id: 5,
    nombre: "Consumidor",
    email: "consumidor@saba.com",
    rol: "consumidor",
    contrasena: "consumidor123",
  },
];

export default function Home() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [errorLogin, setErrorLogin] = useState("");
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const manejarLogin = (email: string, contrasena: string) => {
    const usuario = usuarios.find(
      (u) => u.email === email && u.contrasena === contrasena
    );
    if (usuario) {
      setUsuarioActual(usuario);
      setSeccionActiva("inicio");
      setErrorLogin("");
    } else {
      setErrorLogin("Email o contraseña inválidos");
    }
  };

  const manejarLogout = () => {
    setUsuarioActual(null);
    setSeccionActiva("inicio");
    setCarrito([]);
  };

  const actualizarUsuario = (usuarioActualizado: Usuario) => {
    setUsuarioActual((prevUsuario) => ({
      ...prevUsuario!,
      ...usuarioActualizado,
    }));
  };

  const agregarAlCarrito = (producto: Producto, cantidad: number) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find(
        (item) => item.producto.id === producto.id
      );
      if (itemExistente) {
        return prevCarrito.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { producto, cantidad }];
      }
    });
  };

  const eliminarDelCarrito = (productoId: number) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.producto.id !== productoId)
    );
  };

  const actualizarCantidadCarrito = (
    productoId: number,
    nuevaCantidad: number
  ) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.producto.id === productoId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const renderizarContenido = () => {
    if (!usuarioActual) {
      return <FormularioLogin onLogin={manejarLogin} error={errorLogin} />;
    }

    switch (seccionActiva) {
      case "Inicio":
        return <Inicio />;
      case "Productos":
        return <ProductosDisponibles agregarAlCarrito={agregarAlCarrito} />;
      case "Mis Productos":
        return <AdministracionProductos />;
      case "Carrito":
        return (
          <Carrito
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            actualizarCantidadCarrito={actualizarCantidadCarrito}
          />
        );
      case "Historial":
        return <HistorialTransacciones />;
      case "Alertas":
        return <Alertas />;
      case "Estadísticas":
        return <Estadisticas />;
      case "Usuarios":
        return usuarioActual.rol === "administrador" ? (
          <GestionUsuarios
            usuarios={usuarios}
            actualizarUsuario={actualizarUsuario}
          />
        ) : (
          <ContenidoNoAutorizado />
        );
      case "Configuracion":
        return (
          <Configuracion
            usuarioActual={usuarioActual}
            actualizarUsuario={actualizarUsuario}
          />
        );
      default:
        return <Inicio />;
    }
  };

  if (!usuarioActual) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
        {renderizarContenido()}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <BarraLateral
        seccionActiva={seccionActiva}
        onNavegacion={setSeccionActiva}
        tipoUsuario={usuarioActual.rol}
      />
      <div className="flex-1 flex flex-col">
        <BarraSuperior
          setSeccionActiva={setSeccionActiva}
          seccionActiva={seccionActiva}
          usuarioActual={usuarioActual}
          onLogout={manejarLogout}
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
        />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 p-6">
          {renderizarContenido()}
        </main>
      </div>
    </div>
  );
}

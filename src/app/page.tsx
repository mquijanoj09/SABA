"use client";

import { useState } from "react";
import { ProductosDisponibles } from "../components/ProductosDisponibles";
import { AdministracionProductos } from "../components/AdministracionProductos";
import { Carrito } from "../components/Carrito";
import { HistorialTransacciones } from "../components/HistorialTransacciones";
import { Alertas } from "../components/Alertas";
import { Estadisticas } from "../components/Estadisticas";
import { GestionUsuarios } from "../components/GestionUsuarios";
import { ContenidoNoAutorizado } from "../components/ContenidoNoAutorizado";
import { Configuracion } from "../components/Configuracion";
import { BarraLateral } from "../components/BarraLateral";
import { BarraSuperior } from "../components/BarraSuperior";
import { Inicio } from "../components/Inicio";
import { FormularioLogin } from "../components/FormularioLogin";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  contrasena: string;
}

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  ubicacion: string;
  imagen: string;
  region: string;
  descripcion: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Usuario Administrador",
    email: "admin@ejemplo.com",
    rol: "administrador",
    contrasena: "admin123",
  },
  {
    id: 2,
    nombre: "Usuario OAF",
    email: "oaf@ejemplo.com",
    rol: "oaf",
    contrasena: "oaf123",
  },
  {
    id: 3,
    nombre: "Usuario Productor",
    email: "productor@ejemplo.com",
    rol: "productor",
    contrasena: "productor123",
  },
  {
    id: 4,
    nombre: "Usuario Cooperativa",
    email: "coop@ejemplo.com",
    rol: "cooperativa",
    contrasena: "coop123",
  },
  {
    id: 5,
    nombre: "Usuario Consumidor",
    email: "consumidor@ejemplo.com",
    rol: "consumidor",
    contrasena: "consumidor123",
  },
  {
    id: 6,
    nombre: "Usuario Consumidor",
    email: "a@a.com",
    rol: "administrador",
    contrasena: "a",
  },
];

export default function AppComponente() {
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
      case "inicio":
        return <Inicio />;
      case "productos-disponibles":
        return <ProductosDisponibles agregarAlCarrito={agregarAlCarrito} />;
      case "productos-administracion":
        return <AdministracionProductos />;
      case "carrito":
        return (
          <Carrito
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            actualizarCantidadCarrito={actualizarCantidadCarrito}
          />
        );
      case "historial-transacciones":
        return <HistorialTransacciones />;
      case "alertas":
        return <Alertas />;
      case "estadisticas":
        return <Estadisticas />;
      case "usuarios":
        return usuarioActual.rol === "administrador" ? (
          <GestionUsuarios
            usuarios={usuarios}
            actualizarUsuario={actualizarUsuario}
          />
        ) : (
          <ContenidoNoAutorizado />
        );
      case "configuracion":
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {renderizarContenido()}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <BarraLateral
        seccionActiva={seccionActiva}
        onNavegacion={setSeccionActiva}
        tipoUsuario={usuarioActual.rol}
      />
      <main className="flex-1 overflow-y-auto">
        <BarraSuperior
          seccionActiva={seccionActiva}
          usuarioActual={usuarioActual}
          onLogout={manejarLogout}
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
        />
        <div className="p-6">{renderizarContenido()}</div>
      </main>
    </div>
  );
}

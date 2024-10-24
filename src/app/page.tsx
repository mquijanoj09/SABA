"use client";

import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [seccionActiva, setSeccionActiva] = useState("Inicio");
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [errorLogin, setErrorLogin] = useState("");
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        fetchUsuario(data.session.user.id);
      } else if (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  const fetchUsuario = async (userId: string) => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
    } else if (data) {
      setUsuarioActual(data);
    }
  };

  const manejarLogin = async (email: string, contrasena: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    });

    if (error) {
      setErrorLogin(error.message);
    } else if (data.session?.user) {
      fetchUsuario(data.session.user.id);
      setSeccionActiva("Inicio");
      setErrorLogin("");
    }
  };

  const manejarLogout = async () => {
    await supabase.auth.signOut();
    setUsuarioActual(null);
    setSeccionActiva("Inicio");
    setCarrito([]);
  };

  const actualizarUsuario = async (usuarioActualizado: Partial<Usuario>) => {
    if (!usuarioActual) return;

    const { data, error } = await supabase
      .from("usuarios")
      .update(usuarioActualizado)
      .eq("id", usuarioActual.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
    } else if (data) {
      setUsuarioActual((prev) => {
        if (!prev) return null; // Ensure `prev` is not null for safety
        return { ...prev, ...data } as Usuario;
      });
    }
  };

  const agregarAlCarrito = async (producto: Producto, cantidad: number) => {
    if (!usuarioActual) return;

    const { data, error } = await supabase
      .from("carrito")
      .insert({
        usuario_id: usuarioActual.id,
        producto_id: producto.id,
        cantidad,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding to cart:", error);
    } else if (data) {
      setCarrito([...carrito, data]);
    }
  };

  const eliminarDelCarrito = async (itemId: string) => {
    const { error } = await supabase.from("carrito").delete().eq("id", itemId);

    if (error) {
      console.error("Error removing from cart:", error);
    } else {
      setCarrito(carrito.filter((item) => item.id !== itemId));
    }
  };

  const actualizarCantidadCarrito = async (
    itemId: string,
    nuevaCantidad: number
  ) => {
    const { data, error } = await supabase
      .from("carrito")
      .update({ cantidad: nuevaCantidad })
      .eq("id", itemId)
      .select()
      .single();

    if (error) {
      console.error("Error updating cart quantity:", error);
    } else if (data) {
      setCarrito(carrito.map((item) => (item.id === itemId ? data : item)));
    }
  };

  const renderizarContenido = () => {
    if (!usuarioActual) {
      return <FormularioLogin onLogin={manejarLogin} error={errorLogin} />;
    }

    switch (seccionActiva) {
      case "Inicio":
        return <Inicio setSeccionActiva={setSeccionActiva} />;
      case "Productos":
        return <ProductosDisponibles agregarAlCarrito={agregarAlCarrito} />;
      case "Mis Productos":
        return <AdministracionProductos usuarioId={usuarioActual.id} />;
      case "Carrito":
        return (
          <Carrito
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            actualizarCantidadCarrito={actualizarCantidadCarrito}
            setSeccionActiva={setSeccionActiva}
          />
        );
      case "Historial":
        return <HistorialTransacciones usuarioId={usuarioActual.id} />;
      case "Alertas":
        return <Alertas usuarioId={usuarioActual.id} />;
      case "Estadísticas":
        return <Estadisticas usuarioId={usuarioActual.id} />;
      case "Usuarios":
        return usuarioActual.rol === "administrador" ? (
          <GestionUsuarios />
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
        return <Inicio setSeccionActiva={setSeccionActiva} />;
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
        />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 p-6">
          {renderizarContenido()}
        </main>
      </div>
    </div>
  );
}

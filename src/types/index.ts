export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  created_at: string;
}

export interface Producto {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  ubicacion: string;
  imagen: string;
  region: string;
  descripcion: string;
  usuario_id: string;
  created_at: string;
}

export interface ItemCarrito {
  id: string;
  producto_id: string;
  usuario_id: string;
  cantidad: number;
  created_at: string;
}

export interface Transaccion {
  id: string;
  usuario_id: string;
  producto_id: string;
  cantidad: number;
  precio_total: number;
  tipo: "compra" | "venta";
  created_at: string;
}

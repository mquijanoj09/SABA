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

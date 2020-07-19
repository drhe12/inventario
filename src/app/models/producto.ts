import { Kardex } from './kardex';

export interface Producto {
  id?: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
  imagen?: string;
  qr?: string;
  kardex?: Kardex;
}

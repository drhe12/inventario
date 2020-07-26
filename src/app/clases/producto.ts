import { Kardex } from './kardex';

export class Producto {
  id?: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
  imagen?: string;
  qr?: string;
  kardex?: Kardex;
}

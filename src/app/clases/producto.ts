import { Kardex } from './kardex';

export class Producto {
  id?: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
  qr?: string;
  kardex?: Kardex;
}

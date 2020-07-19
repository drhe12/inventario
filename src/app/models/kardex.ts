export interface Kardex {
  id?: string;
  fecha: Date;
  detalle: string;
  valor_unit: number;
  cant_e: number;
  total_e: number;
  cant_s: number;
  total_s: number;
  cant_t: number;
  total_t: number;
}

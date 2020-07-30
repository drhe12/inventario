import { Injectable } from '@angular/core';
//importamos las directivas
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportarService {

  constructor() { }

  exportarExcel( json: any[], nombreArchivoExcel: string ) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: {'data': worksheet},
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write( workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarExcel(excelBuffer, nombreArchivoExcel);
  }
  //Metodo para guardar como archivo excel
  guardarExcel( buffer: any, nombreArchivo: string ) {
    const data: Blob = new Blob( [buffer], { type: EXCEL_TYPE } );
    FileSaver.saveAs( data, nombreArchivo + '_export_' + new Date().getDate() + EXCEL_EXT);
  }
}

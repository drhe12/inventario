import { Injectable } from '@angular/core';
//Para llamar a la base de datos de Cloud Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  nuevoProduId = null;

  constructor( private db: AngularFirestore ) { }

  //Para obtener los productos que se encuentran en
  //la colección Productos del Firebase
  getProductos() {
    return this.db.collection('productos').snapshotChanges().pipe(map (productos => {
      return productos.map(producto => {
        const data = producto.payload.doc.data() as Producto;
        data.id = producto.payload.doc.id;
        return data;
      })
    }))
  }

  //Crear un nuevo producto en Firebase
  crearProducto( nombre: string, marca: string, stock: number, precio: number, qr?: string, imagen?: string ) {
    this.db.collection('productos').add({nombre, marca, stock, precio}).then( nuevoProdu => {
      this.nuevoProduId = nuevoProdu.id;
      console.log('Nuevo producto registrado: ' + nombre + ' ID: ' + nuevoProdu.id);
    }).catch( error => {
      console.log('Error: ' + error);
    });
  }

  obtenerID() {
    return this.nuevoProduId;
  }

  //Guardar el producto con QR
  agregarQR( id: string, qr: string ) {
    this.db.collection('productos').doc(id).update({qr}).then( agregaQR => {
      console.log('QR agregado: ' + qr + 'ID: ' + id);
    }).catch( error => {
      console.log('Error: ' + error);
    });
  }

}

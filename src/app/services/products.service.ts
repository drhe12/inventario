import { Injectable } from '@angular/core';
//Para llamar a la base de datos de Cloud Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';
import { Kardex } from '../models/kardex';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  nuevoProduId = null;

  nuevoKardex: Kardex = {
    fecha: new Date(),
    detalle: 'stock inicial',
    valor_unit: 0,
    cant_e: 0,
    total_e: 0,
    cant_t: 0,
    total_t: 0
  };

  constructor( private db: AngularFirestore ) { }

  //Para obtener los productos que se encuentran en
  //la colección productos del Firebase
  getProductos() {
    return this.db.collection('productos').snapshotChanges().pipe(map (productos => {
      return productos.map(producto => {
        const data = producto.payload.doc.data() as Producto;
        data.id = producto.payload.doc.id;
        return data;
      });
    }));
  }

  //Obtener un producto
  getProducto( producto_id: string ) {
    return this.db.collection('productos').doc(producto_id).valueChanges();
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

  //Eliminar producto
  eliminarProducto( producto_id: string ) {
    return this.db.collection('productos').doc(producto_id).delete();
  }

  //Editar stock producto
  editarStock( id: string, nuevoStock: number ) {
    this.db.collection('productos').doc(id).update({ stock: nuevoStock }).then( () => {
      console.log('Stock actualizado: ' + nuevoStock);
    }).catch( error => {
      console.log('Error: ' + error);
    });
  }

  //Leer kardex
  /*getKardex( producto_id: string ) {
    return this.db.collection('productos').doc(producto_id)
            .collection('kardex').snapshotChanges().pipe(map (kardex => {
              return kardex.map(kardex => {
                const data = kardex.payload.doc.data() as Kardex;
                data.id = kardex.payload.doc.id;
                return data;
              });
            }));
  }*/


  agregarKardex( id: string, karde: Kardex ) {
    this.db.collection('productos').doc(id).update({
      kardex: firestore.FieldValue.arrayUnion(karde),
    });
  }
}

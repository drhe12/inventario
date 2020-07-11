import { Injectable } from '@angular/core';
//Para llamar a la base de datos de Cloud Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

}

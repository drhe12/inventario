import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  // qrData: Producto = {
  //   nombre: null,
  //   marca: null,
  //   stock: null,
  //   precio: null,
  // };

  articuloCreado: Producto = {
    nombre: null,
    marca: null,
    stock: null,
    qr: null,
    precio: null
  };

  //elementType: 'url' | 'img' | 'canvas' = 'canvas';

  qr = null;

  constructor( private productService: ProductsService ) { }

  ngOnInit(): void {
  }

  registrarDatos() {
    //Creamos al producto para obtener su id

    // this.qrData.nombre = this.articuloCreado.nombre;
    // this.qrData.marca = this.articuloCreado.marca;
    // this.qrData.stock = this.articuloCreado.stock;
    // this.qrData.precio = this.articuloCreado.precio;

    this.qr = 'http://localhost:4200/#/products';

    //console.log(this.id);
    //console.log(this.qrData);
    console.log(this.articuloCreado);

  }

  Limpiar() {
    this.articuloCreado.nombre = '';
    this.articuloCreado.marca = '';
    this.articuloCreado.stock = null;
    this.articuloCreado.precio = null;

    this.qr = null;
    // this.articuloCreado.nombre = this.qrData.nombre;
    // this.articuloCreado.marca = this.qrData.marca;
    // this.articuloCreado.stock = this.qrData.stock;
    // this.articuloCreado.precio = this.qrData.precio;
  }

  guardarProducto() {
    //El elementType del QR por default es 'canvas' por eso cuando se corre
    //la web el QR se muestra dentro de una etiqueta HTML canvas
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    //Obtenemos su URL como imagen de la siguiente manera
    const imagenURL = canvas.toDataURL('image/jpeg').toString();
    //ahora ya tenemos el QR en una URL que podemos almacenar
    //en nuestro producto y guardarlo en la bd
    console.log('URL: ', imagenURL);

    this.articuloCreado.qr = imagenURL;

    //Creamos el producto y guardamos en Firebase
    this.productService.crearProducto(
      this.articuloCreado.nombre,
      this.articuloCreado.marca,
      this.articuloCreado.stock,
      this.articuloCreado.precio,
      this.articuloCreado.qr );

    console.log( this.articuloCreado );
    this.qr = null;
    //No es muy necesario
    //Dividir el URL del QR que se genera
    // let data = imagenURL.split(',')[1];

    // console.log(data);
  }
}

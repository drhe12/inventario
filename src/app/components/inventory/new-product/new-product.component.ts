import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  qrData: Producto = {
    nombre: null,
    marca: null,
    stock: null,
    precio: null,
    qr: null,
  };

  articuloCreado: Producto = {
    nombre: null,
    marca: null,
    stock: null,
    precio: null,
    qr: null,
  };

  //elementType: 'url' | 'img' | 'canvas' = 'canvas';

  qrr = '';

  constructor( private productService: ProductsService ) { }

  ngOnInit(): void {
  }

  registrarDatos() {
    this.articuloCreado.nombre = this.qrData.nombre;
    this.articuloCreado.marca = this.qrData.marca;
    this.articuloCreado.stock = this.qrData.stock;
    this.articuloCreado.precio = this.qrData.precio;

    console.log(this.qrData);
    console.log(this.articuloCreado);

  }

  Limpiar() {
    this.qrData.nombre = '';
    this.qrData.marca = '';
    this.qrData.stock = null;
    this.qrData.precio = null;

    this.articuloCreado.nombre = this.qrData.nombre;
    this.articuloCreado.marca = this.qrData.marca;
    this.articuloCreado.stock = this.qrData.stock;
    this.articuloCreado.precio = this.qrData.precio;
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

    this.productService.crearProducto(
      this.articuloCreado.nombre,
      this.articuloCreado.marca,
      this.articuloCreado.stock,
      this.articuloCreado.precio,
      this.articuloCreado.qr );

    console.log( this.articuloCreado );
    //No es muy necesario
    //Dividir el URL del QR que se genera
    // let data = imagenURL.split(',')[1];

    // console.log(data);
  }
}

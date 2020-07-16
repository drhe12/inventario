import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  articuloCreado: Producto = {
    nombre: null,
    marca: null,
    stock: null,
    qr: null,
    precio: null
  };

  id = null;
  qr = null;

  constructor( private productService: ProductsService ) { }

  ngOnInit(): void {
  }

  registrarDatos() {
    //Creamos al producto para obtener su id
    this.productService.crearProducto(
      this.articuloCreado.nombre,
      this.articuloCreado.marca,
      this.articuloCreado.stock,
      this.articuloCreado.precio );

    console.log(this.articuloCreado);
  }

  limpiar() {
    this.articuloCreado.nombre = '';
    this.articuloCreado.marca = '';
    this.articuloCreado.stock = null;
    this.articuloCreado.precio = null;

    this.qr = null;
    this.id = null;
  }

  generarQR() {
    this.id = this.productService.obtenerID();
    //La cadena que se almacena en el QR será el URL con id
    this.qr = 'https://inventario-qr-bf7ab.web.app/#/productos/'+this.id;
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

    //agregamos el QR a nuestro producto
    this.productService.agregarQR(
      this.id,
      this.articuloCreado.qr );

    console.log( this.articuloCreado );
    this.limpiar();
  }
}

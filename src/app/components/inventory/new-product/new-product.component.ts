import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  qrData = {
    nombre: '',
    marca: '',
    stock: null,
    precio: null
  };
  articuloCreado = {
    nombre: null,
    marca: null,
    stock: null,
    precio: null
  };

  //elementType: 'url' | 'img' | 'canvas' = 'canvas';

  qrr = '';

  constructor() { }

  ngOnInit(): void {
  }

  crearArticulo() {
    this.articuloCreado.nombre = this.qrData.nombre;
    this.articuloCreado.marca = this.qrData.marca;
    this.articuloCreado.stock = this.qrData.stock;
    this.articuloCreado.precio = this.qrData.precio;

    console.log(this.qrData);
    console.log(this.articuloCreado);

  }

  cancelArticulo() {
    this.qrData.nombre = '';
    this.qrData.marca = '';
    this.qrData.stock = null;
    this.qrData.precio = null;

    this.articuloCreado.nombre = this.qrData.nombre;
    this.articuloCreado.marca = this.qrData.marca;
    this.articuloCreado.stock = this.qrData.stock;
    this.articuloCreado.precio = this.qrData.precio;
  }

  guardarQR() {
    //El elementType del QR por default es 'canvas' por eso cuando se corre
    //la web el QR se muestra dentro de una etiqueta HTML canvas

    //Obtenemos su URL como imagen de la siguiente manera
    let canvas = document.querySelector('canvas') as HTMLCanvasElement;
    let imagenURL = canvas.toDataURL('image/jpeg').toString();
    //ahora ya tenemos el QR en una URL que podemos almacenar
    //en nuestro producto y guardarlo en la bd
    console.log('URL: ', imagenURL);


    //No es muy necesario
    //Dividir el URL del QR que se genera
    let data = imagenURL.split(',')[1];

    console.log(data);
  }
}

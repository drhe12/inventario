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
}

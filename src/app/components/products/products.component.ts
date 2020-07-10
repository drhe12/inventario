import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {



  articulos: Articulo[] = [
    { nombre: 'Bolsa de cemento', marca: 'Cemento SOL', stock: 150, imagen: 'arti1.jpg', precio: 35},
    { nombre: 'Cerámica', marca: 'San Lorenzo', stock: 300, imagen: 'arti2.jpg', precio: 25},
    { nombre: 'Caño de agua', marca: '-', stock: 220, imagen: 'arti4.jpg', precio: 15},
    { nombre: 'Tanque de agua', marca: 'Rotoplas', stock: 12, imagen: 'arti5.jpg', precio: 150},
    { nombre: 'Lavabo', marca: '-', stock: 70, imagen: 'arti6.jpg', precio: 83},
    { nombre: 'Chapa de puerta', marca: 'Fortel', stock: 130, imagen: 'arti7.jpg', precio: 28}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

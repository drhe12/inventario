import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Articulo } from 'src/app/models/articulo.model';

@Component({
  selector: 'app-general-inventory',
  templateUrl: './general-inventory.component.html',
  styleUrls: ['./general-inventory.component.css']
})
export class GeneralInventoryComponent implements OnInit, AfterViewInit {

  articulos: Articulo[] = [
    { nombre: 'Bolsa de cemento', marca: 'Cemento SOL', stock: 150, imagen: 'arti1.jpg', precio: 35},
    { nombre: 'Cerámica', marca: 'San Lorenzo', stock: 300, imagen: 'arti2.jpg', precio: 25},
    { nombre: 'Caño de agua', marca: '-', stock: 220, imagen: 'arti4.jpg', precio: 15},
    { nombre: 'Tanque de agua', marca: 'Rotoplas', stock: 12, imagen: 'arti5.jpg', precio: 150},
    { nombre: 'Lavabo', marca: '-', stock: 70, imagen: 'arti6.jpg', precio: 83},
    { nombre: 'Chapa de puerta', marca: 'Fortel', stock: 130, imagen: 'arti7.jpg', precio: 28}
  ];

  position = 0;

  displayedColumns: string[] = [
    'nombre', 'marca', 'stock', 'precio', 'acciones'
  ];
  dataSource = new MatTableDataSource<Articulo> (this.articulos);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



}

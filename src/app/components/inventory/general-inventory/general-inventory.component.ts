import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Producto } from 'src/app/models/producto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-general-inventory',
  templateUrl: './general-inventory.component.html',
  styleUrls: ['./general-inventory.component.css']
})

export class GeneralInventoryComponent implements OnInit, AfterViewInit {

  productos: any = [];

  displayedColumns: string[] = [
    'nombre', 'marca', 'stock', 'precio', 'acciones'
  ];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private productService: ProductsService ) { }

  ngOnInit(): void {
    //Llamamos a nuestra bd
    this.productService.getProductos().subscribe( productos => {
      //le asignamos los productos a nuestra tabla
      this.dataSource.data = productos;

      this.productos = productos;
      console.log(this.productos);
    })
  }

  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }



}

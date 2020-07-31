import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Producto } from 'src/app/clases/producto';
import { ProductsService } from 'src/app/services/products.service';
import { EditarComponent } from '../../editar/editar.component';

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

  constructor( private productService: ProductsService, private dialog: MatDialog ) { }

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

  eliminar( id: string ) {
    this.productService.eliminarProducto(id);
  }

  editarProducto( producto: Producto ) {
    console.log('Editar: ', producto);
    this.abrirDialog(producto);
  }

  abrirDialog( prod: Producto ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = prod;
    const dialogo = this.dialog.open(EditarComponent, dialogConfig);

    dialogo.afterClosed().subscribe(res => {
      console.log(`Dialogo resultado: ${res}`);
    });
  }

}

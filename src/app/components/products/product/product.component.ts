import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Kardex } from 'src/app/models/kardex';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: any = [];
  karde: any = [];
  kardex = false;
  regKardex: any = [];//Kardex[] = [
    //{ fecha: new Date(), detalle: 'stock inicial', valor_unit: 10, cant_e: 150, total_e: 1500, cant_s: 0, total_s: 0, cant_t: 150, total_t: 1500}
  //];

  displayedColumns: string[] = [
    'fecha', 'detalle', 'valor_unit', 'cant_e', 'total_e',
    'cant_s', 'total_s', 'cant_t', 'total_t'
  ];
  dataSource = new MatTableDataSource();

  constructor( private activatedRoute: ActivatedRoute,
              private productService: ProductsService ) { }

  ngOnInit(): void {
    //Para obtener el id del producto que hemos abierto
    this.activatedRoute.params.subscribe( params => {
      //pasamos el id obtenido y llamamos a nuestra bd para mostrar producto
      this.productService.getProducto( params['id'] ).subscribe( product => {
        this.producto = product;
        //this.dataSource.data = this.producto;
      });
      //para el kardex
      this.productService.getKardex( params['id'] ).subscribe( kardex => {
        this.regKardex = kardex;
        this.dataSource.data = kardex;
        console.log('Kardex: '+this.regKardex);
      });
    });

  }

  iniciarKardex( id: string ) {
    console.log('Iniciar Kardex');
    this.kardex = true;
  }
}

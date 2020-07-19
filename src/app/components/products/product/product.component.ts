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
  kardex = false;
  id_producto: string;
  regKardex: any = [];
  nuevoKardex: Kardex = {
    fecha: new Date(),
    detalle: '',
    valor_unit: null,
    cant_e: null,
    total_e: null,
    cant_s: null,
    total_s: null,
    cant_t: null,
    total_t: null
  };

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
      this.id_producto = params['id'];
      //pasamos el id obtenido y llamamos a nuestra bd para mostrar producto
      this.productService.getProducto( this.id_producto ).subscribe( product => {
        this.producto = product;
        this.regKardex = this.producto.kardex;
        this.dataSource.data = this.regKardex;
        //console.log(this.regKardex);
      });
      //para el kardex
      /*this.productService.getKardex( params['id'] ).subscribe( kardex => {
        this.regKardex = kardex;
        this.dataSource.data = kardex;
        console.log(this.regKardex);
      });*/
    });
  }

  iniciarKardex() {
    console.log('Iniciar Kardex');
    this.kardex = true;
  }

  registrarKardex() {
    this.nuevoKardex.valor_unit = this.producto.precio;
    this.nuevoKardex.total_s = this.nuevoKardex.valor_unit * this.nuevoKardex.cant_s;
    this.nuevoKardex.cant_t = this.producto.stock - this.nuevoKardex.cant_s;
    this.nuevoKardex.total_t = this.nuevoKardex.cant_t * this.nuevoKardex.valor_unit;
    this.nuevoKardex.cant_e = 0;
    this.nuevoKardex.total_e = 0;
    console.log(this.id_producto);
    this.productService.setKardex(this.id_producto, this.nuevoKardex);

    console.log('Fecha: ' + this.nuevoKardex.fecha);
    console.log('Detalle: ' + this.nuevoKardex.detalle);
    console.log('Cantidad Sal. ' + this.nuevoKardex.cant_s);
    console.log('Total Sal. ' + this.nuevoKardex.total_s);
    console.log('Cantidad Tot. ' + this.nuevoKardex.cant_t);
    console.log('Total Tot. ' + this.nuevoKardex.total_t);
  }
}

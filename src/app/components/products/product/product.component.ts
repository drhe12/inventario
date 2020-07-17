import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: any = [];

  constructor( private activatedRoute: ActivatedRoute,
              private productService: ProductsService ) {
    this.activatedRoute.params.subscribe( params => {
      this.productService.getProducto( params['id'] ).subscribe( product => {
        this.producto = product;
      })
    });
  }

  ngOnInit(): void {
  }

  iniciarKardex( id: string ) {
    console.log('Iniciar Kardex');
  }
}

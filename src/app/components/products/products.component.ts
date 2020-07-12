import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos: any = [];

  constructor( public productService: ProductsService ) { }

  ngOnInit(): void {
    //Llamamos a nuestro servicio y usamos el método getProductos
    //para mostrar los productos almacenados en Firebase
    this.productService.getProductos().subscribe( productos => {
      this.productos = productos;
      console.log(this.productos);
    })
  }

}
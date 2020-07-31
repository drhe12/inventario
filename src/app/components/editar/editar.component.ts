import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Producto } from '../../clases/producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  //private producto: any;
  //private productoOriginal: any;

  //@Input() product: Producto;

  constructor( private produService: ProductsService,
                private dialogRef: MatDialogRef<EditarComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Producto) { }

  editarProduForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.valoresIniciales();
  }

  valoresIniciales() {
    this.editarProduForm.patchValue({
      id: this.data.id,
      nombre: this.data.nombre,
      marca: this.data.marca,
      stock: this.data.stock,
      precio: this.data.precio
    });
  }

  editarProducto() {

  }

}

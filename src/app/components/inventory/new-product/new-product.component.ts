import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Producto } from 'src/app/clases/producto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  /*articuloCreado: Producto = {
    nombre: null,
    marca: null,
    stock: null,
    qr: null,
    precio: null
  };*/

  id = null;
  qrGenerado = null;

  crearFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      marca: new FormControl(''),
      qr: new FormControl(''),
      stock: new FormControl('', [Validators.required, Validators.min(2)]),
      precio: new FormControl('', [Validators.required, Validators.min(5)]),
    });
  }
  registroForm: FormGroup;

  constructor( private productService: ProductsService ) {
    this.registroForm = this.crearFormGroup();
  }

  ngOnInit(): void {
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get marca() { return this.registroForm.get('marca'); }
  get qr() { return this.registroForm.get('qr'); }
  get stock() { return this.registroForm.get('stock'); }
  get precio() { return this.registroForm.get('precio'); }

  registrarDatos() {
    //Creamos al producto para obtener su id
    this.productService.crearProducto(
      this.nombre.value,
      this.marca.value,
      this.stock.value,
      this.precio.value );
  }

  limpiar() {
    this.nombre.setValue('');
    this.marca.setValue('');
    this.qr.setValue('');
    this.stock.setValue('');
    this.precio.setValue('');

    this.qrGenerado = null;
    this.id = null;
  }

  generarQR() {
    this.id = this.productService.obtenerID();
    //La cadena que se almacena en el QR será el URL con id
    this.qrGenerado = 'https://inventario-qr-bf7ab.web.app/#/productos/'+this.id;
  }

  guardarProducto() {
    //El elementType del QR por default es 'canvas' por eso cuando se corre
    //la web el QR se muestra dentro de una etiqueta HTML canvas
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    //Obtenemos su URL como imagen de la siguiente manera
    const imagenURL = canvas.toDataURL('image/jpeg').toString();
    //ahora ya tenemos el QR en una URL que podemos almacenar
    //en nuestro producto y guardarlo en la bd
    console.log('URL: ', imagenURL);
    this.qr.setValue(imagenURL);

    //agregamos el QR a nuestro producto
    this.productService.agregarQR(
      this.id,
      this.qr.value );

    console.log( this.qr.value );
    this.limpiar();
  }
}

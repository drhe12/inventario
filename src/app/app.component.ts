import { Component, Injectable } from '@angular/core';
//Para las actualizaciones de PWA
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'inventario-qr';

  //Actualizar de manera forzada
  constructor( actulalizar: SwUpdate ) {
    actulalizar.available.subscribe(event => {
      if (event) {
        actulalizar.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}

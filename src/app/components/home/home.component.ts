import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//Importamos la libreria que nos ayuda a leer QR
import jsQR from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  resultadoScan = null;
  scanActivado = false;

  localstream: any;
  //Para mostrar video
  //Revisar documentación de ViewChild *static
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  elementoVideo: any;
  elementoCanvas: any;
  contexturaCanvas: any;

  constructor( ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementoVideo = this.video.nativeElement;
    this.elementoCanvas = this.canvas.nativeElement;
    this.contexturaCanvas = this.elementoCanvas.getContext('2d');

  }

  async iniciarScan() {
    this.scanActivado = true;
    //para activar la cámara
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment'}
    });
    this.localstream = stream;
    this.elementoVideo.srcObject = stream;
    this.elementoVideo.setAttribute('playsinline', true);
    this.elementoVideo.play();

    requestAnimationFrame(this.scanear.bind(this));
  }

  scanear() {
    if (this.elementoVideo.readyState === this.elementoVideo.HAVE_ENOUGH_DATA ) {
      this.elementoCanvas.height = this.elementoVideo.videoHeight;
      this.elementoCanvas.width = this.elementoVideo.videoWidth;

      this.contexturaCanvas.drawImage(
        this.elementoVideo,
        0,
        0,
        this.elementoCanvas.width,
        this.elementoCanvas.height
      );

      const datosImagen = this.contexturaCanvas.getImageData(
        0,
        0,
        this.elementoCanvas.width,
        this.elementoCanvas.height
      );

      const codigoQR = jsQR(datosImagen.data, datosImagen.width, datosImagen.height, {
        inversionAttempts: 'dontInvert'
      })
      console.log('QR: ', codigoQR);

      if ( codigoQR ) {
        //Una vez que lee el QR
        this.detenerScan();
        this.resultadoScan = codigoQR.data;
      } else if ( this.scanActivado ) {
      requestAnimationFrame(this.scanear.bind(this));
      }

    } else {
      requestAnimationFrame(this.scanear.bind(this));
    }
  }

  detenerScan() {
    this.scanActivado = false;
    //desactivar la cámara
    this.elementoVideo.pause();
    this.localstream.getTracks()[0].stop();
  }

  resetear() {
    this.resultadoScan = null;
    this.iniciarScan();
  }
}

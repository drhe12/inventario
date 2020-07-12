import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  resultadoScan = null;
  scanActivado = false;

  //Para mostrar video
  //Revisar documentación de ViewChild *static
  @ViewChild('video', { static: false}) video: ElementRef;
  elementoVideo: any;

  constructor( ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementoVideo = this.video.nativeElement;
  }

  async iniciarScan() {
    this.scanActivado = true;
    //para activar la cámara
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment'}
    });

    this.elementoVideo.srcObject = stream;
    this.elementoVideo.setAttribute('playsinline', true);
    this.elementoVideo.play();
  }

  resetear() {

  }

  detenerScan() {
    this.scanActivado = false;
  }
}

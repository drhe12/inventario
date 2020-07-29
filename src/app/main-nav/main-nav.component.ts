import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AutenticacionService,
    private dialog: MatDialog) {}

  ngOnInit():void {
    //this.iniciarSesion();
  }

  iniciarSesion() {
    const dialogConfig = new MatDialogConfig();
    //para que no se cierre el dialogo
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    this.dialog.open(LoginComponent, dialogConfig);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}

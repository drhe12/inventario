import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';
//import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pass: string;

  constructor( private autService: AutenticacionService,
    public router: Router/*,
    public dialogRef: MatDialogRef<LoginComponent>*/ ) { }

  ngOnInit(): void {

  }

  logueo() {
    this.autService.login(this.email, this.pass).then( res => {
      this.router.navigate(['/home']);
      //this.dialogRef.close();
    }).catch( error => alert('Usuario/contraseña invalidos'));
  }
}

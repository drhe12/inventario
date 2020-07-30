import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor( private angularFA: AngularFireAuth,
              private router: Router ) { }

  //Para el inicio de sesion
  login( email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.angularFA.signInWithEmailAndPassword(email, pass).then( user => {
        resolve(user);
      }).catch(error => reject(error));
    })
  }
  //Para cerrar sesion
  cerrarSesion() {
    this.angularFA.signOut().then( () => {
      this.router.navigate(['login']);
    })
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Mantener compatibilidad con Firebase v8
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';  // Usar la API de compatibilidad de Firebase

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  // Login
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential) => {
        return { success: true, user: userCredential.user };  // Usamos userCredential.user para obtener el usuario
      }),
      catchError((error) => {
        let errorMessage = '';

        // Capturamos distintos tipos de errores
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No se ha encontrado una cuenta con este correo electrónico.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'La contraseña ingresada es incorrecta.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'El correo electrónico ingresado no es válido.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Demasiados intentos fallidos. Por favor, inténtalo más tarde.';
        } else {
          errorMessage = 'Error desconocido al intentar iniciar sesión.';
        }

        // Devolvemos el error con mensaje
        return of({ success: false, message: errorMessage });
      })
    );
  }

  // Método para obtener el usuario actual
  getUser(): Observable<firebase.User | null> {  // Devolvemos el tipo firebase.User
    return this.afAuth.authState;
  }

  // Registro
  register(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      map((userCredential) => {
        return { success: true, user: userCredential.user };  // Devolvemos el usuario tras el registro
      }),
      catchError((error) => {
        let errorMessage = '';

        // Manejo de errores comunes durante el registro
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Este correo electrónico ya está en uso.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'El correo electrónico ingresado no es válido.';
        } else {
          errorMessage = 'Error desconocido al registrar el usuario.';
        }

        // Devolvemos el error con mensaje
        return of({ success: false, message: errorMessage });
      })
    );
  }

  // Logout
  logout(): Promise<void> {
    return this.afAuth.signOut();  // Cierra la sesión del usuario
  }
}

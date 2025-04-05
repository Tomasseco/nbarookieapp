import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular'; 
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'; 

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  standalone: true,
  imports: [IonicModule] 
})
export class ListadoPage implements OnInit {
  user: firebase.User | null = null;  // Tipo de usuario usando la compatibilidad de Firebase
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("Checking user...");  // Para depuración
    this.authService.getUser().subscribe(user => {
      console.log("User from authService: ", user);  // Verificar si obtenemos el usuario correctamente
      
      if (user) {
        this.user = user;  // Si el usuario está logueado, asignar al campo user
        console.log("User is logged in:", this.user); // Verifica que el usuario esté logueado
      } else {
        console.log("User is not logged in. Redirecting...");  // Verificar si no está logueado
        this.router.navigate(['/home']);  // Redirigir al home si no está logueado
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('User logged out');
      this.router.navigate(['/home']);  // Redirigir al home o login después de hacer logout
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular'; 
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'; 
import { CommonModule } from '@angular/common';
import { JugadorService, Jugador } from '../services/jugadores.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule] 
})
export class ListadoPage implements OnInit {
  user: firebase.User | null = null; 
  constructor(private authService: AuthService, private router: Router, private jugadoresService: JugadorService) { }
  jugadores: Jugador[] = [];
  favorito: boolean = false;

  ngOnInit() {
      this.authService.getUser().subscribe(user => {
      // Verificar si el usuario está logueado    
      if (user) {
        this.user = user;
      } else {
        // Redirigir al login si no hay usuario 
        this.router.navigate(['/login']);
      }

      this.jugadoresService.getJugadores().subscribe((data: Jugador[]) => {
        this.jugadores = data;
      });
    });
  }

  toggleFavorito() {
    this.favorito = !this.favorito;
  }

  logout() {
    this.authService.logout().then(() => {

      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}

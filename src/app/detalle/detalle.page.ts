import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorService, Jugador } from '../services/jugadores.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  user: firebase.User | null = null; 
  jugador: Jugador | undefined;
  favorito: boolean = false;

  constructor(
    private route: ActivatedRoute, private jugadoresService: JugadorService, private authService: AuthService, private router: Router ) {}

  ngOnInit() {
     
    this.authService.getUser().subscribe(user => {
      // Verificar si el usuario está logueado    
      if (user) {
        this.user = user;
      } else {
        // Redirigir al login si no hay usuario 
        this.router.navigate(['/login']);
      }

      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.jugadoresService.getJugadores().subscribe(jugadores => {
        this.jugador = jugadores.find(j => j.id === id);
      });
    
    });
  }

  toggleFavorito() {
    this.favorito = !this.favorito;
  }
}

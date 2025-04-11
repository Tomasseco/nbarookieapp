import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadorService, Jugador } from '../services/jugadores.service';
import { FavoritosService } from '../services/favoritos.service';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';
import { IonicModule } from '@ionic/angular'; // Importamos IonicModule para registrar los componentes de Ionic
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true, // Esto indica que el componente es independiente
  imports: [IonicModule, CommonModule, RouterModule]
})
export class DetallePage implements OnInit {
  user: firebase.User | null = null;
  jugador: any = {}; 
  favorito: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jugadoresService: JugadorService,
    private authService: AuthService,
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.jugadoresService.getJugadores().subscribe(jugadores => {
          this.jugador = jugadores.find(j => j.id === id);
          if (this.user && this.jugador) {
            this.favoritosService
              .esFavorito(this.user.uid, this.jugador.id.toString())
              .subscribe(fav => {
                this.favorito = !!fav;
              });
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleFavorito() {
    if (!this.user || !this.jugador) return;
    if (this.favorito) {
      this.favoritosService.eliminarFavorito(this.user.uid, this.jugador.id.toString())
        .then(() => this.favorito = false);
    } else {
      this.favoritosService.guardarFavorito(this.user.uid, this.jugador)
        .then(() => this.favorito = true);
    }
  }
}

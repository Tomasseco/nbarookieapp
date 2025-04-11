// src/app/services/favoritos.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jugador } from './jugadores.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor(private firestore: AngularFirestore) {}

  guardarFavorito(userId: string, jugador: Jugador) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .collection('favoritos')
      .doc(jugador.id.toString())
      .set(jugador);
  }

  eliminarFavorito(userId: string, jugadorId: string) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .collection('favoritos')
      .doc(jugadorId)
      .delete();
  }

  esFavorito(userId: string, jugadorId: string) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .collection('favoritos')
      .doc(jugadorId)
      .valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Asegúrate de que sea compat
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

  eliminarFavorito(userId: string, jugadorId: number) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .collection('favoritos')
      .doc(jugadorId.toString())
      .delete();
  }

  esFavorito(userId: string, jugadorId: number) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .collection('favoritos')
      .doc(jugadorId.toString())
      .valueChanges();
  }
}
